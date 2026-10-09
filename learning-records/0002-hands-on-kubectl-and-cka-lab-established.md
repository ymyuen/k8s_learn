# CKA 考場實戰：kubectl 盲打與真題排錯 Hands-on Lab 建立

針對 CKA 考試對時間管理（120 分鐘 17 題）的嚴苛要求，建立了以 `$do`（`--dry-run=client -o yaml`）為核心的極速出裝工作流，並設計了 Multi-Container Pod 部署、Deployment Rolling Update/Rollback 及 CrashLoopBackOff 排錯診斷的實戰題目。本機實驗室推薦以 Colima + Kind 或 Docker Desktop 為基底進行多節點模擬。
