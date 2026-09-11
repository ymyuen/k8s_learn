# Lesson 0004 實作回報：create job 旗標誤植（--completions 不存在）

使用者 2026-09-06 開始 Lesson 0004 實作，進行至實作 B 批次步驟時回報 `error: unknown flag: --completions`；教材誤稱 `create job` 支援 `--completions`／`--parallelism`，實際僅有 `--image`／`--from`，批次欄位是 Job spec 欄位、須以 YAML 設定。

**Evidence:** 使用者貼出的錯誤輸出（2026-09-06）。

**Implications:** Lesson 0004 已修正（multi 改 dry-run → Out-File → notepad 加欄位 → apply，並將 YAML 工作法前移），與「0004 起加重 YAML-first」方向一致；使用者至少已進行至實作 B，0004 完成回報待追蹤。
