import type { Product } from "../types/types";

export function dollorToRupee(dollor): Product[] {
    console.log("Converting prices to INR", Math.round(productArr[0].price * 88));
    return productArr.map((product: Product) => {
        product.price = Math.round(product.price * 88);
        return product;
    });
}