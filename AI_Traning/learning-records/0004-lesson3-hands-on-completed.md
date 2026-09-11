# Lesson 0003 實作完成；對「改 label → 控制器反應」機制有主動提問

使用者完成 Lesson 0003 全部實作：label 操作（新增、`--overwrite` 改值、`key-` 移除）、用 set-based selector 過濾，以及孤兒製造與修復（relabel → Pod 變成孤兒 → 改回 label → RS 自動回收多出的一顆）。過程中於 2026-08-15 主動提問步驟 13「改 label 是否會通知 control plane」，顯示理解已從「照打指令」推進到「事件驅動的控制器」——watch apiserver 事件 → 進工作佇列 → reconcile loop 處理。

**Evidence:** 機制性提問（2026-08-15：改 label 後控制器如何得知，理解 watch → reconcile 事件流）；0003 全部實作完成回報（2026-09-04）。

**Implications:** 0004 起可加重 YAML-first 與除錯情境（selector 不匹配、describe／Events 判讀）。0004 的 DaemonSet 實作需以 0001 的 kind-config 把單節點重建為雙節點叢集；重建會清掉舊練習物件，實作後叢集保持雙節點，供後續資源與排程課（0005）使用。
