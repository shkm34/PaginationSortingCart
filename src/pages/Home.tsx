// src/pages/Home.tsx
import ProductList from "../components/ProductList";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import Pagination from "../components/Pagination";
import LoadingBox from "../components/Boxes/LoadingBox";
import ErrorBox from "../components/Boxes/ErrorBox";

export default function Home() {

  const {
    page, products, total, totalPages, hasNext,
    isLoading, isError, error, isFetching, handlePrev, handleNext } = usePaginatedProducts({ initialPage: 1, limit: 12 });

  if (isLoading) return <LoadingBox message="Loading products…" />;

  if (isError) return <ErrorBox title="Error loading products" message={error?.message} />;

  return (
    <>
      <div className="mb-4">
        Showing <strong>{products.length}</strong>
        {typeof total === "number" ? <> of <strong>{total}</strong></> : null}
        {isFetching && <span className="ml-2 text-xs"> — updating…</span>}
      </div>

      <ProductList products={products} onAdd={(p) => console.log("Add to cart:", p.id)} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        isNextDisabled={!hasNext}
      />
    </>
  );

}

