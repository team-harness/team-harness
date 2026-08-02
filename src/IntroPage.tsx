import { useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import introMarkdown from "../intro.md?raw";
import { Footer, GithubLink, Header, links } from "./SiteChrome";

const introLayers = [
  { number: "01", label: "编码工具", product: "Paseo" },
  { number: "02", label: "稳定编码", product: "CodeStable + cs-agent-mcp" },
  { number: "03", label: "团队协同", product: "Threadshare" },
  { number: "04", label: "交付环境", product: "Licell" },
];

const articleSections = [
  { id: "system", number: "01", title: "从更强的 Agent，到更强的系统" },
  { id: "coding", number: "02", title: "第一层：编码工具，让每个人随时能够开始" },
  { id: "stable", number: "03", title: "第二层：稳定编码，给 Agent 一副马鞍" },
  { id: "collaboration", number: "04", title: "第三层：团队协同，上下文本身就是交付物" },
  { id: "delivery", number: "05", title: "第四层：交付环境，云基础设施也应该面向 Agent" },
  { id: "workflow", number: "06", title: "五个工具，如何组成一条工作流" },
  { id: "efficiency", number: "07", title: "我们想提升的，是整体效率" },
] as const;

export default function IntroPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Team Harness：让人、Agent、团队与环境一起变快";
    if (description) {
      description.content = "深入了解 Team Harness 的四层工程体系，以及 Paseo、CodeStable、cs-agent-mcp、Threadshare 与 Licell。";
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="intro-page">
        <section className="intro-hero" id="top">
          <img className="intro-hero-media" src="/assets/paseo-hero.webp" alt="" aria-hidden="true" fetchPriority="high" />
          <div className="intro-hero-scrim" aria-hidden="true" />
          <motion.div
            className="intro-hero-inner page-shell"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="article-back-link" href="/"><ArrowLeft size={16} />返回首页</a>
            <p className="section-kicker">The Team Harness philosophy</p>
            <h1>Team Harness：<br />让人、Agent、团队与环境<br />一起变快</h1>
            <p>从个人编码到云端交付，完整理解我们为什么构建这套面向 Agent 时代的团队工程 Harness。</p>
          </motion.div>
          <div className="intro-layer-strip page-shell" aria-label="Team Harness 四层能力">
            {introLayers.map(({ number, label, product }) => (
              <div key={label}><span>{number}</span><strong>{label}</strong><small>{product}</small></div>
            ))}
          </div>
        </section>

        <section className="article-band">
          <div className="article-layout page-shell">
            <aside className="article-aside">
              <p className="section-kicker">本文内容</p>
              <nav aria-label="文章目录">
                {articleSections.map(({ id, number, title }) => (
                  <a href={`#${id}`} key={id}><span>{number}</span>{title}</a>
                ))}
              </nav>
              <a className="article-project-link" href={links.organization} target="_blank" rel="noreferrer">
                <Github size={17} />查看开源项目<ArrowUpRight size={15} />
              </a>
            </aside>

            <article className="article-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: () => null,
                  h2: ({ children }) => {
                    const section = articleSections.find(({ title }) => title === String(children));
                    return <h2 id={section?.id}>{children}</h2>;
                  },
                  a: ({ href, children }) => {
                    const external = href?.startsWith("http");
                    return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
                  },
                  table: ({ children }) => <div className="article-table-wrap"><table>{children}</table></div>,
                }}
              >
                {introMarkdown}
              </ReactMarkdown>
            </article>
          </div>
        </section>

        <section className="article-closing">
          <div className="page-shell article-closing-inner">
            <p className="section-kicker">Human × Agent × Team × Environment</p>
            <h2>让 Agent 的能力，<br />真正沉淀为团队的工程能力。</h2>
            <div className="product-actions">
              <a className="button button-primary" href="/"><ArrowLeft size={17} />返回 Team Harness</a>
              <GithubLink href={links.organization} label="查看开源项目" />
            </div>
          </div>
        </section>
      </main>
      <div className="intro-footer"><Footer /></div>
    </>
  );
}
