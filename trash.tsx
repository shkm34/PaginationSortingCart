// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import type { ProductsResponse } from "../api/products";

export function useProducts(page = 1, limit = 12) {
  const skip = (page - 1) * limit;

  // use 3-arg form: useQuery(queryKey, queryFn, options)
  return useQuery<ProductsResponse, Error>(
    ["products", page, limit],
    ({ signal }) => fetchProducts({ limit, skip, signal }), // fetchProducts must accept signal
    {
      keepPreviousData: true,     // good for pagination UX
      staleTime: 1000 * 60,       // 1 minute
      retry: 1,
      refetchOnWindowFocus: false
    }
  );
}
