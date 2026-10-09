# User Preferences & Working Notes

## Language & Tone
- **Language**: Traditional Chinese (繁體中文).
- **Tone**: Hong Kong tone / colloquial HK Cantonese written style (香港口語／親切自然廣東話風格，例如「搞掂」、「睇下」、「踩坑」、「落地」、「貼地」、「吹水」等適度用語，專業術語保持英文標準對照).
- **Presentation Style**: Concept illustrations (圖解化、架構視覺化、ASCII / SVG / HTML 圖表、生動比喻).

## Goals & Exam Focus
- Target: Pass the Certified Kubernetes Administrator (CKA) exam.
- Exam nature: Hands-on practical command line (CLI) & YAML manipulation, time management, troubleshooting, cluster architecture.
- Teaching strategy: Build deep mental models (concept illustrations) + high-speed muscle memory (kubectl commands, imperative shortcuts, jq/jsonpath).

## Course Redesign Log (2026-09-21)
- 參考 `/Users/jasonyeung/Documents/k8s_learn/AI_Traning/lessons/` 嗰 20 課嘅詳細度（平均 200-425 行、terminal 實作＋「你應該觀察到咩」＋考場小抄＋3 題 quiz＋戰果＋下一步）。
- 決定：保留繁中＋香港口語＋SVG 概念圖解，只將 Lesson 0001/0002 加深到同參考教材一樣實淨（唔轉正式書面語、唔刪圖解）。
- Lesson 0001 已重寫：加「點解要成班機器」、分工表、kind 實作 6 步、Events 觀察、雙節點選配、taint 預告。
- Lesson 0002 已重寫：加三層結構表、5 秒 $do 工作流圖、實作 A 自癒＋實作 B rollout/rollback 全指令、加料 Lab。
- assets/style.css 已升級：新增 .meta/.terminal/.tip/.warn/.quiz/.term 共用元件；新增 assets/quiz.js。
- reference 已補齊：glossary.html＋cka-domain-map.html（連結已修正指向新課名；domain-map 標示 0003-0020 即將推出）。
- 0003-0020 按兵不動，等 user 逐課落 order 先做港式圖解版。
