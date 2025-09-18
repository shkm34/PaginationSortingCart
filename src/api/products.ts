import type { Product } from '../types/types'

const BASE = 'https://dummyjson.com'

export type FetchProductsParams = {
    limit?: number
    skip?: number
    query?: string
    category?: string
    signal?: AbortSignal;
}
export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function fetchProducts(params:FetchProductsParams = {}): Promise<ProductsResponse>{
    const { limit = 12, skip = 0, query, category, signal } = params

    let url : URL
    if(query && query.trim().length > 0){
        url = new URL(`${BASE}/products/search`)
        url.searchParams.set("q", query.trim())
    }
    else if(category){
        url = new URL(`${BASE}/products`)
        url.searchParams.set("category", category)
    } else {
          url = new URL(`${BASE}/products`)
    }
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));

    const res = await fetch(url.toString(), { signal })

    if(!res.ok){
        throw new Error("Failed to fetch products")
    }

    const data = await res.json()

    return {
        products: data.products ?? [],
        total: typeof data.total === 'number'? data.total : (data.products?.length ?? 0),
        skip: typeof data.skip === 'number' ? data.skip : skip,
        limit: typeof data.limit === 'number' ? data.limit : limit
    }
}