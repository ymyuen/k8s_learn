# Lesson 0007: add startupProbe sidebar demo

## Context
User noticed lesson 0007 has no `startupProbe` example. Verified: startupProbe appears only in the probe table (line 38), the mnemonic (line 46), and 考場小抄 (line 253) — no YAML anywhere in the course. 實作 A/B demo liveness/readiness only; startupProbe is never shown.

Decisions (agreed with user):
- **0006-style sidebar**: unnumbered boxes after 實作 B's tip box, before 實作 C. No step renumbering; 實作 C stays C (so the cross-reference at line 51 「本課實作 C 會裝」 needs no change).
- **Contrast demo + commands**: one terminal box with a runnable YAML and unnumbered run/observe/cleanup commands in comments.
- **Collateral**: add one 「本課戰果」 bullet only. Table/mnemonic/小抄/quiz untouched (already cover startup conceptually).

## Change
File: `AI_Traning/lessons/0007-probes-hpa.html` — two insertions, nothing else modified.

### Insertion 1 — terminal box (sidebar demo)
Insert after line 163 (closing `</div>` of 實作 B's 「你該觀察到什麼」 tip box), before line 165 `<h2>實作 C…`. Anchor for edit: the unique string `</div>\n\n<h2>實作 C：裝 metrics-server + HPA 現場擴縮</h2>`.

```html
<div class="terminal box">
  <div class="box-title">startup-demo.yaml — 慢啟動容器 + startupProbe 護航</div>
  <pre><span class="comment"># startup-demo.yaml — 容器要 45 秒才「啟動完成」，startupProbe 先擋著、liveness 暫不開跑（參考寫法，不動本課步驟）</span>
<span class="prompt">apiVersion: v1</span>
<span class="prompt">kind: Pod</span>
<span class="prompt">metadata:</span>
<span class="prompt">  name: startup-demo</span>
<span class="prompt">spec:</span>
<span class="prompt">  containers:</span>
<span class="prompt">  - name: app</span>
<span class="prompt">    image: busybox:1.36</span>
<span class="prompt">    command: ["sh", "-c", "sleep 45; touch /tmp/started; sleep 600"]</span>
<span class="prompt">    startupProbe:</span>
<span class="prompt">      exec:</span>
<span class="prompt">        command: ["cat", "/tmp/started"]</span>
<span class="prompt">      periodSeconds: 5</span>
<span class="prompt">      failureThreshold: 12      # 啟動預算 = 12 × 5 秒 = 60 秒，遠大於 45 秒的啟動時間</span>
<span class="prompt">    livenessProbe:</span>
<span class="prompt">      exec:</span>
<span class="prompt">        command: ["cat", "/tmp/started"]</span>
<span class="prompt">      periodSeconds: 5</span>
<span class="comment">#    關鍵：liveness 沒寫 initialDelaySeconds。startup 成功前 liveness／readiness 都不跑，
#    所以慢啟動不會被誤殺；startup 一成功，liveness 立刻接手。沒有 startupProbe 的年代，
#    只能用 initialDelaySeconds 猜啟動時間——猜太短＝啟動到一半被殺（小抄 ② 的症狀）。</span>

<span class="comment"># 想親眼看（約 2 分鐘，非本課編號步驟）：</span>
<span class="prompt">nano startup-demo.yaml</span>
<span class="prompt">kubectl apply -f startup-demo.yaml</span>
<span class="prompt">kubectl get pod startup-demo -w</span>
<span class="comment">#    前 45 秒：READY 0/1、RESTARTS 0——startup 還在等，沒有人被殺</span>
<span class="prompt">kubectl describe pod startup-demo</span>
<span class="comment">#    Events 連續幾次 "Startup probe failed"，45 秒後歸於安靜；READY 轉 1/1</span>
<span class="prompt">kubectl delete pod startup-demo</span>
<span class="prompt">rm -f startup-demo.yaml</span></pre>
</div>
```

Facts baked into the copy (verified against k8s docs behavior):
- Startup budget = `failureThreshold × periodSeconds` (12×5=60s > 45s startup).
- Until startupProbe succeeds, liveness/readiness probes are not executed (this is the gate).
- With startupProbe failing, pod shows READY 0/1 while RUNNING and RESTARTS stays 0; flips to 1/1 on success.
- Cleanup keeps the course's「課末無殘留」convention.

### Insertion 2 — one 戰果 bullet
Insert after the readiness bullet (line 259, `…並修好它。</li>`), before the metrics bullet. Anchor: the unique readiness-bullet `</li>` line followed by the metrics bullet `<li>你在 kind 裝好 metrics-server…`.

```html
  <li>你用 startupProbe 護航慢啟動容器：啟動完成前 liveness 不開跑（READY 0/1、RESTARTS 0），不必再拿 initialDelaySeconds 猜啟動時間。</li>
```

## Out of scope
- Steps 12–25 numbering, 實作 letters, probe table, mnemonic paragraph, 考場小抄, 小測驗, tip boxes, and every other file.
- No changes to glossary (already mentions startupProbe).

## Validation
- `git diff` shows pure insertions (one terminal box between 實作 B tip and 實作 C h2; one `<li>` in 戰果), zero deletions.
- Tag-balance check (div/pre/li counts) via python3 like the 0006 review.
- Open in browser: box renders between 「你該觀察到什麼」(實作 B) and 「實作 C」 heading; no HTML artifacts.
- Optional live check on the kind cluster: apply the YAML, `kubectl get pod startup-demo -w` shows READY 0/1 → 1/1 at ~45s with RESTARTS 0; `describe` shows repeated `Startup probe failed` events; then `kubectl delete pod startup-demo && rm -f startup-demo.yaml` (leave cluster residue-free; metrics-server in kube-system is expected to stay).
