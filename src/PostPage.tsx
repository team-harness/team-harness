import { isValidElement, useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock, Github } from "lucide-react";
import { formatDate, type Post } from "./content";
import { useDocumentMeta } from "./router";
import { Footer, GithubLink, Header, links } from "./SiteChrome";

function toPlainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (isValidElement(node)) return toPlainText((node.props as { children?: ReactNode }).children);
  return "";
}

export default function PostPage({ post }: { post: Post }) {
  useDocumentMeta(`${post.title} · Team Harness`, post.description);

  // 目录和正文的 h2 都来自同一份 body，标题文本必然对得上，不会再出现锚点失效。
  const anchors = useMemo(() => {
    const map = new Map<string, string>();
    for (const entry of post.toc) if (!map.has(entry.title)) map.set(entry.title, entry.id);
    return map;
  }, [post.toc]);

  return (
    <>
      <Header />
      <main className="intro-page">
        <section className="intro-hero" id="top">
          {post.heroImage && (
            <img className="intro-hero-media" src={post.heroImage} alt="" aria-hidden="true" fetchPriority="high" />
          )}
          <div className="intro-hero-scrim" aria-hidden="true" />
          <motion.div
            className="intro-hero-inner page-shell"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="article-back-link" href="/blog"><ArrowLeft size={16} />返回文章列表</a>
            {post.kicker && <p className="section-kicker">{post.kicker}</p>}
            <h1>{post.title}</h1>
            {post.summary && <p>{post.summary}</p>}
            <div className="article-meta">
              {post.date && <span><CalendarDays size={15} />{formatDate(post.date)}</span>}
              <span><Clock size={15} />约 {post.readingMinutes} 分钟</span>
            </div>
          </motion.div>
        </section>

        <section className="article-band">
          <div className="article-layout page-shell">
            <aside className="article-aside">
              <p className="section-kicker">本文内容</p>
              <nav aria-label="文章目录">
                {post.toc.map(({ id, number, title }) => (
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
                  h2: ({ children }) => <h2 id={anchors.get(toPlainText(children))}>{children}</h2>,
                  a: ({ href, children }) => {
                    const external = href?.startsWith("http");
                    return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{children}</a>;
                  },
                  table: ({ children }) => <div className="article-table-wrap"><table>{children}</table></div>,
                }}
              >
                {post.body}
              </ReactMarkdown>
            </article>
          </div>
        </section>

        <section className="article-closing">
          <div className="page-shell article-closing-inner">
            <p className="section-kicker">Process sinks down, judgment moves up</p>
            <h2>软件工程没有消失，<br />它变成了 Agent 每次都会执行的东西。</h2>
            <div className="product-actions">
              <a className="button button-primary" href="/blog"><ArrowLeft size={17} />看更多文章</a>
              <GithubLink href={links.organization} label="查看开源项目" />
            </div>
          </div>
        </section>
      </main>
      <div className="intro-footer"><Footer /></div>
    </>
  );
}
