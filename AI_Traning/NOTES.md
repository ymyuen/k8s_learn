# NOTES.md — 教學工作區筆記

## 學習者偏好

- 語言：繁體中文講解 + 保留英文技術術語（CKA 考試為英文）
- 節奏：6 個月以上從容進行，不排硬性日曆
- 背景：有容器經驗（Docker、YAML、Linux shell 沒問題）—— 不需從容器概念教起
- 已確立決策：目標 CKA、自我進修、6 個月以上（2026-08 記錄於 learning-records/0001）
- 指令一律 bash（WSL2）—— 自 Lesson 0005 起所有終端機實作都在 WSL2 bash 進行（CKA 是 Linux 終端機）；0015／0016 使用 Killercoda 瀏覽器 VM

## 環境

- Windows 本機；練習環境：WSL2 + Docker Desktop + kind
- CKA 考試是 Linux 終端機實作 —— 平時練習一律在 WSL2/Linux 終端進行，培養肌肉記憶
- 本教學工作區位於 C:\Users\User\k8s\AI_Traning；MCP filesystem 工具不允許此目錄，寫檔用 write/bash（bash 驗證檔須以 `[System.IO.File]::ReadAllText` + `New-Object System.Text.UTF8Encoding($false)` 讀，Get-Content 會弄壞 UTF-8 中文）

## 課程進度與產出模式

- **產出模式已切換（2026-09-07）**：從「逐課產出（依學習紀錄與 ZPD 調整）」改為「**預產出 v1 + 使用者實作回報後逐課修訂**」。ZPD 調整移到修訂階段（learning-records 逐課回報 → erratum → 改課文）。
- **Lesson 0005–0020（16 課）已於 2026-09-07 預產出 v1**，一次補齊至全 20 課（見 reference/cka-domain-map.html 的完整課程目錄）。0005＝Phase 1 收尾；0006–0008＝Phase 2；0009–0012＝Phase 3；0013–0017＝Phase 4；0018–0020＝Phase 5（模擬考）。周邊三檔同步更新：glossary.html（92 詞、分主題群組）、cka-domain-map.html（20 課目錄＋各領域對應課號）、本檔。
- **Lesson 0005 修訂（2026-09-07）**：第 13 步 tip 後新增「排不下」教學 box（節點看帳、Pod 看原因）＋ glossary 補 FailedScheduling 詞條（91→92）。同日使用者回報選做指令 `kubectl run --requests` 不存在（教材誤植），已修正為 dry-run YAML 工作法（記錄於 learning-records/0006）。使用者已開始 0005 實作。
- **叢集狀態鏈**（0005 起，詳見各課開場框）：
  - 0005 開場：環境切 WSL2 bash、重建雙節點 kind（Windows 舊 kubeconfig 淘汰）→ 0006–0010 沿用（每課末刪練習物件）。
  - 0011 開場：重建 ingress-ready 叢集（extraPortMappings 80/443）＋安裝 ingress-nginx；課末明言 0012 再重建。
  - 0012 開場：重建 disableDefaultCNI 叢集＋Calico（v3.32.2）→ Calico 雙節點保留給 0013–0020（0015/0016 為 Killercoda、不動本機）。
  - 0013–0014、0017–0020：沿用 Calico 雙節點；0015–0016 用 Killercoda 拋棄式 VM（不動本機）。
  - 0019 開場：補裝 metrics-server（0012 重建後已消失；0007 舊安裝隨 0011/0012 重建被洗掉）。

## 歷史進度（0001–0004 保留）

- Phase 0（基礎與叢集架構）完成：Lesson 0001 叢集架構與第一個 Pod
- Phase 1（工作負載與排程）進行中：Lesson 0002（Deployment、自我修復、rollout/rollback）實作完成（使用者回報 3 副本 Running、REVISION 1/2；`-w` 與 CHANGE-CAUSE 已於教材修正並講解）。待確認：使用者是否實際執行 `rollout undo`（lesson 0003 開場補做）。
- Phase 1 進行中：Lesson 0003（Labels & Selectors）實作完成（使用者 2026-09-04 回報；機制性提問「改 label 是否通知 control plane」記錄於 learning-records/0004）。
- Phase 1 進行中：Lesson 0004（DaemonSet／Job／CronJob）已產出，等待實作回報。實作 A 需以 0001 的 kind-config.yaml 重建為雙節點叢集（約 2 分鐘，會清掉舊練習物件）；實作後叢集保持雙節點，供後續資源與排程課使用。2026-09-06 使用者回報 create job 無 --completions/--parallelism（教材誤植），已修正為 dry-run YAML 工作法；使用者已開始 0004 實作（記錄於 learning-records/0005）。
- 使用者已於本機用 kind 建叢集並完成第一個 nginx Pod（`kubectl get nodes` 只有單節點 control-plane，符合 kind 預設；已在 Lesson 0001 修正誤導描述並補充雙節點 config）。kubectl 早期從 Windows PowerShell 執行；0005 起一律 WSL2。
