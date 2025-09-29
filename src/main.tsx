import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import { fetchProductById } from "./api/fetchProductById";
import CartProvider from "./context/CartContext";
import Cart from "./components/Cart.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // keep data fresh-ish but avoid constant refetch on focus
      staleTime: 1000 * 60 * 2, // 2 minutes
      // retry once on failure (you can set to 0 to disable)
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App should render <Outlet />
  },
  {
    path: "product/:id",
    element: <ProductPage />,
    loader: async ({ params }) => {
      return await fetchProductById(Number(params.id));
    },
  },
  {
    path: "/cart",
    element: <Cart/>, 
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
