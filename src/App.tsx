import { lazy, Suspense, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  CircleDollarSign,
  CloudUpload,
  Code2,
  Globe2,
  History,
  MessagesSquare,
  Network,
  Pin,
  Server,
  Share2,
  ShieldCheck,
  Terminal,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { Footer, GithubLink, Header, links } from "./SiteChrome";

const IntroPage = lazy(() => import("./IntroPage"));

const workflow = [
  { number: "01", label: "编码工具", product: "Paseo", icon: Code2 },
  { number: "02", label: "稳定编码", product: "CodeStable + cs-agent-mcp", icon: ShieldCheck },
  { number: "03", label: "团队协同", product: "Threadshare", icon: MessagesSquare },
  { number: "04", label: "交付环境", product: "Licell", icon: CloudUpload },
];

const paseoFeatures = [
  {
    number: "01",
    icon: Activity,
    title: "全局运行状态与成本",
    description:
      "底部 Status Bar 汇总 token、费用、运行中与待注意会话。跨 Host 合并状态，子 Agent 自动聚合到根 Agent，并用持久 usage ledger 修正 Codex 计量。",
  },
  {
    number: "02",
    icon: Share2,
    title: "Threadshare 原生分享",
    description:
      "从任意用户消息选择分享起点，导出完整时间线与 Codex 子 Agent 历史。保留 Markdown、thought、activity 与工具数据，上传前递归脱敏凭据。",
  },
  {
    number: "03",
    icon: Waypoints,
    title: "已有 Agent 复用",
    description:
      "计划任务可直接选择已存在的 Agent 作为执行目标，表单、CLI 与持久化语义保持一致，并支持跨 Host 选择，不重复创建上下文。",
  },
  {
    number: "04",
    icon: Pin,
    title: "团队工作区连续性",
    description:
      "会话导航、历史与 workspace Pin 共用同一数据模型；多 Host 元数据一致呈现，并持续维护 macOS 桌面打包和本地开发稳定性。",
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectMark({ icon: Icon, tone, children }: { icon: LucideIcon; tone: string; children: ReactNode }) {
  return (
    <div className={`project-identity ${tone}`}>
      <span className="project-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.9} /></span>
      <span>{children}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero-media"
        src="/assets/paseo-hero.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
      />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-inner page-shell">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow"><span /> Harness for the agent-native team</div>
          <h1>Team Harness</h1>
          <p className="hero-lead">提升人、Agent、团队与环境的整体效率。</p>
          <p className="hero-support">
            从随时可用的编码工具，到稳定研发、上下文协同和 Agent 友好的云交付，为团队搭起一套完整的工程 Harness。
          </p>
          <a className="hero-story-link" href="/intro">
            深入了解 Team Harness <ArrowRight size={16} />
          </a>
          <div className="hero-actions">
            <a className="button button-primary" href="#stack">
              <ArrowDown size={18} />
              查看能力框架
            </a>
            <GithubLink href={links.organization} label="开源项目" />
          </div>
        </motion.div>
        <div className="hero-proof" aria-label="Team Harness 能力摘要">
          <div><strong>04 Layers</strong><span>覆盖完整团队系统</span></div>
          <div><strong>05 Tools</strong><span>开源工程工具</span></div>
          <div><strong>Human to Cloud</strong><span>从想法到交付</span></div>
        </div>
      </div>
    </section>
  );
}

function WorkflowBand() {
  return (
    <section className="workflow-band" id="stack">
      <div className="page-shell">
        <Reveal className="workflow-heading">
          <p className="section-kicker">Four layers, one system</p>
          <h2>一套覆盖人、Agent、<br />团队与环境的 Harness</h2>
          <p>我们不只优化一次编码任务，而是打通个人生产力、稳定研发、团队接力与云端交付。</p>
        </Reveal>
        <div className="workflow-grid">
          {workflow.map(({ number, label, product, icon: Icon }, index) => (
            <Reveal className="workflow-step" delay={index * 0.05} key={product}>
              <div className="workflow-step-top"><span>{number}</span><Icon size={20} /></div>
              <strong>{label}</strong>
              <span className="workflow-product">{product}</span>
              {index < workflow.length - 1 && <ArrowRight className="workflow-arrow" size={17} aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaseoSection() {
  return (
    <section className="product-section paseo-section" id="paseo">
      <div className="page-shell">
        <Reveal className="paseo-heading">
          <div>
            <div className="paseo-identity">
              <span className="paseo-logo-wrap"><img src="/assets/paseo-logo.svg" alt="" loading="lazy" decoding="async" /></span>
              <span>Paseo</span>
              <span className="custom-label">Team Harness Custom Build</span>
            </div>
            <h2>团队随时可用的<br />Agent 编码工作台</h2>
          </div>
          <div className="paseo-intro">
            <p>
              Paseo 让团队成员在桌面或移动端随时发起、接续和管理编码任务。我们在持续同步上游能力的同时，补齐全局状态、成本、分享和跨 Host 连续性，让 vibe coding 真正进入日常生产。
            </p>
            <GithubLink href={links.paseo} label="查看定制版本" />
          </div>
        </Reveal>

        <Reveal className="paseo-visual">
          <div className="visual-label"><span>Team workspace</span><span>Desktop + Mobile</span></div>
          <img
            src="/assets/paseo-hero.webp"
            alt="Paseo 的桌面和移动端 Agent 工作区界面"
            loading="lazy"
            decoding="async"
          />
          <div className="status-ribbon" aria-label="Paseo 定制状态能力">
            <span className="status-name"><Activity size={16} /> Global Status</span>
            <span><CircleDollarSign size={15} /> Usage ledger</span>
            <span><Server size={15} /> Multi-host</span>
            <span><History size={15} /> Session history</span>
            <span><Pin size={15} /> Workspace pin</span>
          </div>
        </Reveal>

        <div className="custom-heading">
          <p className="section-kicker">Built for team productivity</p>
          <p>这些定制能力让个人随时能开始，也让团队看得见所有 Agent 的运行状态与使用成本。</p>
        </div>
        <div className="paseo-capabilities">
          {paseoFeatures.map(({ number, icon: Icon, title, description }, index) => (
            <Reveal className="capability" delay={index * 0.05} key={title}>
              <div className="capability-meta"><span>{number}</span><Icon size={21} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CsAgentSection() {
  return (
    <section className="product-section cs-agent-section" id="cs-agent-mcp">
      <div className="page-shell split-layout">
        <Reveal className="product-copy">
          <ProjectMark icon={Network} tone="tone-cyan">cs-agent-mcp</ProjectMark>
          <p className="section-kicker">02 / Stable coding · collaboration</p>
          <h2>复杂任务，交给多个<br />Agent 协同完成</h2>
          <p className="product-lead">
            稳定编码不只需要约束，也需要协作。cs-agent-mcp 把 Codex、Claude 与其他 ACP Agent 接入同一个本地控制面，让主 Agent 能按任务分工、并行推进、汇总结果，并始终共享同一份工作区上下文。
          </p>
          <ul className="feature-list">
            <li><Check size={17} />Codex、Claude 重点实机支持，并复用本机登录状态</li>
            <li><Check size={17} />Workspace 隔离的共享控制面与持久会话</li>
            <li><Check size={17} />权限回传、幂等消息、批量等待与级联取消</li>
          </ul>
          <div className="product-actions">
            <GithubLink href={links.csAgent} />
            <a className="text-link" href="https://www.npmjs.com/package/cs-agent-mcp" target="_blank" rel="noreferrer">
              npm package <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <Reveal className="agent-terminal" delay={0.08}>
          <div className="terminal-bar">
            <div><span /><span /><span /></div>
            <span>local / workspace control plane</span>
            <Terminal size={16} />
          </div>
          <div className="terminal-body">
            <p><span className="prompt">$</span> npm install -g cs-agent-mcp@latest</p>
            <p><span className="muted">ready</span> cs-agent-mcp 0.3.0</p>
            <p className="terminal-gap"><span className="call">cs_agent_capabilities</span></p>
            <p><span className="tree">├─</span> codex <span className="ok">available</span></p>
            <p><span className="tree">└─</span> claude <span className="ok">available</span></p>
            <p className="terminal-gap"><span className="call">cs_agent_create</span> <span className="dim">role=implementation</span></p>
            <p><span className="tree">├─</span> codex / implement <span className="running">running</span></p>
            <p><span className="tree">└─</span> claude / review <span className="waiting">waiting</span></p>
            <p className="terminal-gap"><span className="call">cs_agent_wait_many</span> <span className="dim">mode=all</span></p>
            <p><span className="ok">complete</span> 2 turns, one shared workspace</p>
          </div>
          <div className="terminal-footer">
            <span><Network size={15} /> recursive delegation</span>
            <span><ShieldCheck size={15} /> permission aware</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CodeStableSection() {
  return (
    <section className="product-section codestable-section" id="codestable">
      <div className="page-shell media-layout media-left">
        <Reveal className="product-media">
          <img
            src="/assets/codestable-workflow.webp"
            alt="CodeStable 软件生命周期工作流"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
        <Reveal className="product-copy" delay={0.08}>
          <ProjectMark icon={Braces} tone="tone-amber">CodeStable Skills</ProjectMark>
          <p className="section-kicker">02 / Stable coding · constraints</p>
          <h2>给 Agent 一副马鞍，<br />让人始终握住缰绳</h2>
          <p className="product-lead">
            更强的 Agent 不会自动带来稳定的软件研发。CodeStable 用一组薄而明确的 Skills 组织需求、架构、特性、问题与决策：给 Agent 更多有效上下文，让工程经验持续留存，也让人更好地驾驭 Agent 完成复杂任务。
          </p>
          <div className="inline-facts">
            <span>Thin harness</span><span>More context</span><span>经验留存</span><span>人在驾驶位</span>
          </div>
          <GithubLink href={links.codeStable} label="获取 Skills" />
        </Reveal>
      </div>
    </section>
  );
}

function ThreadshareSection() {
  return (
    <section className="product-section threadshare-section" id="threadshare">
      <div className="page-shell media-layout">
        <Reveal className="product-copy">
          <ProjectMark icon={MessagesSquare} tone="tone-sage">Threadshare</ProjectMark>
          <p className="section-kicker">03 / Human collaboration</p>
          <h2>人与人协同时，<br />把 Agent 上下文一起交接</h2>
          <p className="product-lead">
            当每个人都在和 Agent 协同，人与人之间的交接就不能只剩一个结论。Threadshare 把完整对话生成只读链接，让同事看到问题如何被理解、工具如何被使用、结论如何形成，并从同一份上下文继续讨论。
          </p>
          <ul className="feature-list">
            <li><Check size={17} />不只分享结论，也分享形成结论的完整上下文</li>
            <li><Check size={17} />从任意消息开始，保留对话、思考、工具活动与时间线</li>
            <li><Check size={17} />支持 Codex、Claude 和 Paseo，分享前自动递归脱敏</li>
          </ul>
          <div className="product-actions">
            <a className="button button-dark" href={links.threadshareDemo} target="_blank" rel="noreferrer">
              <Globe2 size={18} />查看真实分享<ArrowUpRight size={16} />
            </a>
            <GithubLink href={links.threadshare} />
          </div>
        </Reveal>
        <Reveal className="product-media threadshare-media" delay={0.08}>
          <div className="browser-bar">
            <div><span /><span /><span /></div>
            <span>cloud-thread.team-harness.com</span>
            <span className="read-only">Read-only</span>
          </div>
          <img src="/assets/threadshare-viewer.png" alt="Threadshare 只读会话 Viewer" loading="lazy" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}

function LicellSection() {
  return (
    <section className="product-section licell-section" id="licell">
      <div className="page-shell media-layout media-left">
        <Reveal className="product-media licell-media">
          <img
            src="/assets/licell-promo.svg"
            alt="Licell CLI 部署阿里云 FC、OSS、CDN 与 HTTPS 的工作流"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
        <Reveal className="product-copy" delay={0.08}>
          <ProjectMark icon={CloudUpload} tone="tone-coral">Licell CLI</ProjectMark>
          <p className="section-kicker">04 / Agent-native delivery</p>
          <h2>让 Agent 把代码<br />直接交付到阿里云</h2>
          <p className="product-lead">
            云基础设施也应该面向 Agent，而不只是面向控制台操作。Licell 为阿里云提供 Agent 可发现、可调用、可验证的交付界面，用一条主线串起 FC、OSS、ACR、DNS、SSL 与 CDN，让人和 Agent 使用同一套部署语言。
          </p>
          <div className="command-line"><span>$</span> licell deploy --type api --target preview</div>
          <ul className="feature-list compact-list">
            <li><Check size={17} />API、Task 与静态站统一部署体验</li>
            <li><Check size={17} />preview、release、promote、rollback 完整链路</li>
            <li><Check size={17} />Agent 可发现命令与 JSON 输出</li>
          </ul>
          <GithubLink href={links.licell} />
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="principles" id="principles">
      <div className="page-shell">
        <Reveal className="principles-heading">
          <p className="section-kicker">Human × Agent × Team × Environment</p>
          <h2>人不再是执行者，<br />而是流程里的那道 Gate。</h2>
        </Reveal>
        <div className="principles-grid">
          <Reveal className="principle">
            <Code2 size={23} />
            <h3>人 · 只在关键点介入</h3>
            <p>不逐行写代码，只在有后果的地方放行、拦截或补上缺的信息。前提是接入没有门槛——任何设备、任何时间，切进任何一个项目。</p>
          </Reveal>
          <Reveal className="principle" delay={0.05}>
            <ShieldCheck size={23} />
            <h3>Agent · 稳定往下走</h3>
            <p>需求、架构、审查这些规范下沉成每次都执行的约束。薄约束配厚上下文，让它走得更远，也在真该问的地方停下来。</p>
          </Reveal>
          <Reveal className="principle" delay={0.1}>
            <MessagesSquare size={23} />
            <h3>团队 · Gate 能交接</h3>
            <p>结论背后的完整对话本身就是交付物。接手的人能回到过程里，而不是只听一段转述。</p>
          </Reveal>
          <Reveal className="principle" delay={0.15}>
            <CloudUpload size={23} />
            <h3>环境 · 交付自己走完</h3>
            <p>云平台需要一个 Agent 能发现、能调用、能验证的接口，否则自动化堵在部署这步，人被迫退回执行者。</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  if (window.location.pathname.replace(/\/+$/, "") === "/intro") {
    return (
      <Suspense fallback={<div className="intro-loading"><span>Team Harness</span></div>}>
        <IntroPage />
      </Suspense>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkflowBand />
        <PaseoSection />
        <CodeStableSection />
        <CsAgentSection />
        <ThreadshareSection />
        <LicellSection />
        <Principles />
      </main>
      <Footer />
    </>
  );
}
