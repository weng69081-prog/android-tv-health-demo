"""TV 健康平台 · 最小查询服务（零依赖，Python 标准库）
运行：python server.py          → http://127.0.0.1:8010
接口：
  GET /api/health                              健康检查
  GET /api/summary                             总览指标
  GET /api/kpi                                 版本级 KPI（按 5 条铁律复算）
  GET /api/trend                               按周崩溃趋势
  GET /api/devices?limit=5                     崩溃设备排行
  GET /api/detail?version=&status=&device=&limit=&offset=   明细查询
  GET /api/attr                                崩溃归因（错误类型/应用）
静态文件：同目录下的 *.html / *.js / *.css 直接返回
"""
import csv, json, os, mimetypes
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(HERE, "mock_log_data.csv")
PORT = 8010

# ---------- 数据加载（启动时一次读入内存）----------
def load():
    rows = []
    with open(CSV_PATH, encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            r["boot_duration"] = int(r["boot_duration"])
            rows.append(r)
    return rows

ROWS = load()

def pct(x, y):
    return round(x / y * 100, 2) if y else 0.0

def kpi():
    by = defaultdict(list)
    for r in ROWS:
        by[r["version"]].append(r)
    out = []
    for v in sorted(by):
        rs = by[v]
        total = len(rs)
        crash = sum(1 for r in rs if r["status"] == "异常崩溃")
        slow = sum(1 for r in rs if r["status"] == "开机慢")
        out.append({
            "version": v, "total": total, "crash": crash, "slow": slow,
            "crash_rate": pct(crash, total),
            "boot_exception_rate": pct(crash + slow, total),
            "health_score": round(100 * (1 - crash / total), 1),
        })
    return out

def summary():
    total = len(ROWS)
    crash = sum(1 for r in ROWS if r["status"] == "异常崩溃")
    slow = sum(1 for r in ROWS if r["status"] == "开机慢")
    durs = sorted(r["boot_duration"] for r in ROWS)
    return {
        "total_boot": total, "crash": crash, "slow": slow,
        "crash_rate": pct(crash, total),
        "boot_exception_rate": pct(crash + slow, total),
        "health_score": round(100 * (1 - crash / total), 1),
        "p50": durs[len(durs) // 2],
        "p95": durs[min(len(durs) - 1, int(len(durs) * 0.95))],
        "devices": len(set(r["device_id"] for r in ROWS)),
        "versions": sorted(set(r["version"] for r in ROWS)),
    }

def trend():
    # 按周（周一为起点）聚合异常崩溃数
    from datetime import datetime, timedelta
    def week_start(s):
        d = datetime.strptime(s[:10], "%Y-%m-%d").date()
        return d - timedelta(days=d.weekday())
    buckets = defaultdict(lambda: defaultdict(int))
    for r in ROWS:
        if r["status"] != "异常崩溃":
            continue
        buckets[week_start(r["time"])][r["version"]] += 1
    weeks = sorted(buckets)
    versions = sorted(set(r["version"] for r in ROWS))
    return {
        "weeks": [w.isoformat() for w in weeks],
        "series": [{"version": v, "crash_counts": [buckets[w].get(v, 0) for w in weeks]} for v in versions],
    }

def devices(limit=5):
    c = Counter(r["device_id"] for r in ROWS if r["status"] == "异常崩溃")
    return [{"device_id": k, "crash_count": v} for k, v in c.most_common(limit)]

def detail(version="", status="", device="", limit=50, offset=0):
    rs = ROWS
    if version:
        rs = [r for r in rs if r["version"] == version]
    if status:
        rs = [r for r in rs if r["status"] == status]
    if device:
        rs = [r for r in rs if r["device_id"] == device]
    rs = sorted(rs, key=lambda r: r["time"], reverse=True)
    total = len(rs)
    page = rs[offset:offset + limit]
    return {"total": total, "offset": offset, "limit": limit, "items": page}

def attr():
    v4 = [r for r in ROWS if r["version"] == "V4.0.0" and r["status"] == "异常崩溃"]
    et = Counter(r["error_type"] for r in v4)
    ap = Counter(r["app_name"] for r in v4)
    n = len(v4) or 1
    return {
        "total_crash": len(v4),
        "by_error_type": [{"name": k, "count": v, "pct": round(v / n * 100, 1)} for k, v in et.most_common()],
        "by_app": [{"name": k, "count": v, "pct": round(v / n * 100, 1)} for k, v in ap.most_common()],
    }


class Handler(BaseHTTPRequestHandler):
    def _json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        u = urlparse(self.path)
        p = u.path
        q = {k: v[0] for k, v in parse_qs(u.query).items()}

        if p == "/api/health":
            return self._json({"ok": True, "rows": len(ROWS)})
        if p == "/api/summary":
            return self._json(summary())
        if p == "/api/kpi":
            return self._json(kpi())
        if p == "/api/trend":
            return self._json(trend())
        if p == "/api/devices":
            return self._json(devices(int(q.get("limit", 5))))
        if p == "/api/detail":
            return self._json(detail(q.get("version", ""), q.get("status", ""), q.get("device", ""),
                                     int(q.get("limit", 50)), int(q.get("offset", 0))))
        if p == "/api/attr":
            return self._json(attr())

        # 静态文件
        rel = p.lstrip("/") or "index.html"
        full = os.path.normpath(os.path.join(HERE, rel))
        if full.startswith(HERE) and os.path.isfile(full):
            ctype = mimetypes.guess_type(full)[0] or "application/octet-stream"
            if ctype.startswith("text/") or ctype in ("application/javascript", "application/json"):
                ctype += "; charset=utf-8"
            data = open(full, "rb").read()
            self.send_response(200)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        self._json({"error": "not found"}, 404)

    def log_message(self, *a):
        pass  # 静默，压测时避免刷屏


if __name__ == "__main__":
    srv = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"查询服务已启动：http://127.0.0.1:{PORT}  (数据 {len(ROWS)} 条)")
    print("接口：/api/health /api/summary /api/kpi /api/trend /api/devices /api/detail /api/attr")
    srv.serve_forever()
