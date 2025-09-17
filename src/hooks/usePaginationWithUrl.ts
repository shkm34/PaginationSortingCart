import { useState, useEffect, useCallback } from "react";
import { getIntFromSearch } from "../utils/url";

type Opts = {
    paramsPage?: string;
    paramsLimit?: string;
    defaultPage?: number;
    defaultLimit?: number;
    pushHistory?: boolean;
};

export function usePaginationWithUrl(opts?: Opts) {
    const {
        paramsPage = "page",
        paramsLimit = "limit",
        defaultPage = 1,
        defaultLimit = 12,
        pushHistory = false,
    } = opts ?? {};

    const readPage = () => (
        typeof window !== "undefined"
            ? getIntFromSearch(window.location.search, paramsPage, defaultPage)
            : defaultPage
    )

    const readLimit = () => (
        typeof window !== "undefined"
            ? getIntFromSearch(window.location.search, paramsLimit, defaultLimit)
            : defaultLimit
    )

    const [page, setPage] = useState<number>(readPage)
    const [limit, setLimit] = useState<number>(readLimit)

    // Write current page/limit to the URL (replace by default)
    const writeUrl = useCallback(
        (p: number, l: number) => {
            if (typeof window === "undefined") return;

            const url = new URL(window.location.href)
            const params = url.searchParams;

            if (p !== defaultPage) params.set(paramsPage, String(p)); else params.delete(paramsPage)
            if (l !== defaultLimit) params.set(paramsLimit, String(l)); else params.delete(paramsLimit)

                const newHref = `${url.pathname}${params.toString() ? `?${params.toString()}` : ""}${url.hash ?? ""}`

                if (pushHistory) window.history.pushState(null, "", newHref);
                else window.history.replaceState(null, "", newHref);
        },
        [paramsPage, paramsLimit, defaultPage, defaultLimit, pushHistory]
    )

    // keep URL updated when state changes
    useEffect(() => {
        writeUrl(page, limit)
    }, [page, limit, writeUrl])

        
    // keep state updated when URL changes (back/forward navigation, or other changes)
    useEffect(() => {
         if (typeof window === "undefined") return;

        const onPopState = () => {
            const p = getIntFromSearch(window.location.search, paramsPage, defaultPage)
            const l = getIntFromSearch(window.location.search, paramsLimit, defaultLimit)
            setPage(p)
            setLimit(l)
        }

        window.addEventListener("popstate", onPopState)
        return () => window.removeEventListener("popstate", onPopState)
    }, [paramsPage, paramsLimit, defaultPage, defaultLimit])

    return{
    page,
    setPage,
    limit,
    setLimit,
  } as const

}

