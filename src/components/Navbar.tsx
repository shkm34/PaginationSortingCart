import { useNavigate } from "react-router-dom";

export default function MinimalNavbar({
  logo = "Shop",
  cartCount = 0,
}) {

    const navigate = useNavigate();
    const onCartClick = () => navigate("/cart");    

  return (
    <nav className="bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="inline-flex items-center text-lg font-bold tracking-tight">
            {/* Replace with an <img> if you have a logo file */}
            <span className="sr-only">Home</span>
            <span>{logo}</span>
          </a>
        </div>

        {/* Right: Cart */}
        <div>
          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative inline-flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* Simple cart SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7m13-7l2 7m-6-7v7" />
            </svg>

            {/* Count badge */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-red-600 text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
