# Add quotes to `custom-columns` command in Lesson 0005

## Context
`AI_Traning/lessons/0005-resources-scheduling.html` step 18 (line 247) shows:

```
kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints[*].key
```

In zsh (the user's shell), `[*]` is treated as a file glob and fails with `zsh: no matches found` before kubectl ever runs. Wrapping the whole `-o` argument in single quotes fixes it. This is the only occurrence of `custom-columns` in the repo.

## Change
File: `AI_Traning/lessons/0005-resources-scheduling.html`, line 247

Replace:
```html
<span class="prompt">kubectl get nodes -o custom-columns=NAME:.metadata.name,TAINTS:.spec.taints[*].key</span>
```

With:
```html
<span class="prompt">kubectl get nodes -o 'custom-columns=NAME:.metadata.name,TAINTS:.spec.taints[*].key'</span>
```

Notes:
- Single quotes need no HTML escaping; surrounding markup and the expected-output comments on lines 248-249 stay unchanged.
- Optional (only if user wants): append a short comment line under step 18 explaining the zsh gotcha, e.g. `#    注意：zsh 會把 [*] 當檔案 glob，參數要用單引號包住`.

## Validation
- Open the lesson in a browser; confirm step 18 renders with quotes and no HTML artifacts.
- Run the quoted command against the kind cluster; confirm it prints the taint columns instead of a zsh error.
