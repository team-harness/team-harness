import { useState, type ReactNode } from "react";
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
  Github,
  Globe2,
  History,
  Menu,
  MessagesSquare,
  Network,
  Pin,
  Play,
  Server,
  Share2,
  ShieldCheck,
  Terminal,
  Waypoints,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";

const links = {
  organization: "https://github.com/team-harness",
  paseo: "https://github.com/team-harness/paseo",
  csAgent: "https://github.com/codestable/cs-agent-mcp",
  codeStable: "https://github.com/codestable/CodeStable",
  threadshare: "https://github.com/team-harness/threadshare",
  threadshareDemo:
    "https://cloud-thread.team-harness.com/?id=caced619-3c12-4257-9ddb-19516223d30d",
  threadshareService: "https://cloud-thread.team-harness.com",
  licell: "https://github.com/agents-infrastructure/licell",
};

const workflow = [
  { number: "01", label: "研发", product: "Paseo", icon: Play },
  { number: "02", label: "协作", product: "cs-agent-mcp", icon: Network },
  { number: "03", label: "约束", product: "CodeStable", icon: ShieldCheck },
  { number: "04", label: "分享", product: "Threadshare", icon: Share2 },
  { number: "05", label: "交付", product: "Licell", icon: CloudUpload },
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

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="返回 Team Harness 首页">
      <span className="brand-mark" aria-hidden="true">
        <Workflow size={19} strokeWidth={2.2} />
      </span>
      <span>Team Harness</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">
          <a href="#stack">工具链</a>
          <a href="#paseo">定制 Paseo</a>
          <a href="#principles">工程理念</a>
        </nav>
        <a className="nav-github" href={links.organization} target="_blank" rel="noreferrer">
          <Github size={17} />
          GitHub
          <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          title={open ? "关闭导航" : "打开导航"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="移动端导航">
        <a href="#stack" onClick={close}>工具链</a>
        <a href="#paseo" onClick={close}>定制 Paseo</a>
        <a href="#cs-agent-mcp" onClick={close}>cs-agent-mcp</a>
        <a href="#codestable" onClick={close}>CodeStable</a>
        <a href="#threadshare" onClick={close}>Threadshare</a>
        <a href="#licell" onClick={close}>Licell</a>
      </nav>
    </header>
  );
}

function GithubLink({ href, label = "GitHub" }: { href: string; label?: string }) {
  return (
    <a className="button button-secondary" href={href} target="_blank" rel="noreferrer">
      <Github size={18} />
      {label}
      <ArrowUpRight size={16} />
    </a>
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
          <div className="eyebrow"><span /> Agent engineering systems</div>
          <h1>Team Harness</h1>
          <p className="hero-lead">把 Agent 从一次对话，带进完整交付链路。</p>
          <p className="hero-support">
            围绕研发、协作、约束、分享与部署，构建团队真正可以持续使用的 Agent 工程工具。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#stack">
              <ArrowDown size={18} />
              查看工具链
            </a>
            <GithubLink href={links.organization} label="开源项目" />
          </div>
        </motion.div>
        <div className="hero-proof" aria-label="Team Harness 工具链摘要">
          <div><strong>05</strong><span>开源工具</span></div>
          <div><strong>Codex + Claude</strong><span>一等支持</span></div>
          <div><strong>Local to Cloud</strong><span>完整交付面</span></div>
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
          <p className="section-kicker">The harness loop</p>
          <h2>一个从研发到交付的<br />Agent 工程闭环</h2>
          <p>每个工具解决一个明确环节，又能组合成一条可审查、可复用的团队工作流。</p>
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
            <h2>为团队运行态<br />重新定制的 Paseo</h2>
          </div>
          <div className="paseo-intro">
            <p>
              在持续同步上游能力的基础上，我们补齐团队真正关心的控制面：全局状态与成本、可审阅分享、既有 Agent 调度和跨 Host 连续性。
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
          <p className="section-kicker">What we customized</p>
          <p>以下能力由 Team Harness fork 维护，不把上游已有的通用功能重复计算在内。</p>
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
          <p className="section-kicker">Local multi-agent control plane</p>
          <h2>把多个编码 Agent<br />接入同一棵协作树</h2>
          <p className="product-lead">
            一个本地 stdio MCP 服务，把 Codex、Claude 与其他 ACP Agent 统一成 `cs_agent_*` 工具。根 Agent 可以创建、等待、取消和销毁子 Agent，子 Agent 也能继续递归委派。
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
          <p className="section-kicker">Software lifecycle orchestration</p>
          <h2>约束软件生命周期，<br />而不是堆叠 <span className="nowrap">Agent 角色</span></h2>
          <p className="product-lead">
            面向严肃工程的 AI 编码工作流。CodeStable 围绕需求、架构、特性、问题与决策组织项目记忆，让人和 Agent 在跨会话、跨阶段的迭代里仍然遵守同一组事实。
          </p>
          <div className="inline-facts">
            <span>人在环</span><span>项目记忆</span><span>可复现实验</span><span>Codex / Claude</span>
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
          <p className="section-kicker">Portable agent conversation sharing</p>
          <h2>把 Agent 过程变成<br />可审阅的交付资产</h2>
          <p className="product-lead">
            独立的 API、只读 Viewer 与 CLI，把 Codex、Claude 和 Paseo 会话导出为统一历史格式。默认公共服务开箱即用，也可以独立部署到自己的 Cloudflare 或阿里云环境。
          </p>
          <ul className="feature-list">
            <li><Check size={17} />保留对话、思考、工具活动与完整时间线</li>
            <li><Check size={17} />Producer 侧递归脱敏凭据，Viewer 只读展示</li>
            <li><Check size={17} />稳定 JSON 输出，适合 Agent 与自动化调用</li>
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
          <p className="section-kicker">Alibaba Cloud delivery surface</p>
          <h2>Agent 写出的服务，<br />稳稳交付到阿里云</h2>
          <p className="product-lead">
            面向人类与 Agent 的阿里云部署 CLI。用一条主线串起 FC、OSS、ACR、DNS、SSL 与 CDN，同时保留原子资源命令、结构化输出、catalog 和 Skills。
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
          <p className="section-kicker">Built for durable work</p>
          <h2>Agent 友好，<br />团队可控。</h2>
        </Reveal>
        <div className="principles-grid">
          <Reveal className="principle">
            <Code2 size={23} />
            <h3>机器可调用</h3>
            <p>稳定 CLI、结构化协议、MCP 与 Skills，让 Agent 获得明确且可验证的操作表面。</p>
          </Reveal>
          <Reveal className="principle" delay={0.05}>
            <ShieldCheck size={23} />
            <h3>人仍在环</h3>
            <p>权限、审阅、历史与项目约束保留给团队，不把重要工程决策藏进黑盒自动化。</p>
          </Reveal>
          <Reveal className="principle" delay={0.1}>
            <Workflow size={23} />
            <h3>链路能闭合</h3>
            <p>从本地 Agent 到协作、知识、分享和云端交付，每个环节都能独立使用，也能彼此衔接。</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-cta">
        <div>
          <p className="section-kicker">Open source by default</p>
          <h2>把下一段 Agent 工作流，<br />交给更可靠的 Harness。</h2>
        </div>
        <a className="button button-primary" href={links.organization} target="_blank" rel="noreferrer">
          <Github size={18} />访问 Team Harness<ArrowUpRight size={16} />
        </a>
      </div>
      <div className="page-shell footer-bottom">
        <Brand />
        <p>Agent engineering tools for teams.</p>
        <div>
          <a href={links.paseo} target="_blank" rel="noreferrer">Paseo</a>
          <a href={links.csAgent} target="_blank" rel="noreferrer">cs-agent-mcp</a>
          <a href={links.codeStable} target="_blank" rel="noreferrer">CodeStable</a>
          <a href={links.threadshareService} target="_blank" rel="noreferrer">Threadshare</a>
          <a href={links.licell} target="_blank" rel="noreferrer">Licell</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkflowBand />
        <PaseoSection />
        <CsAgentSection />
        <CodeStableSection />
        <ThreadshareSection />
        <LicellSection />
        <Principles />
      </main>
      <Footer />
    </>
  );
}
