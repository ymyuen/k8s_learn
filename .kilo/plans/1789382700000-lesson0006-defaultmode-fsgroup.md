# Lesson 0006: add defaultMode/permission-identity/fsGroup note

## Context
User asked (in chat) two questions about the lesson's `defaultMode: 0400` sentence (line 234 tip box):
1. Does `defaultMode: 0400` affect app operation? → Only if the container runs non-root (Permission denied, crash).
2. Explain `0440` owner/group permission triplets → root:root ownership, owner/group/others, kernel applies only the matched triplet, `fsGroup` fixes non-root access.

The user wants that explanation added to `AI_Traning/lessons/0006-configmap-secret.html`.

## Change
File: `AI_Traning/lessons/0006-configmap-secret.html` — insert **after line 235** (closing `</div>` of the tip box 「你該觀察到什麼」), **before** `<h2>實作 C...` (line 237). No other edits.

### Insertion 1 — a `warn box` explaining the trap + permission model
Follows the existing warn-box convention (cf. lines 47-50) and the plain `<table>` convention (cf. lines 19-45):

```html
<div class="warn box">
  <div class="box-title">defaultMode: 0400 的陷阱：app 用什麼身份跑？</div>
  <p>kubelet 掛載 Secret 檔案時，擁有者<strong>固定是 root:root</strong>。所以 <code>defaultMode: 0400</code>（<code>-r--------</code>）影響的只有「非 root 身份跑的容器」：</p>
  <ul>
    <li>容器以 <strong>root</strong> 跑（busybox 等多數映像的預設）→ <strong>不影響</strong>，app 照常讀得到。</li>
    <li>容器以<strong>非 root</strong> 跑（<code>securityContext.runAsUser</code>，或映像本身 <code>USER 1000</code>，如 nginx-unprivileged、postgres）→ 連讀都不能讀（Permission denied），通常啟動就 crash。</li>
  </ul>
  <p>背景知識：Unix 檔案權限分三組身份——<strong>owner／group／others</strong>，核心檢查時<strong>只套用命中的那一組</strong>（r=4、w=2、x=1）。以 <code>0440</code>（<code>r--r-----</code>）為例：</p>
  <table>
    <thead>
      <tr><th>0440 = r-- r-- ---</th><th>誰</th><th>結果</th></tr>
    </thead>
    <tbody>
      <tr><td>owner（r--）</td><td>uid 0（root，檔案擁有者）</td><td>可讀（root 另有 DAC_OVERRIDE，無視所有位元）</td></tr>
      <tr><td>group（r--）</td><td>uid 1000＋補充群組 2000（fsGroup 辦的）——你的 app 走這條</td><td><strong>可讀</strong></td></tr>
      <tr><td>others（---）</td><td>uid 3000、不在群組 2000</td><td>Permission denied</td></tr>
    </tbody>
  </table>
  <p>非 root 的正解＝<code>fsGroup</code>＋群組可讀：<code>fsGroup: 2000</code> 讓 kubelet 做兩件事——把檔案的 gid 改成 2000，<strong>同時</strong>把 2000 加進容器程序的補充群組。app（uid 1000）不是 owner，卻透過「群組成員」命中第二組位元拿到讀取權；不相干身份一律落在 others 被擋。另兩個小點：① Secret volume 本來就唯讀（更新由 kubelet 換檔），拿掉 write 位元對 app 沒額外影響；② <code>defaultMode</code> 套用整顆 volume，只想改單一鍵用 <code>items[].mode</code>。</p>
</div>
```

### Insertion 2 — a `terminal box` showing the hardened YAML
Follows the existing YAML-box convention (prompt spans per line, unnumbered `#` header comment — like pod-secret.yaml at lines 191-215). Deliberately **not** numbered steps, so steps 20-24 need no renumbering:

```html
<div class="terminal box">
  <div class="box-title">pod-secret-hardened.yaml — 非 root 讀 Secret 的正解</div>
  <pre><span class="comment"># pod-secret-hardened.yaml — 非 root ＋ fsGroup ＋ 0440：app 讀得到、別人讀不到（參考寫法，不動本課步驟）</span>
<span class="prompt">apiVersion: v1</span>
<span class="prompt">kind: Pod</span>
<span class="prompt">metadata:</span>
<span class="prompt">  name: secret-demo-hardened</span>
<span class="prompt">spec:</span>
<span class="prompt">  securityContext:</span>
<span class="prompt">    runAsNonRoot: true</span>
<span class="prompt">    runAsUser: 1000</span>
<span class="prompt">    fsGroup: 2000            # kubelet：檔案 gid 改成 2000 ＋ 2000 加進程序補充群組</span>
<span class="prompt">  containers:</span>
<span class="prompt">  - name: app</span>
<span class="prompt">    image: busybox:1.36</span>
<span class="prompt">    command: ["sh", "-c", "sleep 3600"]</span>
<span class="prompt">    volumeMounts:</span>
<span class="prompt">    - name: db</span>
<span class="prompt">      mountPath: /etc/db</span>
<span class="prompt">  volumes:</span>
<span class="prompt">  - name: db</span>
<span class="prompt">    secret:</span>
<span class="prompt">      secretName: db-secret</span>
<span class="prompt">      defaultMode: 0440      # -r--r-----：owner(root) 與群組(2000)可讀，others 不可</span></pre>
</div>
```

## Rationale for placement
- Line 234's tip box is where `defaultMode: 0400` is first mentioned; the new boxes extend it in place (實作 B section), before 實作 C starts.
- `warn box` matches the existing 「必背：base64 ≠ 加密」gotcha style; content is Traditional Chinese consistent with the lesson.

## Out of scope
- No changes to numbered steps 20-24, 考場小抄, 本課戰果, 小測驗, or any other file.
- No update to the top comparison table (line 42 already mentions defaultMode).

## Validation
- Open the lesson in a browser: two new boxes render between the 「你該觀察到什麼」 tip and 「實作 C」 heading; table styled like the top comparison table; no HTML artifacts (`<`, quotes render correctly).
- Optional live check (kind cluster; db-secret may need re-creating per step 11): `kubectl apply -f pod-secret-hardened.yaml` → `kubectl exec secret-demo-hardened -- ls -l /etc/db` shows `-r--r----- root 2000`, and `... -- cat /etc/db/DB_PASSWORD` succeeds as uid 1000. Delete the pod afterwards.
