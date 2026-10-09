# Lesson 0007: add startupProbe 失敗行為 warn box

## Context
User asked what happens when startupProbe keeps failing. Answer (CrashLoopBackOff loop, restartPolicy, no max-retry field) is worth capturing in the lesson. User chose: **純 warn box**（知識＋內嵌 case 敘述，不新增可跑指令）。

File: `AI_Traning/lessons/0007-probes-hpa.html`（目前 348 行；startup-demo terminal box 在 165–199，`<h2>實作 C` 在 201）。

## Change
Single insertion — one `warn box` between the startup-demo terminal box and 實作 C's `<h2>`. Nothing else modified (no 小抄/戰果/編號變動).

### Anchor (unique)
```
<span class="prompt">rm -f startup-demo.yaml</span></pre>
</div>

<h2>實作 C：裝 metrics-server + HPA 現場擴縮</h2>
```
(`rm -f startup-demo.yaml` appears exactly once.)

### Insert exactly this HTML (between `</div>` and `<h2>`, keep one blank line each side):
```html
<div class="warn box">
  <div class="box-title">startupProbe 預算耗盡：CrashLoopBackOff 無限重試，不會自己放棄</div>
  <p>上面的 demo 預算 60 秒 &gt; 啟動 45 秒，走不到失敗路徑；但把 <code>failureThreshold</code> 改成 4（預算 4 × 5 = 20 秒 &lt; 45 秒）就會看到：kubelet 敲滿 4 次門都沒好，依 <code>restartPolicy</code>（預設 <code>Always</code>）把容器殺掉重啟——而且每次重啟都拿到一份<strong>全新的啟動預算</strong>，於是永遠在「被殺 → 等 backoff → 重啟 → 再被殺」裡循環：<code>CrashLoopBackOff</code>（backoff 10 秒→20 秒→40 秒……上限 5 分鐘）。Pod 物件不會被刪掉，但全程 <code>READY 0/1</code>、liveness／readiness 一次都沒跑過（也就永遠進不了 Endpoints）——跟 liveness 失敗走同一套重啟機制，差別在 startup 死前另外兩種探針根本還沒開工。</p>
  <ul>
    <li><strong>能設定的：</strong><code>restartPolicy</code> 三選項——<code>Always</code>（預設，無限重啟）、<code>OnFailure</code>（失敗才重啟）、<code>Never</code>（被殺就躺平，STATUS 停在 Error）。這是 Pod 層級欄位；Deployment 只能 <code>Always</code>。</li>
    <li><strong>不能設定的：</strong>沒有「最大重試次數」欄位。要「時間上限」用 <code>spec.activeDeadlineSeconds</code>（超過就終結整顆 Pod、標 Failed）；要「失敗 N 次就放棄」是 Job 的 <code>backoffLimit</code>——裸 Pod／Deployment 做不到，只能靠外部告警。</li>
    <li><strong>修法：</strong>先判斷是預算太小（調大 <code>failureThreshold</code>／<code>periodSeconds</code>）還是探針本身寫錯（路徑、檔案不存在——調再多預算也沒用）；探針欄位建立後不可改（小抄 ⑤），刪掉重套最快。</li>
  </ul>
</div>
```

### Facts baked in (verified)
- Budget = failureThreshold × periodSeconds; each container restart gets a fresh startup budget.
- CrashLoopBackOff backoff: 10s doubling, 5-minute cap. Pod object is not deleted; READY 0/1; liveness/readiness never executed while startup hasn't succeeded (hence never in Endpoints).
- restartPolicy: Always/OnFailure/Never, Pod-level; Deployment requires Always.
- No max-retry field exists; activeDeadlineSeconds = total-time cap (pod → Failed); Job backoffLimit = N-failures semantics.
- Escape `>` / `<` as `&gt;` / `&lt;` (matches file convention); `→` used raw elsewhere in file, safe.

## Out of scope
- 弄壞它可跑 demo（failureThreshold: 4 實機觀察）——user 選擇不加。
- 考場小抄、本課戰果、探針對照表、口訣、步驟編號、glossary、其他檔案。

## Validation
1. `git diff` → 單一純插入（一個 warn box），0 刪除。
2. Tag balance via python3 heredoc（div/pre/li/span/ul/p/code 都配對）。
3. `open` 瀏覽器：box 出現在 startup-demo box 與 實作 C heading 之間，無 HTML artifact。
