// 数据口径与验证（由明细真实计算，非硬编码）
window.TV_VERIFY = {
 "metrics": [
  {
   "key": "健康评分",
   "def": "0–100，四维加权：稳定性 40% / 启动性能 30% / 资源占用 20% / 兼容覆盖 10%",
   "formula": "Σ(维度得分 × 权重)",
   "range": "0–100，≥80 视为达标",
   "src": "评分能力（已有）"
  },
  {
   "key": "崩溃率 CRASH",
   "def": "崩溃会话数 ÷ 总会话数，含前台与后台会话",
   "formula": "crash_sessions / total_sessions × 100%",
   "range": "参考线 ≤ 1.00%",
   "src": "标准统计结果"
  },
  {
   "key": "无响应率 ANR",
   "def": "发生 ANR 的会话数 ÷ 总会话数",
   "formula": "anr_sessions / total_sessions × 100%",
   "range": "参考线 ≤ 0.50%",
   "src": "标准统计结果"
  },
  {
   "key": "冷启动耗时",
   "def": "进程未驻留时，从点击图标到首帧渲染完成；取 P50 / P95 分位",
   "formula": "P50 = 中位数，P95 = 95 分位",
   "range": "P95 目标 ≤ 2000 ms",
   "src": "标准统计结果"
  },
  {
   "key": "样本会话数",
   "def": "统计窗口内该维度下的有效启动会话总数（已剔除灰度和测试账号）",
   "formula": "去重后会话计数",
   "range": "单维度 ≥ 1 万视为可信",
   "src": "标准统计结果"
  }
 ],
 "quality": [
  {
   "item": "统计窗口",
   "value": "2026-10-19 ~ 2026-11-17（30 天）",
   "result": "通过"
  },
  {
   "item": "覆盖维度",
   "value": "5 机型 × 3 版本 × 6 应用 = 90 组合",
   "result": "通过"
  },
  {
   "item": "有效会话总量",
   "value": "110,254 次",
   "result": "通过"
  },
  {
   "item": "缺失值处理",
   "value": "组合维度缺失 0 项；无空值行",
   "result": "通过"
  },
  {
   "item": "异常值处理",
   "value": "剔除崩溃率 > 20% 与启动 > 8000ms 的记录共 0 条（数据未触发阈值）",
   "result": "通过"
  },
  {
   "item": "口径一致性",
   "value": "崩溃率 / ANR 率分母统一为总会话数，与大数据侧标准统计结果一致",
   "result": "已核对"
  }
 ],
 "findings": [
  {
   "title": "云游戏 是拉低整体评分的主要来源",
   "detail": "该应用健康评分 68.1 分，崩溃率 1.51%，比表现最好的 Netflix（80.3 分 / 0.98%）低 12.2 分。若把该应用拉到中位水平，整体评分可提升约 1.2 分。",
   "tag": "应用差异"
  },
  {
   "title": "最差组合集中在 MiTV-X65 + 云游戏",
   "detail": "机型×应用交叉后，最差三组为 MiTV-X65×云游戏（55.5 分）、MiTV-X65×腾讯视频（64.7 分）、MiTV-X65×爱奇艺（65.8 分）。三组共同点是低配机型搭配高负载应用，说明问题不在单一维度，而在组合场景。",
   "tag": "交叉验证"
  },
  {
   "title": "OS 版本升级带来稳定收益，MiTV-X65 最明显",
   "detail": "同机型内 Android 11 → Android 14 平均提升 11.2 分；其中 MiTV-X65 提升 11.7 分最为显著。版本因素是可控变量，建议作为版本评审的固定观察项。",
   "tag": "版本对比"
  },
  {
   "title": "评分构成里稳定性权重最高、得分最低",
   "detail": "稳定性维度权重 40%（四维中最高），当前得分 73.1 分（四维中最低）。这意味着整体评分的提升空间主要在崩溃与 ANR，而不是启动速度。",
   "tag": "权重分析"
  }
 ],
 "cross_worst": [
  {
   "model": "MiTV-X65",
   "app": "云游戏",
   "score": 55.5
  },
  {
   "model": "MiTV-X65",
   "app": "腾讯视频",
   "score": 64.7
  },
  {
   "model": "MiTV-X65",
   "app": "爱奇艺",
   "score": 65.8
  }
 ],
 "cross_best": [
  {
   "model": "MiTV-A55",
   "app": "YouTube",
   "score": 89.0
  },
  {
   "model": "MiTV-A55",
   "app": "Netflix",
   "score": 88.8
  },
  {
   "model": "MiTV-A55",
   "app": "哔哩哔哩",
   "score": 87.6
  }
 ],
 "cross_full": [
  {
   "model": "MiTV-X65",
   "app": "云游戏",
   "score": 55.5
  },
  {
   "model": "MiTV-X65",
   "app": "腾讯视频",
   "score": 64.7
  },
  {
   "model": "MiTV-X65",
   "app": "爱奇艺",
   "score": 65.8
  },
  {
   "model": "MiTV-X65",
   "app": "YouTube",
   "score": 66.4
  },
  {
   "model": "TCL-65Q10",
   "app": "云游戏",
   "score": 66.4
  },
  {
   "model": "MiTV-X65",
   "app": "哔哩哔哩",
   "score": 67.4
  },
  {
   "model": "MiTV-X65",
   "app": "Netflix",
   "score": 67.5
  },
  {
   "model": "Hisense-50E3F",
   "app": "云游戏",
   "score": 69.7
  },
  {
   "model": "Skyworth-55A3",
   "app": "云游戏",
   "score": 72.3
  },
  {
   "model": "TCL-65Q10",
   "app": "腾讯视频",
   "score": 75.9
  },
  {
   "model": "MiTV-A55",
   "app": "云游戏",
   "score": 76.7
  },
  {
   "model": "TCL-65Q10",
   "app": "爱奇艺",
   "score": 77.2
  },
  {
   "model": "TCL-65Q10",
   "app": "YouTube",
   "score": 77.5
  },
  {
   "model": "TCL-65Q10",
   "app": "哔哩哔哩",
   "score": 78.1
  },
  {
   "model": "TCL-65Q10",
   "app": "Netflix",
   "score": 78.8
  },
  {
   "model": "Hisense-50E3F",
   "app": "腾讯视频",
   "score": 79.7
  },
  {
   "model": "Hisense-50E3F",
   "app": "哔哩哔哩",
   "score": 80.4
  },
  {
   "model": "Hisense-50E3F",
   "app": "爱奇艺",
   "score": 80.7
  },
  {
   "model": "Hisense-50E3F",
   "app": "YouTube",
   "score": 81.2
  },
  {
   "model": "Hisense-50E3F",
   "app": "Netflix",
   "score": 81.7
  },
  {
   "model": "Skyworth-55A3",
   "app": "腾讯视频",
   "score": 82.0
  },
  {
   "model": "Skyworth-55A3",
   "app": "爱奇艺",
   "score": 82.7
  },
  {
   "model": "Skyworth-55A3",
   "app": "哔哩哔哩",
   "score": 83.1
  },
  {
   "model": "Skyworth-55A3",
   "app": "YouTube",
   "score": 84.3
  },
  {
   "model": "Skyworth-55A3",
   "app": "Netflix",
   "score": 84.7
  },
  {
   "model": "MiTV-A55",
   "app": "腾讯视频",
   "score": 86.3
  },
  {
   "model": "MiTV-A55",
   "app": "爱奇艺",
   "score": 86.5
  },
  {
   "model": "MiTV-A55",
   "app": "哔哩哔哩",
   "score": 87.6
  },
  {
   "model": "MiTV-A55",
   "app": "Netflix",
   "score": 88.8
  },
  {
   "model": "MiTV-A55",
   "app": "YouTube",
   "score": 89.0
  }
 ],
 "version_gain": [
  {
   "model": "MiTV-X65",
   "Android 11": 58.5,
   "Android 12": 64.9,
   "Android 14": 70.2,
   "gain": 11.7
  },
  {
   "model": "Skyworth-55A3",
   "Android 11": 75.4,
   "Android 12": 82.3,
   "Android 14": 86.9,
   "gain": 11.5
  },
  {
   "model": "TCL-65Q10",
   "Android 11": 70.1,
   "Android 12": 75.7,
   "Android 14": 81.2,
   "gain": 11.1
  },
  {
   "model": "Hisense-50E3F",
   "Android 11": 73.4,
   "Android 12": 79.1,
   "Android 14": 84.2,
   "gain": 10.8
  },
  {
   "model": "MiTV-A55",
   "Android 11": 80.4,
   "Android 12": 85.9,
   "Android 14": 91.1,
   "gain": 10.7
  }
 ],
 "os_versions": [
  "Android 11",
  "Android 12",
  "Android 14"
 ],
 "models": [
  "MiTV-A55",
  "MiTV-X65",
  "Skyworth-55A3",
  "TCL-65Q10",
  "Hisense-50E3F"
 ],
 "apps": [
  "Netflix",
  "YouTube",
  "爱奇艺",
  "腾讯视频",
  "哔哩哔哩",
  "云游戏"
 ],
 "role": {
  "dev": "开发岗：健康平台页面、服务接口、数据接入、调试与部署",
  "da": "数据分析岗：理解设备健康事件与标准统计结果、数据分析、产品化展示口径梳理、结果验证"
 }
};
