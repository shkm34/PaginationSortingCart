// src/hooks/usePaginatedProducts.ts
import { useEffect, useMemo, useCallback} from "react";
import { useProducts } from "../hooks/useProducts";
import { usePaginationWithUrl } from "../hooks/usePaginationWithUrl";
import { useSearchFilterWithUrl } from "./useSearchFilterWithUrl";

// Public options you can pass when calling the hook
export type UsePaginatedProductsOpts = {
  initialPage?: number;       // default page when URL has none
  initialLimit?: number;      // default limit when URL has none
  pushHistory?: boolean;      // pushState instead of replaceState
  paramsPage?: string;         // query param name for page, default "page"
  paramsLimit?: string;        // query param name for limit, default "limit"
  //prefetch?: boolean;         // whether to prefetch next page
};

export function usePaginatedProducts(opts: UsePaginatedProductsOpts = {}) {

 const {
    initialPage = 1,
    initialLimit = 12,
    pushHistory = false,
    paramsPage = "page",
    paramsLimit = "limit",
  //  prefetch = true,
  } = opts;

  // 1) pagination state synced to URL
  const { page, setPage, limit, setLimit } = usePaginationWithUrl({
     paramsPage,
    paramsLimit,
    defaultPage: initialPage,
    defaultLimit: initialLimit,
    pushHistory,
  });

 const { q, setQ } = useSearchFilterWithUrl();
 
 const { data, isLoading, isError, error, isFetching, refetch } = useProducts({page, limit, q});


  const total = data?.total;
  const totalPages = useMemo(
    () => (typeof total === "number" && total > 0 ? Math.ceil(total / limit) : undefined),
    [total, limit]
  );

  const hasNext = typeof total === "number" ? page < (totalPages ?? 0) : true;

  const handlePrev = useCallback(() => setPage((s) => Math.max(1, s - 1)), []);
  const handleNext = useCallback(() => setPage((s) => s + 1), []);


  return {
    page,
    setPage,
    limit,
    data,
    products: data?.products ?? [],
    total,
    totalPages,
    hasNext,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    handlePrev,
    handleNext,
    q,
    setQ
  } as const;
}
