// src/pages/Home.tsx
import React from "react";
import ProductList from "../components/ProductList";
import { sampleProduct } from "../components/sampleData";

// create a small list of sample products for UI testing
const sampleProducts = Array.from({ length: 12 }).map((_, i) => ({
  ...sampleProduct,
  id: i + 1,
  title: `${sampleProduct.title} ${i + 1}`,
}));

export default function Home() {
  return (
    <div className="container py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Shop</h1>
        <div className="text-sm text-gray-600">Cart • Login (placeholder)</div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Filters column (placeholder for now) */}
        <aside className="md:col-span-1">
          <div className="sticky top-6 bg-white p-4 rounded shadow">
            <h2 className="font-medium mb-2">Filters</h2>
            <p className="text-xs text-gray-500">(coming soon)</p>
          </div>
        </aside>

        {/* Main content: product grid + pagination placeholder */}
        <main className="md:col-span-3">
          <ProductList
            products={sampleProducts}
            onAdd={(p) => console.log("Add to cart:", p.id)}
          />

          <div className="mt-6 flex justify-center space-x-2">
            <button className="px-3 py-1 border rounded" aria-label="Previous page">
              Prev
            </button>
            <button className="px-3 py-1 border rounded" aria-label="Next page">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
