import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { CartState, CartAction, Product, CartItem } from "../types/types";
import cartReducer, { initialCartState } from "../reducers/cartReducer";

export type CartContextValue = {
    state: CartState
    //helpers
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: number) => void
    setQuantity: (productId: number, step: 1 | -1) => void
    clearCart: () => void
    // derived values: memoized
    totalItems: number
    subtotal: number
}
export const CartContext = createContext<CartContextValue | undefined>(undefined);

export default function CartProvider({children}: { children: ReactNode }) {
   const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

    // helper functions
    const addToCart = useCallback((product: Product, quantity = 1) => {
        dispatch({ type: "ADD", payload: { product, quantity } });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        dispatch({ type: "REMOVE", payload: { productId } });
    }, []);

    const setQuantity = useCallback((productId: number, step: 1 | -1) => {
        dispatch({ type: "SET_QTY", payload: { productId, step } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR" });
    }, []);

    // derived functions
    const { totalItems, subtotal } = useMemo(() => {
        const totals = state.items.reduce(
            (acc, item) => {
                acc.totalItems += item.quantity;
                acc.subtotal += item.price * item.quantity;
                return acc;
            },
            { totalItems: 0, subtotal: 0 }
        );
        return totals;
    }, [state.items]);

    console.log(state);

    const value = useMemo<CartContextValue>(() => ({
        state, addToCart, removeFromCart, setQuantity,
        clearCart, totalItems, subtotal
    })
        , [state, addToCart, removeFromCart, setQuantity, clearCart, totalItems, subtotal]);

    return <CartContext value={value}>{children}</CartContext>;
}

export function useCart (){
    const ctx = useContext(CartContext)
    if(!ctx){
        throw new Error("useCart must be used within a CartProvider");
    }
    return ctx
}