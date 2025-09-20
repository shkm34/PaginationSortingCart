// src/hooks/usePaginatedProducts.ts
import {useMemo, useCallback} from "react";
import { useProducts } from "../hooks/useProducts";
import { usePaginationWithUrl } from "../hooks/usePaginationWithUrl";
import { useSearchFilterWithUrl } from "./useSearchFilterWithUrl";
import { useCategory } from "./useCategory";
import { useQueryOrCategory } from "./useQueryOrCategory";

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
 const { category, setCategory } = useCategory();
  const params = useQueryOrCategory(q, category);


 
 const { data, isLoading, isError, error, isFetching, refetch } = useProducts({page, limit, ...params});


  const total = data?.total;
  const totalPages = useMemo(
    () => (typeof total === "number" && total > 0 ? Math.ceil(total / limit) : undefined),
    [total, limit]
  );

  const hasNext = typeof total === "number" ? page < (totalPages ?? 0) : true;

  const handlePrev = useCallback(() => setPage((s) => Math.max(1, s - 1)), [setPage]);
  const handleNext = useCallback(() => setPage((s) => s + 1), [setPage]);

  const setQWithReset = useCallback((newQ: string) => {
    setCategory(undefined); // Clear category
    setQ(newQ);
  }, [setQ, setCategory]);


  // this function is helping to reset the query state when category is set, 
  // so search input field will be cleared upon render
  const setCategoryWithReset = useCallback((newCategory: string) => {
    setQ(""); // Clear query
    setCategory(newCategory);
  }, [setQ, setCategory]);


  return {
    page,
    setPage,
    limit,
    data,
    products: data?.products ?? [],
    categories: data?.categories ?? [],
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
    setQ: setQWithReset,
    category,
    setCategory: setCategoryWithReset
  } as const;
}
