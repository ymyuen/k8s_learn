# Lesson 0002 實作完成；缺口：`-w` 與 CHANGE-CAUSE 語意

使用者完成 Lesson 0002 終端機實作：Deployment 3 副本 Running（同 ReplicaSet hash `nginx-85bdb68fcf-*`）、`kubectl rollout history` 顯示 REVISION 1/2、`kubectl get pods -w` 有執行（但因為快照後無變化而誤以為異常）。回報兩點未解：`-w`（`--watch`）的語意，以及 `rollout history` 的 CHANGE-CAUSE `<none>`（誤讀為「無 REVISION 欄」）。

**Evidence:** 使用者貼出的三段輸出：`rollout history`（REVISION 1/2、CHANGE-CAUSE `<none>`）、`get pods` 與 `get pods -w`（三顆 Running、無 RESTARTS）。

**Implications:** 已於回覆中講解並修正 Lesson 0002 教材（步驟 8/9/10 註解、考場小抄補「回滾=新 REVISION」）。後續課程沿用「雙終端機 + `-w`」練法強化 watch 直覺。使用者輸出顯示他可能尚未實際執行 `rollout undo`（history 無 REVISION 3）——Lesson 3 開場可請他補做並觀察新編號，順帶確認自我修復與回滾都已親眼看過。
