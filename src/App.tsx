import { Routes, Route, useLocation, useParams, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home'
import ProductPage from './components/ProductPage'
import type { Product } from './types/types';
import type { ProductDetailed } from "./types/productTypeDetailed";
import { fetchProductById } from "./api/fetchProductById";

function App() {


  return (
      <div className="min-h-screen bg-black text-white">
        <Home></Home>
      </div>
  );
}

export default App