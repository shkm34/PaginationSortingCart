import type { Product } from '../types/types'
import { fetchSortedProducts } from './fetchSortedProducts'
import { dollorToRupee } from '../utils/dollorToRupee'

const BASE = 'https://dummyjson.com'

export type FetchProductsParams = {
    limit?: number
    skip?: number
    query?: string
    category?: string
    sorting?: 'highToLow' | 'lowToHigh'
    range?: { min: number; max: number };
    signal?: AbortSignal;
}
export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
  categories?: string[]
}

export async function fetchProducts(params:FetchProductsParams = {}): Promise<ProductsResponse>{
    const { limit = 12, skip = 0, query, category, sorting, signal, range } = params

    let url : URL
    
    if(query && query.trim().length > 0){
        url = new URL(`${BASE}/products/search`)
        url.searchParams.set("q", query.trim())
    }
    else if(category){
        url = new URL(`${BASE}/products/category/${category}`)
    } else {
          url = new URL(`${BASE}/products`)
    }
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));

    const res = await fetch(url.toString(), { signal });

    if(!res.ok){
        throw new Error("Failed to fetch products")
    }

    let data: { products?: Product[], total?: number, skip?: number, limit?: number} = {}
    console.log("Fetched data:", data);
    
    
    if(sorting || range){
        const sortedData = await fetchSortedProducts({ limit, skip, query, category, sorting, range, signal });
        data = sortedData
    } else {
        data = await res.json()
    }

    const productArr = data.products ?? []
    console.log("Fetched products:", productArr);
    
    const catRes = await fetch(`${BASE}/products/category-list`)
    const categories = await catRes.json()

    return {
        products: productArr,
        total: typeof data.total === 'number'? data.total : (data.products?.length ?? 0),
        skip: typeof data.skip === 'number' ? data.skip : skip,
        limit: typeof data.limit === 'number' ? data.limit : limit,
        categories: Array.isArray(categories) ? categories : []
    }
}