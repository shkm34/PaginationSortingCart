// src/context/CartContext.tsx
import { createContext, use, useMemo, useReducer, useCallback, type ReactNode } from "react";
import cartReducer, { initialCartState } from "../reducers/cartReducer";
import type { CartState, CartAction, Product, CartItem } from "../types";

type CartContextValue = {
  state: CartState;
  // helpers
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  // derived selectors
  totalItems: number;
  subtotal: number;
};

// keep the undefined default so consumers fail fast when used outside provider
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // action helpers - stable references with useCallback
  const addToCart = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD", payload: { product, quantity } });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: "REMOVE", payload: { productId } });
  }, []);

  const setQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "SET_QTY", payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  // derived values: memoized
  const { totalItems, subtotal } = useMemo(() => {
    return state.items.reduce(
      (acc, it) => {
        acc.totalItems += it.quantity;
        acc.subtotal += it.quantity * it.price;
        return acc;
      },
      { totalItems: 0, subtotal: 0 }
    );
  }, [state.items]);

  // memoize value object so provider doesn't cause unnecessary re-renders
  const value = useMemo<CartContextValue>(
    () => ({
      state,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    // note: state is included because consumers may need any part of it;
    // if you only expose derived values and stable helpers, you can narrow deps further.
    [state, addToCart, removeFromCart, setQuantity, clearCart, totalItems, subtotal]
  );

  // React 19: render the context object directly as a provider
  return <CartContext value={value}>{children}</CartContext>;
}

// hook for components (React 19: use() can read context)
export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
