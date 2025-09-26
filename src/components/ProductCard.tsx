
import type { Product } from '../types/types'
import { useNavigate} from "react-router-dom";

type props = {
    product: Product
    onAdd?: (product: Product) => void
    loading?: boolean
}

function ProductCard({ product, onAdd, loading }: props) {
    const navigate = useNavigate();

    const handleOpenProductPage = (product: Product) => {
         navigate(`/product/${product.id}`, { state: { product} })
    };

    return (
        <div onClick={() => handleOpenProductPage(product)} className="bg-white text-gray-900 shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden flex flex-col border border-gray-200">
            {/* Image */}
            {product.thumbnail ? (
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            ) : (
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                    No Image
                </div>
            )}

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                    {product.title}
                </h3>
                {product.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {product.description}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 mt-auto flex items-center justify-between border-t border-gray-100 bg-gray-50">
                <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                </span>
                <button
                    onClick={() => onAdd?.(product)}
                    disabled={loading}
                    className="ml-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>

    )
}

export default ProductCard
