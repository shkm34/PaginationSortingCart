
import ProductCard from './components/ProductCard'
import Home from './pages/Home'


function App() {


  return (
    <>
      <div className="min-h-screen flex flex-col justify-center bg-black text-white">
        <main className="p-6 text-center">
          <h1 className="text-2xl font-semibold">My Shop — Micro e-commerce</h1>
          <p className="mt-2 text-sm text-gray-600">Scaffold ready. Next: add Tailwind & React Query (0.2).</p>
        </main>

    <ProductCard
      product={{
        id: 1,
        title: "Sample Sneakers",
        price: 59.99,
        thumbnail: "https://www.darveys.com/blog/wp-content/uploads/2024/08/The-25-Most-Expensive-Sneakers-in-the-World.jpg",
        rating: 4.2,
        category: "shoes",
        description: "Comfortable everyday sneakers. Lightweight and breathable.",
      }}
    />
    <Home />
  </div>
  <div className='h-16 min-h-screen flex items-center justify-center text-sm text-gray-500'>

  </div>



    </>
  )
}

export default App
