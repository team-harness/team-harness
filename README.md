# Team Harness Website

Team Harness 官方网站，介绍 Paseo 定制版、cs-agent-mcp、CodeStable、Threadshare 与 Licell。

```bash
npm install
npm run dev
```

生产构建与 Cloudflare 部署：

```bash
npm run build
npm run deploy
```

生产域名：<https://www.team-harness.com>

## 写一篇新文章

在 `content/posts/` 下新建一个 `.md`，文件名就是网址：`content/posts/gates.md`
对应 `/blog/gates`。写完 `npm run deploy` 即可，不需要改任何组件——首页的
文章区块、列表页和详情页路由都是从这个目录扫出来的。

```markdown
---
title: 标题
date: 2026-08-20
kicker: 顶部的英文小标（可选）
summary: 列表页和首屏显示的一句话
description: 给搜索引擎和分享卡片用的描述（可选，默认取 summary）
heroImage: /assets/xxx.webp   # 可选，放在 public/assets/
featured: true                 # 可选，置顶到列表页头条位
draft: true                    # 可选，加上就不会发布
---

正文从这里开始，用 `##` 分节。
```

几点约定：

- 侧边目录由正文里的 `##` 自动生成，锚点是 `#section-1`、`#section-2`……
  按顺序编号而不是从中文标题派生。改标题不会让已分享的链接失效，
  但**在中间插入一节会让后面的锚点整体后移**。
- 列表排序：`featured` 优先，其次按 `date` 倒序。
- `content/wechat/` 放的是同一篇文章的公众号版本，不会发布到站点。
