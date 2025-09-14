import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(
  {
  defaultOptions: {
    queries: {
      // keep data fresh-ish but avoid constant refetch on focus
      staleTime: 1000 * 60 * 2, // 2 minutes
      // retry once on failure (you can set to 0 to disable)
      retry: 1,
    },
  },
}
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
