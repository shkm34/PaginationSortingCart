// src/hooks/usePaginatedProducts.ts
import { useState, useMemo, useCallback} from "react";
import { useProducts } from "../hooks/useProducts";

export function usePaginatedProducts({
  initialPage = 1,
  limit = 12,
} = {}) {
  const [page, setPage] = useState<number>(initialPage);

 // reset when filters change

  const { data, isLoading, isError, error, isFetching, refetch } = useProducts(page, limit);

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
  } as const;
}
