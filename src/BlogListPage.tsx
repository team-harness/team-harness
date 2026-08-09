import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Github } from "lucide-react";
import { formatDate, posts } from "./content";
import { useDocumentMeta } from "./router";
import { Footer, Header, links } from "./SiteChrome";

export default function BlogListPage() {
  useDocumentMeta(
    "文章 · Team Harness",
    "Team Harness 的思考与实践记录：人和 Agent 怎么分工，工程规范怎么下沉，交付环境怎么面向 Agent。",
  );

  const [lead, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="blog-page">
        <section className="blog-hero">
          <div className="page-shell">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="section-kicker">Writing</p>
              <h1>文章</h1>
              <p className="blog-hero-lead">
                我们把做 Team Harness 过程中想清楚的事写下来——人和 Agent 怎么分工，
                工程规范怎么变成 Agent 的约束，以及这套判断在实践里哪些地方还没有答案。
              </p>
            </motion.div>
          </div>
        </section>

        <section className="blog-band">
          <div className="page-shell">
            {lead && (
              <a className="blog-lead" href={`/blog/${lead.slug}`}>
                {lead.heroImage && (
                  <div className="blog-lead-media">
                    <img src={lead.heroImage} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  </div>
                )}
                <div className="blog-lead-body">
                  {lead.kicker && <p className="section-kicker">{lead.kicker}</p>}
                  <h2>{lead.title}</h2>
                  <p>{lead.summary}</p>
                  <div className="article-meta">
                    {lead.date && <span><CalendarDays size={15} />{formatDate(lead.date)}</span>}
                    <span><Clock size={15} />约 {lead.readingMinutes} 分钟</span>
                  </div>
                  <span className="blog-lead-cta">读这篇<ArrowRight size={16} /></span>
                </div>
              </a>
            )}

            {rest.length > 0 && (
              <div className="blog-grid">
                {rest.map((post) => (
                  <a className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <div className="article-meta">
                      {post.date && <span><CalendarDays size={15} />{formatDate(post.date)}</span>}
                      <span><Clock size={15} />约 {post.readingMinutes} 分钟</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {posts.length === 0 && <p className="blog-empty">还没有发布的文章。</p>}
          </div>
        </section>

        <section className="article-closing">
          <div className="page-shell article-closing-inner">
            <p className="section-kicker">Open source by default</p>
            <h2>四层能力，<br />全部开源。</h2>
            <div className="product-actions">
              <a className="button button-primary" href={links.organization} target="_blank" rel="noreferrer">
                <Github size={17} />查看开源项目<ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <div className="intro-footer"><Footer /></div>
    </>
  );
}
