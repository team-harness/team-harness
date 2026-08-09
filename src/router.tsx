import { useCallback, useEffect, useSyncExternalStore } from "react";

// 站点只有首页、列表、文章三种路径，用 History API 手写即可，不引路由库。
// 全局拦截同源链接的点击，所以现有的 <a href="/..."> 无需改写成组件。

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function currentPath() {
  return window.location.pathname;
}

export function navigate(to: string, { replace = false } = {}) {
  const url = new URL(to, window.location.origin);
  const samePage = url.pathname === window.location.pathname && url.search === window.location.search;

  if (replace || samePage) window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);

  emit();
  scrollToTarget(url.hash);
}

/** 有 hash 就滚到锚点，否则回到顶部。等一帧让目标路由先渲染出来。 */
function scrollToTarget(hash: string) {
  requestAnimationFrame(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/** 归一化后的当前路径，末尾斜杠去掉（"/" 本身保留）。 */
export function usePathname(): string {
  const pathname = useSyncExternalStore(subscribe, currentPath, currentPath);
  return pathname.replace(/(.)\/+$/, "$1");
}

export function useRouter() {
  useEffect(() => {
    const onPopState = () => {
      emit();
      scrollToTarget(window.location.hash);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      // 站外链接、mailto: 之类交给浏览器
      if (!href.startsWith("/") && !href.startsWith("#")) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // 纯锚点跳转保持浏览器默认行为，地址栏和历史记录都更符合预期
      if (url.pathname === window.location.pathname && url.hash) return;

      event.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, []);
}

/** 设置文档标题与 description，离开页面时还原。 */
export function useDocumentMeta(title: string, description?: string) {
  const apply = useCallback(() => {
    const previousTitle = document.title;
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = tag?.content;

    document.title = title;
    if (tag && description) tag.content = description;

    return () => {
      document.title = previousTitle;
      if (tag && previousDescription !== undefined) tag.content = previousDescription;
    };
  }, [title, description]);

  useEffect(apply, [apply]);
}
