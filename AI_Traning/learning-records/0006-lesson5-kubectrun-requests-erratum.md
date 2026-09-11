# Lesson 0005 實作回報：選做重現指令旗標誤植（run --requests 不存在）

使用者 2026-09-07 進行 Lesson 0005（「排不下」教學 box 的選做重現）時回報 `error: unknown flag: --requests`；教材誤稱 `kubectl run` 支援 `--requests`，現代 kubectl 已移除該旗標（資源 requests/limits 屬 Pod spec 欄位，僅能以 YAML 設定）。

**Evidence:** 使用者貼出的錯誤輸出（2026-09-07；指令中另含 `memory-64Gi` 筆誤，但根因為旗標不存在）。

**Implications:** Lesson 0005 選做段已修正為 dry-run → nano 展開 `resources: {}` → apply 工作法（與 0004 create job 修正同模式、與本課第 9 步同款），與「YAML-first」方向一致。0005 課本體 30 步未受影響；0005 完成回報待追蹤。
