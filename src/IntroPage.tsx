import { isValidElement, useEffect, type ReactNode } from "react";
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
  { id: "assembly", number: "01", title: "语言和框架，正在变成新的汇编" },
  { id: "engineering", number: "02", title: "软件工程没有过时，它换了执行者" },
  { id: "gate", number: "03", title: "人的新位置是 Gate" },
  { id: "layers", number: "04", title: "四层，是 Gate 模型的推论" },
  { id: "access", number: "05", title: "第一层：解绑设备，也解绑算力" },
  { id: "constraint", number: "06", title: "第二层：把工程规范写成 Agent 的约束" },
  { id: "context", number: "07", title: "第三层：上下文是交付物" },
  { id: "delivery", number: "08", title: "第四层：最后一段路，Agent 要能自己走完" },
  { id: "workflow", number: "09", title: "一次任务怎么走完" },
  { id: "boundary", number: "10", title: "什么时候不需要这套" },
  { id: "framework", number: "11", title: "那谁还关心框架" },
] as const;

// 目录锚点靠标题字符串精确匹配（见下方 h2 渲染），改动 intro.md 的 h2 而忘了同步
// articleSections 不会报错，只会让锚点静默失效。开发期直接把不一致打出来。
if (import.meta.env.DEV) {
  const headings = [...introMarkdown.matchAll(/^## (.+)$/gm)].map((match) => match[1].trim());
  const unregistered = headings.filter((title) => !articleSections.some((section) => section.title === title));
  const stale = articleSections.filter(({ title }) => !headings.includes(title)).map(({ title }) => title);

  if (unregistered.length || stale.length) {
    console.error(
      ["[IntroPage] intro.md 的 h2 与 articleSections 不一致，目录锚点会失效。",
        unregistered.length ? `  intro.md 中未登记的标题：${unregistered.join(" / ")}` : "",
        stale.length ? `  articleSections 中已失效的条目：${stale.join(" / ")}` : "",
      ].filter(Boolean).join("\n"),
    );
  }
}

function toPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (isValidElement(node)) return toPlainText((node.props as { children?: ReactNode }).children);
  return "";
}

export default function IntroPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = "Team Harness：软件工程下沉，人回到决策位";
    if (description) {
      description.content = "语言和框架正在变成新的汇编，工程规范下沉为 Agent 的约束，人回到 Gate 的位置。这是 Team Harness 的四层体系，以及 Paseo、CodeStable、cs-agent-mcp、Threadshare 与 Licell。";
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
            <h1>Team Harness：<br />软件工程下沉，<br />人回到决策位</h1>
            <p>软件工程二十年的积累没有过时，需要重新编排的是人和 AI 的关系——流程下沉给 Agent，人站回 Gate 的位置。</p>
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
                    const heading = toPlainText(children);
                    const section = articleSections.find(({ title }) => title === heading);
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
            <p className="section-kicker">Process sinks down, judgment moves up</p>
            <h2>软件工程没有消失，<br />它变成了 Agent 每次都会执行的东西。</h2>
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
