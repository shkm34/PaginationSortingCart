import { useCart } from "../../context/CartContext";
import type { ProductDetailed } from "../../types/productTypeDetailed";

function AddButtonOrQuantity({product}: {product: ProductDetailed}) {

    const { addToCart, setQuantity, state } = useCart();

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const onIncrease = (e) => {
    e.stopPropagation();
    setQuantity(product.id, 1);
  };

  const onDecrease = (e) => {
    e.stopPropagation();
    setQuantity(product.id, -1);
  };

   const thisProductQuantity =
    state.items.find((item) => item.productId === product.id)?.quantity ?? 0;
  return (
    <>
    {thisProductQuantity === 0 ? (
              <button
                onClick={(e) => handleAdd(e)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                aria-label="Add to cart"
              >
                Add to cart
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => onDecrease(e)}
                  className="w-9 h-9 flex items-center justify-center text-sm font-medium rounded-md border border-red-600 bg-white hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <div className="min-w-[48px] text-center px-3 py-1 rounded-md bg-gray-50 border border-yellow-400 font-medium">
                  {thisProductQuantity}
                </div>

                <button
                  onClick={(e) => onIncrease(e)}
                  className="w-9 h-9 flex items-center justify-center text-sm font-medium rounded-md border border-red-600 bg-white hover:bg-blue-200 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            )}
      
    </>
  )
}

export default AddButtonOrQuantity
