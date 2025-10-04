import type { CartState } from "../types/types";

export const CART_STORAGE_KEY = "myapp_cart_v1"

export function loadCart(initial: CartState): CartState {
    const raw = localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) return initial

    try {
        const parsed = JSON.parse(raw)
        return parsed as CartState
    } catch (error) {
        console.warn("Failed to load cart from localStorage, using initial state.", error);
        return initial;
    }
}

export function saveCart(cart: CartState) {
    try{
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
        console.warn("Failed to save cart to localStorage.", error);
    }
}