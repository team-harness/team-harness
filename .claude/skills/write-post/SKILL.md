---
name: write-post
description: 把一段观点写成 team-harness.com 的文章。Use when the user hands over a rough idea, notes, or a paragraph of opinion to turn into an article for this site; when the user reviews a draft and gives revision feedback; or when revising an already-published post.
---

用户丢来一段观点，拿回一篇像他自己写的文章。成功的度量只有一个：**他每篇需要改的量，一篇比一篇少。**

## 风格从哪来

- **他怎么写**：读 `content/posts/` 里已发布的文章。那是他定稿认可的样本，比任何提取出来的规则准。动笔前重读一遍最近的一两篇。
- **他不要什么**：读 [`review-notes.md`](review-notes.md)。定稿里看不出被改掉的东西，这个文件补的就是这块，存他的原话。
- **手里有什么料、接下来写什么**：读 [`bank.md`](bank.md)。

## 流程

**1. 先问，别先写。** 先查 `bank.md`——题目可能已经在选题里，素材可能已经在库里，带着库存去问会具体得多。然后一次问齐：这篇要说服谁改变什么看法；有没有真实的经历、数字、踩过的坑（最容易漏报的一类，明确追问）；哪些想清楚了、哪些还没有；提不提产品。问出来的素材这篇用不上的也当场记进 `bank.md`。完成标准：能说出这篇的核心判断和支撑它的具体材料。

**2. 给骨架，等确认。** 章节标题加每节一句话意图，不写正文。和已发布文章重叠的部分链接过去；新主张和旧文矛盾时明确问「观点变了吗」，不许无声自相矛盾——变了的话讨论旧文要不要注记。

**3. 写正文。** 写进 `content/posts/<slug>.md`，frontmatter 见 README「写一篇新文章」。**先不部署。** 结构在定稿前定死：目录锚点按 `##` 顺序编号，发布后在中间插节会让已分享的深链指错位置。

**4. 吸纳 review。** 每条意见先改文章，再判断它是否超越这一篇。超越的按原话记进 `review-notes.md`（他的原句 + 怎么改的）；素材和选题进 `bank.md`；只关于这篇的事实订正不记。记了什么用一行告诉他，让他有机会说「你理解错了」。

**5. 定稿后部署。** `npm run build`，然后走代理 `npm run deploy`（代理不通时检查 ClashX 分组是否选中失效节点，切「自动选择」）。验证先比字节数和 md5 对上本地 `dist/`（SPA 兜底页约 1.3 KB，别被它骗过），再查文案。发布后把用掉的素材在 `bank.md` 标已用、选题划掉。

**6. 公众号版（他要时）。** `content/wechat/<slug>.md`，不发布到站点。整篇用「我」；段落切碎适应手机；去掉反引号；开头先交代 Team Harness 是什么（站点读者不需要，公众号读者需要）。改完和站点版双向比对，确认每处差异都是有意的。
