export type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail?: string;
    rating?: number;
    category?: string;
    description?: string;
}

export type CartItem = {
    productId: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
};

export type CartState = {
    items: CartItem[];
}

export type CartAction =
    | { type: "ADD"; payload: { product: Product; quantity?: number } }
    | { type: "REMOVE"; payload: { productId: number } }
    | { type: "SET_QTY"; payload: { productId: number; step: 1 | -1 } }
    | { type: "CLEAR" }