# Kubernetes (CKA) Resources

## Knowledge

- [官方考綱: CNCF CKA Curriculum v1.35 (PDF)](https://github.com/cncf/curriculum/blob/master/CKA_Curriculum_v1.35.pdf)
  權威考綱全文。Use for: 任何關於「考什麼、權重多少」的爭議，以此為準。
- [官方認證頁: CKA | Linux Foundation](https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/)
  考試形式（2 小時實作、v1.35、$445、含 2 次補考與 Killer.sh 模擬）。Use for: 報考前確認最新考試細節。領域權重：架構 25% / 工作負載 15% / 網路 20% / 儲存 10% / 除錯 30%。
- [Kubernetes 官方文件: Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
  官方互動教學（建叢集、部署、探索、暴露、擴展、更新六章）。Use for: 每課前的主要來源與複習。
- [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
  控制平面與節點元件權威說明。Use for: Phase 0 架構課。
- [Kubernetes Architecture (Nodes / Controllers / Self-Healing)](https://kubernetes.io/docs/concepts/architecture/)
  節點、控制器模式、自我修復機制。Use for: Phase 0 與「控制器思維」相關課。
- [Pods 概念](https://kubernetes.io/docs/concepts/workloads/pods/)
  Pod 生命週期、條件、探針、QoS。Use for: Phase 0/1 工作負載課。
- [kubectl 速查: kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
  官方 kubectl 指令速查。Use for: 每課的終端機實作對照。
- [kubeadm 文件](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)
  安裝 kubeadm、建立/升級叢集、HA 拓撲。Use for: Phase 4 叢集管理課。
- [Certified Kubernetes Administrator (CKA) — KodeKloud](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/)
  實作導向的付費課程，口碑最高。Use for: 系統性補課、模擬題庫（付費，自選）。
- [Killer.sh — CKA Simulator](https://killer.sh/cka)
  官方指定模擬考環境（購考即含 2 次、每次 36 小時、17 題）。Use for: Phase 5 應考衝刺。
- [Killercoda — Kubernetes Playground](https://killercoda.com/kubernetes)
  免費瀏覽器內互動環境。Use for: 無本機環境時的快速練習。
- [影片: TechWorld with Nana — CKA Course（免費）](https://www.youtube.com/watch?v=X48VuDVv0do)
  免費且口碑良好的完整 CKA 影片課程。Use for: 每課課前快速預習或課後複習。
- [Kubernetes: Up and Running (O'Reilly, Burns/Beda/Hightower)](https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/)
  社群公認的深入書籍。Use for: 想追根究柢時的進階閱讀。
- [官方工具: kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/)
  本機多節點叢集工具。Use for: 每課的實際練習環境（WSL2 + Docker Desktop）。

## Wisdom (Communities)

- [CNCF Slack — #cka-exam-prep](https://slack.cncf.io/)
  官方 Slack，考生與已過考者聚集，考題情報與備考策略討論。Use for: 考前 2–3 週的情報確認與信心建立。
- [r/kubernetes](https://www.reddit.com/r/kubernetes/)
  大型務實社群，實務討論多。Use for: 真實世界的設計取捨、除錯案例。
- [Kubernetes SIG / Community](https://www.kubernetes.dev/)
  官方開發社群入口，可追蹤 roadmap 與 KEP。Use for: 想知道「官方下一步往哪走」時。
- 使用者偏好：自我進修者；社群以「偶爾潛水看情報」為主，尚不需主動融入（可再調整）。

## Gaps

- 尚未找到一本中文且品質穩定的 CKA 書籍；中文補充目前以官方簡中文件（kubernetes.io/zh-cn）為主，其餘由本工作區繁中課程補足。
- 尚未蒐集近期的考後心得（2025–2026）；Phase 5 衝刺前補上。
