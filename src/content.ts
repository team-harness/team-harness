// 站点文章的唯一数据源。往 content/posts/ 放一个 .md 就会自动出现在列表和路由里，
// 不需要改这里，也不需要在组件里登记标题。

export type PostMeta = {
  title: string;
  date: string;
  summary: string;
  /** 文章页 hero 上方的小标签 */
  kicker?: string;
  /** <meta name="description">，缺省时回退到 summary */
  description?: string;
  heroImage?: string;
  /** 列表页置顶 */
  featured?: boolean;
  /** 尚未完成的文章，构建进产物但不进列表和路由 */
  draft?: boolean;
};

export type TocEntry = {
  id: string;
  /** 目录里显示的序号，01 起 */
  number: string;
  title: string;
};

export type Post = PostMeta & {
  slug: string;
  body: string;
  toc: TocEntry[];
  readingMinutes: number;
};

/**
 * 只认 `key: value`，够用且不引第三方 YAML。value 两侧的引号会被剥掉，
 * true/false 转布尔，其余一律当字符串——日期保持字符串可以避开时区偏移。
 */
function parseFrontmatter(raw: string): { meta: Record<string, string | boolean>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string | boolean> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1 || line.trimStart().startsWith("#")) continue;

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (!key) continue;
    meta[key] = value === "true" ? true : value === "false" ? false : value;
  }

  return { meta, body: raw.slice(match[0].length) };
}

/**
 * 目录锚点由标题顺序决定，不从中文标题里派生 slug：中文锚点在地址栏会被百分号编码，
 * 而且改标题就会让已分享的链接失效。
 */
function extractToc(body: string): TocEntry[] {
  const withoutCodeBlocks = body.replace(/```[\s\S]*?```/g, "");
  return [...withoutCodeBlocks.matchAll(/^##[ \t]+(.+?)[ \t]*$/gm)].map((match, index) => ({
    id: `section-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
    title: match[1].trim(),
  }));
}

/** 中文按字符数估，英文和代码按词估，两者相加。 */
function estimateReadingMinutes(body: string): number {
  const cjk = (body.match(/[一-鿿]/g) ?? []).length;
  const words = (body.replace(/[一-鿿]/g, " ").match(/[A-Za-z0-9_-]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 450 + words / 220));
}

const modules = import.meta.glob<string>("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function toPost(path: string, raw: string): Post {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { meta, body } = parseFrontmatter(raw);

  const title = typeof meta.title === "string" ? meta.title : slug;
  const summary = typeof meta.summary === "string" ? meta.summary : "";

  return {
    slug,
    title,
    date: typeof meta.date === "string" ? meta.date : "",
    summary,
    kicker: typeof meta.kicker === "string" ? meta.kicker : undefined,
    description: typeof meta.description === "string" ? meta.description : summary,
    heroImage: typeof meta.heroImage === "string" ? meta.heroImage : undefined,
    featured: meta.featured === true,
    draft: meta.draft === true,
    body: body.trim(),
    toc: extractToc(body),
    readingMinutes: estimateReadingMinutes(body),
  };
}

/** 置顶在前，其余按日期倒序。 */
export const posts: Post[] = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => !post.draft)
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.date.localeCompare(a.date);
  });

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return `${parsed.getFullYear()} 年 ${parsed.getMonth() + 1} 月 ${parsed.getDate()} 日`;
}
