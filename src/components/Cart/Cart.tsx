import { useCart } from "../../context/CartContext";

function Cart() {
  const {
    state,
    removeFromCart,
    setQuantity,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();
  console.log("cart hai");

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-20">
          {/* Left: Scrollable list */}
          <div className="bg-gray-50 rounded-2xl p-4 h-[95vh] overflow-y-auto">
            <div className="space-y-4">
              {state.items.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  Your cart is empty.
                </div>
              ) : (
                state.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title || "Product image"}
                      className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-lg flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>

                      <div className="mt-2 text-xs md:text-sm flex flex-col gap-1 text-gray-500">
                        <div>
                          Quantity:{" "}
                          <span className="font-semibold text-gray-700">
                            {item.quantity}
                          </span>
                        </div>

                        <div>
                          Price:{" "}
                          <span className="font-semibold text-gray-900">
                            ${((item.price ?? 0) * item.quantity).toFixed(2)}
                          </span>
                          <span className="ml-2 text-gray-400">
                            ({`$${(item.price ?? 0).toFixed(2)} each`})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
                        <button
                          onClick={() => setQuantity(item.productId, -1)}
                          className="inline-flex items-center justify-center w-8 h-8 text-sm rounded-md hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>

                        <div className="px-3 py-1 text-sm font-medium">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => setQuantity(item.productId, 1)}
                          className="inline-flex items-center justify-center w-8 h-8 text-sm rounded-md hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-sm px-3 py-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-200"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <aside className="sticky top-6 self-start">
            <div className="bg-white rounded-2xl shadow p-5 w-full">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Subtotal</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-gray-600">Total items</p>
                <p className="text-sm font-medium text-gray-900">
                  {totalItems}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <button
                  onClick={() => {
                    /* placeholder for checkout if needed */
                  }}
                  className="w-full px-4 py-3 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300"
                >
                  Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full px-4 py-3 text-sm font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-200"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-4 text-xs text-black">
                Prices include taxes where applicable.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Cart;
