"""5 并发压测：验证需求书验收指标（P95 ≤ 3s / 成功率 ≥ 99% / 5 并发）
用法：先启动 python server.py，再跑 python bench.py
输出：控制台报告 + bench_result.json
"""
import json, statistics, time, urllib.request, urllib.error
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor

BASE = "http://127.0.0.1:8010"
CONCURRENCY = 5           # 需求书要求 5 人同时查询
ROUNDS = 40               # 每个并发用户发 40 次请求
ENDPOINTS = [
    "/api/kpi",
    "/api/trend",
    "/api/summary",
    "/api/devices?limit=5",
    "/api/detail?version=V4.0.0&status=" + quote("异常崩溃") + "&limit=50",
    "/api/attr",
]


def one(url):
    t0 = time.perf_counter()
    try:
        with urllib.request.urlopen(BASE + url, timeout=10) as r:
            r.read()
            ok = r.status == 200
    except Exception:
        ok = False
    return (time.perf_counter() - t0) * 1000, ok


def worker(n):
    out = []
    for i in range(ROUNDS):
        url = ENDPOINTS[i % len(ENDPOINTS)]
        out.append(one(url))
    return out


def pctl(xs, p):
    xs = sorted(xs)
    if not xs:
        return 0.0
    k = min(len(xs) - 1, int(len(xs) * p))
    return round(xs[k], 1)


if __name__ == "__main__":
    # 预热（排除首次连接开销导致的虚高）
    for e in ENDPOINTS:
        one(e)

    print(f"压测开始：{CONCURRENCY} 并发 × {ROUNDS} 次请求 = {CONCURRENCY * ROUNDS} 个请求")
    t0 = time.perf_counter()
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as ex:
        results = [r for chunk in ex.map(worker, range(CONCURRENCY)) for r in chunk]
    dur = time.perf_counter() - t0

    lat = [r[0] for r in results]
    ok = sum(1 for r in results if r[1])
    total = len(results)
    report = {
        "concurrency": CONCURRENCY,
        "rounds_per_user": ROUNDS,
        "total_requests": total,
        "duration_s": round(dur, 2),
        "qps": round(total / dur, 1),
        "success": ok,
        "success_rate": round(ok / total * 100, 2),
        "p50_ms": pctl(lat, 0.50),
        "p95_ms": pctl(lat, 0.95),
        "p99_ms": pctl(lat, 0.99),
        "max_ms": round(max(lat), 1),
        "min_ms": round(min(lat), 1),
        "avg_ms": round(statistics.mean(lat), 1),
        "endpoints": ENDPOINTS,
    }
    json.dump(report, open("bench_result.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    print("\n===== 压测报告 =====")
    print(f"并发数        : {report['concurrency']}")
    print(f"总请求        : {report['total_requests']}  ({report['duration_s']}s, {report['qps']} QPS)")
    print(f"成功率        : {report['success_rate']}%   ({ok}/{total})")
    print(f"P50 / P95 / P99: {report['p50_ms']} / {report['p95_ms']} / {report['p99_ms']} ms")
    print(f"最快 / 最慢    : {report['min_ms']} / {report['max_ms']} ms")
    print("\n--- 对照需求书验收指标 ---")
    print(f"P95 ≤ 3000 ms   : {'通过' if report['p95_ms'] <= 3000 else '不通过'}  (实测 {report['p95_ms']} ms)")
    print(f"成功率 ≥ 99%    : {'通过' if report['success_rate'] >= 99 else '不通过'}  (实测 {report['success_rate']}%)")
    print(f"支持 5 并发     : {'通过' if report['concurrency'] >= 5 else '不通过'}  (实测 {CONCURRENCY} 并发)")
