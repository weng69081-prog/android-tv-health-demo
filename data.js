// 模拟数据（结构对齐需求书口径：健康评分 / 启动 / 崩溃 / ANR / 机型 / 版本 / 应用）
window.TV_DATA = {
 "overall": {
  "score": 77.3,
  "score_delta": 0.1,
  "models": 5,
  "os_versions": 3,
  "apps": 6,
  "sessions": 110254,
  "crash": 1.16,
  "anr": 0.54,
  "startup_p50": 687,
  "startup_p95": 1584,
  "breakdown": [
   {
    "name": "稳定性（崩溃/ANR）",
    "value": 40,
    "score": 73.1
   },
   {
    "name": "启动性能",
    "value": 30,
    "score": 79.9
   },
   {
    "name": "资源占用",
    "value": 20,
    "score": 76.2
   },
   {
    "name": "兼容性覆盖",
    "value": 10,
    "score": 82.7
   }
  ]
 },
 "daily": [
  {
   "date": "2026-10-19",
   "score": 77.2,
   "crash": 1.41,
   "anr": 0.71
  },
  {
   "date": "2026-10-20",
   "score": 77.1,
   "crash": 1.42,
   "anr": 0.71
  },
  {
   "date": "2026-10-21",
   "score": 77.2,
   "crash": 1.41,
   "anr": 0.71
  },
  {
   "date": "2026-10-22",
   "score": 77.2,
   "crash": 1.41,
   "anr": 0.71
  },
  {
   "date": "2026-10-23",
   "score": 77.3,
   "crash": 1.41,
   "anr": 0.7
  },
  {
   "date": "2026-10-24",
   "score": 77.4,
   "crash": 1.4,
   "anr": 0.7
  },
  {
   "date": "2026-10-25",
   "score": 77.3,
   "crash": 1.41,
   "anr": 0.7
  },
  {
   "date": "2026-10-26",
   "score": 77.3,
   "crash": 1.41,
   "anr": 0.7
  },
  {
   "date": "2026-10-27",
   "score": 77.4,
   "crash": 1.4,
   "anr": 0.7
  },
  {
   "date": "2026-10-28",
   "score": 77.5,
   "crash": 1.39,
   "anr": 0.7
  },
  {
   "date": "2026-10-29",
   "score": 77.5,
   "crash": 1.39,
   "anr": 0.7
  },
  {
   "date": "2026-10-30",
   "score": 77.5,
   "crash": 1.4,
   "anr": 0.7
  },
  {
   "date": "2026-10-31",
   "score": 77.6,
   "crash": 1.39,
   "anr": 0.69
  },
  {
   "date": "2026-11-01",
   "score": 77.5,
   "crash": 1.39,
   "anr": 0.7
  },
  {
   "date": "2026-11-02",
   "score": 77.8,
   "crash": 1.38,
   "anr": 0.69
  },
  {
   "date": "2026-11-03",
   "score": 77.6,
   "crash": 1.39,
   "anr": 0.69
  },
  {
   "date": "2026-11-04",
   "score": 77.6,
   "crash": 1.39,
   "anr": 0.69
  },
  {
   "date": "2026-11-05",
   "score": 76.3,
   "crash": 1.47,
   "anr": 0.73
  },
  {
   "date": "2026-11-06",
   "score": 76.4,
   "crash": 1.46,
   "anr": 0.73
  },
  {
   "date": "2026-11-07",
   "score": 77.5,
   "crash": 1.39,
   "anr": 0.7
  },
  {
   "date": "2026-11-08",
   "score": 77.4,
   "crash": 1.4,
   "anr": 0.7
  },
  {
   "date": "2026-11-09",
   "score": 77.2,
   "crash": 1.41,
   "anr": 0.71
  },
  {
   "date": "2026-11-10",
   "score": 77.3,
   "crash": 1.41,
   "anr": 0.7
  },
  {
   "date": "2026-11-11",
   "score": 77.3,
   "crash": 1.41,
   "anr": 0.7
  },
  {
   "date": "2026-11-12",
   "score": 77.3,
   "crash": 1.41,
   "anr": 0.71
  },
  {
   "date": "2026-11-13",
   "score": 77.2,
   "crash": 1.41,
   "anr": 0.71
  },
  {
   "date": "2026-11-14",
   "score": 77.0,
   "crash": 1.43,
   "anr": 0.71
  },
  {
   "date": "2026-11-15",
   "score": 77.1,
   "crash": 1.42,
   "anr": 0.71
  },
  {
   "date": "2026-11-16",
   "score": 77.1,
   "crash": 1.42,
   "anr": 0.71
  },
  {
   "date": "2026-11-17",
   "score": 77.0,
   "crash": 1.43,
   "anr": 0.71
  }
 ],
 "by_model": [
  {
   "name": "MiTV-A55",
   "score": 85.8,
   "delta": -1.0,
   "sessions": 32778,
   "crash": 0.86,
   "anr": 0.37,
   "startup_p50": 614,
   "startup_p95": 1412
  },
  {
   "name": "MiTV-X65",
   "score": 64.5,
   "delta": -0.4,
   "sessions": 19234,
   "crash": 1.91,
   "anr": 0.9,
   "startup_p50": 849,
   "startup_p95": 1921
  },
  {
   "name": "Skyworth-55A3",
   "score": 81.5,
   "delta": -0.1,
   "sessions": 12109,
   "crash": 0.95,
   "anr": 0.46,
   "startup_p50": 625,
   "startup_p95": 1473
  },
  {
   "name": "TCL-65Q10",
   "score": 75.6,
   "delta": 0.6,
   "sessions": 13060,
   "crash": 1.21,
   "anr": 0.51,
   "startup_p50": 705,
   "startup_p95": 1548
  },
  {
   "name": "Hisense-50E3F",
   "score": 78.9,
   "delta": -0.1,
   "sessions": 33073,
   "crash": 0.85,
   "anr": 0.48,
   "startup_p50": 646,
   "startup_p95": 1570
  }
 ],
 "by_os": [
  {
   "name": "Android 11",
   "score": 71.5,
   "delta": -0.4,
   "sessions": 41151,
   "crash": 1.25,
   "anr": 0.72,
   "startup_p50": 737,
   "startup_p95": 1729
  },
  {
   "name": "Android 12",
   "score": 77.6,
   "delta": 0.1,
   "sessions": 35616,
   "crash": 1.21,
   "anr": 0.51,
   "startup_p50": 674,
   "startup_p95": 1600
  },
  {
   "name": "Android 14",
   "score": 82.7,
   "delta": -0.3,
   "sessions": 38931,
   "crash": 1.01,
   "anr": 0.36,
   "startup_p50": 601,
   "startup_p95": 1483
  }
 ],
 "by_app": [
  {
   "name": "Netflix",
   "score": 80.3,
   "delta": 0.3,
   "sessions": 11144,
   "crash": 0.98,
   "anr": 0.35,
   "startup_p50": 635,
   "startup_p95": 1430
  },
  {
   "name": "YouTube",
   "score": 79.7,
   "delta": -0.2,
   "sessions": 9093,
   "crash": 0.9,
   "anr": 0.47,
   "startup_p50": 648,
   "startup_p95": 1573
  },
  {
   "name": "爱奇艺",
   "score": 78.6,
   "delta": -0.2,
   "sessions": 20492,
   "crash": 0.92,
   "anr": 0.5,
   "startup_p50": 672,
   "startup_p95": 1538
  },
  {
   "name": "腾讯视频",
   "score": 77.7,
   "delta": -0.5,
   "sessions": 11895,
   "crash": 1.1,
   "anr": 0.4,
   "startup_p50": 664,
   "startup_p95": 1551
  },
  {
   "name": "哔哩哔哩",
   "score": 79.3,
   "delta": -0.2,
   "sessions": 34493,
   "crash": 1.14,
   "anr": 0.42,
   "startup_p50": 663,
   "startup_p95": 1528
  },
  {
   "name": "云游戏",
   "score": 68.1,
   "delta": -0.3,
   "sessions": 25903,
   "crash": 1.51,
   "anr": 0.73,
   "startup_p50": 753,
   "startup_p95": 1837
  }
 ],
 "models": [
  "MiTV-A55",
  "MiTV-X65",
  "Skyworth-55A3",
  "TCL-65Q10",
  "Hisense-50E3F"
 ],
 "os_versions": [
  "Android 11",
  "Android 12",
  "Android 14"
 ],
 "apps": [
  "Netflix",
  "YouTube",
  "爱奇艺",
  "腾讯视频",
  "哔哩哔哩",
  "云游戏"
 ],
 "range": [
  "2026-10-19",
  "2026-11-17"
 ]
};
