import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import type { ProductsResponse } from "../api/products";

type UseProductsArgs = { limit?: number; page?: number; q?: string }

export function useProducts({ page = 1, limit = 12, q }: UseProductsArgs) {
    const skip = (page - 1) * limit;

    return useQuery<ProductsResponse, Error>({
        queryKey: ["products", page, limit, q],
        queryFn: ({ signal }) => fetchProducts({ limit, skip, query: q, signal }),
        // keepPreviousData: true,      // keep previous page visible while fetching next
        staleTime: 1000 * 60,       // t minute freshness: reduce unnecessary refetches
        //cacheTime: 1000 * 60 * 5,   // keep cached for t minutes after unmounted
        retry: 1,                   // tune retries for UX
        refetchOnWindowFocus: false
    })
}