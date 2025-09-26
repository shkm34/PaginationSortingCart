import type { ProductDetailed } from "../types/productTypeDetailed";

export async function fetchProductById(id: number): Promise<ProductDetailed | null> {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
            return null
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching product:", error);
        return null
    }
}
