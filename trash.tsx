// src/hooks/usePaginationWithUrl.ts
import { useCallback, useEffect, useState } from "react";
import { getIntFromSearch } from "../utils/url";

type Opts = {
  paramPage?: string;
  paramLimit?: string;
  defaultPage?: number;
  defaultLimit?: number;
  pushHistory?: boolean;
};

export function usePaginationWithUrl(opts?: Opts) {
  const {
    paramPage = "page",
    paramLimit = "limit",
    defaultPage = 1,
    defaultLimit = 12,
    pushHistory = false,
  } = opts ?? {};

  const readPage = () =>
    typeof window !== "undefined"
      ? getIntFromSearch(window.location.search, paramPage, defaultPage)
      : defaultPage;

  const readLimit = () =>
    typeof window !== "undefined"
      ? getIntFromSearch(window.location.search, paramLimit, defaultLimit)
      : defaultLimit;

  const [page, setPage] = useState<number>(readPage);
  const [limit, setLimit] = useState<number>(readLimit);

  const writeUrl = useCallback(
    (p: number, l: number) => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const params = url.searchParams;

      if (p !== defaultPage) params.set(paramPage, String(p));
      else params.delete(paramPage);

      if (l !== defaultLimit) params.set(paramLimit, String(l));
      else params.delete(paramLimit);

      const newHref = `${url.pathname}${params.toString() ? `?${params.toString()}` : ""}${url.hash ?? ""}`;

      if (pushHistory) window.history.pushState(null, "", newHref);
      else window.history.replaceState(null, "", newHref);
    },
    [paramPage, paramLimit, defaultPage, defaultLimit, pushHistory]
  );

  useEffect(() => {
    writeUrl(page, limit);
  }, [page, limit, writeUrl]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => {
      setPage(getIntFromSearch(window.location.search, paramPage, defaultPage));
      setLimit(getIntFromSearch(window.location.search, paramLimit, defaultLimit));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [paramPage, paramLimit, defaultPage, defaultLimit]);

  return {
    page,
    setPage,
    limit,
    setLimit,
  } as const;
}
