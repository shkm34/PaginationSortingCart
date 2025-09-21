import type { Product } from "../types/types";
import type { FetchProductsParams  } from "./products";


const BASE = 'https://dummyjson.com'

export async function fetchSortedProducts(params:FetchProductsParams = {}) {
     const { limit = 12, skip = 0, query, category, sorting, range, signal } = params

    let url : URL
    
    if(query && query.trim().length > 0){
        url = new URL(`${BASE}/products/search`)
        url.searchParams.set("q", query.trim())
    }
    else if(category){
        url = new URL(`${BASE}/products/category/${category}`)
    } else {
          url = new URL(`${BASE}/products?limit=194`)
    }

    console.log("horahhai", url.toString());

    const res = await fetch(url.toString(), { signal });

    if(!res.ok){
        throw new Error("Failed to fetch products")
    }

    //const resAllProducts = await fetch('https://dummyjson.com/products?limit=194')
    const data = await res.json()
    let productArr = data.products ?? []
 
    switch(sorting){
                case 'highToLow':
                    productArr.sort((a: Product, b: Product) => b.price - a.price)
                    break
                case 'lowToHigh':
                    productArr.sort((a: Product, b: Product) => a.price - b.price)
                    break    
            }

    if(range){
        const { min, max } = range;
        productArr = productArr.filter((product : Product)=>{
            return product.price >= min && product.price <= max
        })
    }        

    data.products = productArr.slice(skip, skip + limit)
    data.skip = skip
    data.limit = limit
    data.total = productArr.length        

    return data
}