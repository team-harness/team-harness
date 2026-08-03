import { useState } from "react";
import { ArrowUpRight, Github, Menu, Workflow, X } from "lucide-react";

export const links = {
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

function Brand() {
  return (
    <a className="brand" href="/" aria-label="返回 Team Harness 首页">
      <span className="brand-mark" aria-hidden="true">
        <Workflow size={19} strokeWidth={2.2} />
      </span>
      <span>Team Harness</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">
          <a href="/#stack">能力框架</a>
          <a href="/#paseo">编码工具</a>
          <a href="/#codestable">稳定编码</a>
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
        <a href="/#stack" onClick={close}>能力框架</a>
        <a href="/#paseo" onClick={close}>编码工具 · Paseo</a>
        <a href="/#codestable" onClick={close}>稳定编码 · CodeStable</a>
        <a href="/#cs-agent-mcp" onClick={close}>多 Agent 协同 · cs-agent-mcp</a>
        <a href="/#threadshare" onClick={close}>团队协同 · Threadshare</a>
        <a href="/#licell" onClick={close}>交付环境 · Licell</a>
      </nav>
    </header>
  );
}

export function GithubLink({ href, label = "GitHub" }: { href: string; label?: string }) {
  return (
    <a className="button button-secondary" href={href} target="_blank" rel="noreferrer">
      <Github size={18} />
      {label}
      <ArrowUpRight size={16} />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-cta">
        <div>
          <p className="section-kicker">Open source by default</p>
          <h2>把工程流程交给 Agent，<br />把决策留给人。</h2>
        </div>
        <a className="button button-primary" href={links.organization} target="_blank" rel="noreferrer">
          <Github size={18} />访问 Team Harness<ArrowUpRight size={16} />
        </a>
      </div>
      <div className="page-shell footer-bottom">
        <Brand />
        <p>Harness for people, agents, teams and infrastructure.</p>
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
