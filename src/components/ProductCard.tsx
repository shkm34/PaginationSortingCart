
import type { Product } from '../types/types'
import { useNavigate } from "react-router-dom";
import AddButtonOrQuantity from "./Buttons/AddButtonOrQuantity";

type props = {
    product: Product
}

function ProductCard({ product}: props) {
    const navigate = useNavigate();


    const handleOpenProductPage = (product: Product) => {
        navigate(`/product/${product.id}`, { state: { product } })
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
            <div className="px-2 py-3 mt-auto flex items-center justify-around gap-2 border-t border-gray-100 bg-gray-50">
                <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                </span>
                <AddButtonOrQuantity product={product} />
            </div>
        </div>

    )
}

export default ProductCard
