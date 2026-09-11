# 迷思修正：kind 預設是單節點叢集，control-plane 兼 worker

使用者實作 `kind create cluster` 後發現 `kubectl get nodes` 只有一台 `kind-control-plane`、沒有 worker。原先教材誤導為「一主一從」。事實：kind 不帶設定檔時建立**單節點**叢集，該節點同時扮演 control-plane 與 worker，且 kind 會移除 control-plane 的 `node-role.kubernetes.io/control-plane:NoSchedule` taint，因此一般 Pod（如 nginx）可直接排程上去。正式的「一主一從」需用 `kind-config.yaml` 指定 `role: worker` 節點。

**Evidence:** 使用者本機 `kubectl get nodes` 輸出僅 `kind-control-plane / Ready / control-plane / v1.34.0`；Lesson 0001 原註解與事實矛盾。

**Implications:** 此迷思預測了「為何 control-plane 能跑工作負載」的常見困惑，與 Taints/Tolerations 直接相關。Phase 1 教 Deployment 與排程時，可改用雙節點 config 示範 scheduler 選節點；Taints/Tolerations 課程已有現成錨點與詞彙表條目。使用者 kubectl 目前從 Windows PowerShell 執行，後續練習建議移往 WSL2（見 NOTES.md）。
