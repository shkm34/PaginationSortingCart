import type {CartAction, CartState, CartItem } from "../types/types";


export const initialCartState: CartState = {
    items: []
}

export function findItemIndex(items: CartItem[], productId: number) {
    return items.findIndex((item) => item.productId === productId)
}

export default function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD": {
            const { product, quantity = 1 } = action.payload

            // if item alredy exists, update quantity
            const productExist = state.items.some(item => item.productId === product.id)
            if (productExist) {
                const updatedItems = state.items.map(item =>
                    item.productId === product.id ?
                        { ...item, quantity: item.quantity + quantity } : item
                )
                return { ...state, items: updatedItems }
            }

            // if item doesn't exist (new item), add it
            const newItem: CartItem = {
                productId: product.id,
                title: product.title,
                price: product.price,
                quantity,
                thumbnail: product.thumbnail
            }
            return { ...state, items: [...state.items, newItem] }
        }

        case "REMOVE": {
            const { productId } = action.payload
            const updatedItems = state.items.filter(item => item.productId !== productId)
            return { ...state, items: updatedItems }
        }

        case "SET_QTY": {
            const { productId, step } = action.payload

            const updatedItems: CartItem[] = []
            let changed = false

            for (const item of state.items) {

                if (item.productId === productId) {
                    const newQuantity = Math.max(0, item.quantity + step)

                    if (newQuantity > 0) {      // only push those items which have quantity > 0
                        updatedItems.push({ ...item, quantity: newQuantity })
                    }

                    if (newQuantity !== item.quantity) changed = true  // if quantity for any item has cahnged
                }
                else {
                    updatedItems.push(item)    // reuse same object reference of other items
                }
            }
            if (!changed) return state   // if qunatity not changed for any item, return same state refrence

            return { ...state, items: updatedItems }
        }

        case "CLEAR": {
            return { ...state, items: [] }
        }
    }

}