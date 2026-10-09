# Step 18: add EFFECT column to the taints command

## Context
`AI_Traning/lessons/0005-resources-scheduling.html` step 18 (「先回收 0001 的伏筆：control-plane 污點」box, lines 246-249) currently shows only the taint `key`. The user wants the command updated to also show the taint `effect` (`NoSchedule` / `PreferNoSchedule` / `NoExecute`), which lives in the sibling field `.spec.taints[*].effect`.

Verified live output on the current kind cluster:
```
NAME                 TAINTS                                  EFFECT
kind-control-plane   node-role.kubernetes.io/control-plane   NoSchedule
kind-worker          <none>                                  <none>
```

## Change
File: `AI_Traning/lessons/0005-resources-scheduling.html` — only the `先回收 0001 的伏筆` terminal box (lines 246-249). No other boxes or steps touched.

1. Line 247 — replace:
```html
<span class="prompt">kubectl get nodes -o 'custom-columns=NAME:.metadata.name,TAINTS:.spec.taints[*].key'</span>
```
with:
```html
<span class="prompt">kubectl get nodes -o 'custom-columns=NAME:.metadata.name,TAINTS:.spec.taints[*].key,EFFECT:.spec.taints[*].effect'</span>
```
(Keep the single quotes — zsh glob protection for `[*]`. Spelling is `taints` in both places; the user previously hit a `traints` typo.)

2. Lines 248-249 — update the expected-output comment to include the effect column, replacing:
```html
<span class="comment">#    kind-control-plane → node-role.kubernetes.io/control-plane
#    kind-worker        → &lt;none&gt;</span>
```
with:
```html
<span class="comment">#    kind-control-plane → node-role.kubernetes.io/control-plane / NoSchedule
#    kind-worker        → &lt;none&gt;</span>
```

3. Line 246 step comment stays as-is (it already says 「control-plane 掛著 NoSchedule 污點」, which now matches the visible output even better).

## Validation
- Run in browser render check: step 18 shows the quoted three-column command, no HTML artifacts.
- Run against the kind cluster:
  `kubectl get nodes -o 'custom-columns=NAME:.metadata.name,TAINTS:.spec.taints[*].key,EFFECT:.spec.taints[*].effect'`
  Expected: `kind-control-plane → node-role.kubernetes.io/control-plane / NoSchedule`, `kind-worker → <none> / <none>`.

## Out of scope
- No changes to steps 19+ or other terminal boxes.
- No new explanatory comment about the zsh quoting gotcha (not requested).
