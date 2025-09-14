import React from 'react'
import ProductCard from './ProductCard'
import type { Product } from '../types/types'

type props = {
    products: Product[],
    onAdd?: (product: Product) => void
    loading?: boolean
}

function ProductList({ products, onAdd, loading }: props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={onAdd}
                    loading={loading}
                />
            ))}

        </div>
    )
}

export default ProductList
