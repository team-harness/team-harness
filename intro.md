# Team Harness：让人、Agent、团队与环境一起变快

AI 编码工具正在迅速变强。过去需要工程师花几天完成的工作，现在可能只需要和 Agent 对话几个小时。

但当 Agent 真正进入团队日常，我们发现：更强的模型、更长的上下文和更多并行 Agent，并不会自动带来更高的团队效率。

个人可以更快地产生代码，软件研发却仍可能卡在任务失控、经验丢失、上下文断裂和部署困难上。局部速度提高了，整个系统不一定更快。

这正是我们构建 **Team Harness** 的起点。

## 从更强的 Agent，到更强的系统

Harness 原本是人与强大工具之间的连接和控制装置。它既传递力量，也提供约束，让人能够稳定地驾驭远超自身能力的系统。

我们认为，AI Agent 时代的软件工程也需要这样的 Harness。

它不是一条更长的 system prompt，也不是堆叠更多 Agent 角色。它应该覆盖人如何开始工作、Agent 如何稳定执行、团队如何交接上下文，以及成果如何进入真实运行环境。

因此，Team Harness 由四层能力组成：

| 层次 | 要解决的问题 | 对应工具 |
| --- | --- | --- |
| 编码工具 | 让团队成员随时随地使用 Agent 完成编码任务 | [Paseo](https://github.com/team-harness/paseo) |
| 稳定编码 | 为 Agent 提供约束、上下文、记忆与多 Agent 协作能力 | [CodeStable](https://github.com/codestable/CodeStable) + [cs-agent-mcp](https://github.com/codestable/cs-agent-mcp) |
| 团队协同 | 让人与人的协作带上完整的 Agent 对话上下文 | [Threadshare](https://github.com/team-harness/threadshare) |
| 交付环境 | 让 Agent 能够发现、调用并验证云端交付能力 | [Licell](https://github.com/agents-infrastructure/licell) |

这四层分别对应 **人、Agent、团队与环境**。它们可以独立使用，但组合起来才构成一套完整的团队工程系统。

## 第一层：编码工具，让每个人随时能够开始

Agent 编码首先应该是一种随手可用的生产力能力，而不是固定在某台电脑、某个终端或某次会话里的体验。

[Paseo](https://github.com/team-harness/paseo) 为团队提供桌面端和移动端 Agent 工作区。成员可以随时发起任务、查看进度、接续会话，在不同设备和 Host 之间保持工作连续性。

我们基于 Paseo 维护 Team Harness 定制版本，补充了团队真正关心的控制面：全局运行状态、token 与费用统计、跨 Host 会话、既有 Agent 复用，以及 Threadshare 原生分享。

这些能力的目标不是增加更多界面，而是让 vibe coding 从偶尔尝试变成团队随时可用、状态可见、成本可知的日常工作方式。

## 第二层：稳定编码，给 Agent 一副马鞍

Agent 能力越强，人越需要合适的控制方式。没有 Harness，速度可能只是更快地把错误带到更远的地方。

稳定编码包含两个互补的部分：**约束**决定任务应该怎样完成，**协作**决定复杂任务如何被拆分和汇总。

### CodeStable：薄约束、更多上下文与经验留存

[CodeStable](https://github.com/codestable/CodeStable) 是一组面向严肃软件研发的 Skills。它围绕需求、架构、特性、问题、审查和决策组织工作，而不是为每一种活动创造一个新的 Agent 角色。

我们把这种方式称为 **thin harness**：约束保持薄而明确，把更多空间留给 Agent 推理；与此同时，Agent 能获得与当前任务真正相关的项目上下文。

项目事实、工程决策和实践经验不会随着一次会话结束而消失。它们被持续整理和复用，让后续 Agent 能站在已有认知之上，而不是反复从零探索。

CodeStable 的目的不是替人做所有决定，而是让人更好地驾驭 Agent。人仍然定义目标、判断结果并掌握关键工程决策。

### cs-agent-mcp：让多个 Agent 在同一任务里协作

复杂研发任务很难由单个 Agent 一次完成。实现、测试、审查和调研常常可以并行，但前提是这些 Agent 能够被统一调度，并共享清晰的任务边界。

[cs-agent-mcp](https://github.com/codestable/cs-agent-mcp) 提供本地多 Agent 控制面，将 Codex、Claude 和其他 ACP Agent 接入同一棵协作树。

主 Agent 可以创建、等待、取消和汇总子 Agent；子 Agent 也可以继续递归委派。所有参与者在同一个 workspace 中协作，并保留权限、消息和会话状态。

CodeStable 与 cs-agent-mcp 分别解决“怎样稳定地做”和“怎样协同地做”。两者共同构成 Team Harness 的稳定编码层。

## 第三层：团队协同，上下文本身就是交付物

当每个人都在和 Agent 协作，人与人之间的交接方式也必须改变。

过去，同事可能只需要分享代码、文档和结论。现在，一个结论背后往往还有很长的 Agent 对话：问题怎样被理解、查过哪些资料、调用过什么工具，以及为什么放弃了其他方案。

如果这些上下文只留在个人会话里，接手者只能依赖转述。他很难判断误解发生在哪里，也可能重复 Agent 已经完成的探索。

[Threadshare](https://github.com/team-harness/threadshare) 将 Agent 对话转换为可分享的只读链接。它保留消息、思考、工具活动和完整时间线，同时在分享前递归识别并脱敏凭据。

团队不再只交换最终结论，而是可以回到结论形成的过程，在同一份上下文上审查、讨论和继续工作。

在 Agent 时代，上下文不只是个人工作记录。它正在成为人与人协作时必须交接的新型工程产物。

## 第四层：交付环境，云基础设施也应该面向 Agent

代码完成并不等于软件完成。Agent 写出的服务最终仍要进入云端，完成构建、配置、发布、验证、升级和回滚。

Vercel、Cloudflare 等平台已经展示了面向自动化和 Agent 的交付体验。对于国内团队，我们同样需要一个能够顺畅操作阿里云、并且适合 Agent 使用的工程界面。

[Licell](https://github.com/agents-infrastructure/licell) 因此而生。它用统一 CLI 串起阿里云 FC、OSS、ACR、DNS、SSL 与 CDN，并提供结构化输出、资源 catalog 和 Agent Skills。

Licell 同时支持 API、Task 和静态站点，覆盖 preview、release、promote 与 rollback。人和 Agent 使用同一套部署语言，执行结果也能够被机器读取和验证。

我们希望云基础设施不再只是一个等待人工点击的控制台，而是 Agent 可以安全发现、明确调用、可靠验证的交付环境。

## 五个工具，如何组成一条工作流

一套 Harness 的价值不在于工具数量，而在于上下文和工作能否顺畅地穿过各个环节。

一次完整的团队研发任务可以这样进行：

1. 团队成员通过 **Paseo** 发起任务，并在桌面或移动端持续掌握 Agent 状态。
2. **CodeStable** 提供当前任务需要遵守的项目事实、工程约束和生命周期流程。
3. 主 Agent 通过 **cs-agent-mcp** 将实现、测试与审查委派给多个 Agent 并行完成。
4. 需要同事参与判断时，通过 **Threadshare** 分享完整会话，而不是只转述一个结论。
5. 任务完成后，Agent 使用 **Licell** 将服务发布到阿里云，并读取结构化结果完成验证。

这里没有一个包办一切的超级 Agent。每一层都提供明确、可组合的操作表面，让人和 Agent 在正确的位置发挥各自的能力。

## 我们想提升的，是整体效率

Team Harness 不是五个项目的简单集合。它背后是一条更基本的判断：AI Agent 时代的生产力，不应该只用单个 Agent 完成一次任务的速度来衡量。

真正重要的是，团队成员是否随时能够开始，Agent 是否稳定受控，人与人之间的上下文是否连续，以及成果是否能够顺畅进入真实环境。

也就是说，我们想优化的是：

> **人 × Agent × 团队 × 环境**

任何一个环节成为瓶颈，其他环节的速度都很难转化成最终产出。只有让四者一起演进，Agent 的能力才会真正沉淀为团队的工程能力。

这就是我们正在构建的 [Team Harness](https://github.com/team-harness)：让人和 Agent 一起工作，也让整个团队一起变快。
