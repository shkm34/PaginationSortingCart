import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function MinimalNavbar() {
  
  const navigate = useNavigate();
  const onCartClick = () => navigate("/cart");
  const onHomeClick = () => navigate("/");

  const {totalItems} = useCart();

  return (
    <nav className="bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
            <button onClick={onHomeClick} className="text-2xl font-bold hover:bg-gray-100">Home</button>
        </div>

        {/* Right: Cart */}
        <div>
          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative inline-flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* cart SVG */}
            <span className="text-4xl" > 🛒</span>
           
            {/* Count badge */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-red-600 text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
