// src/pages/Home.tsx
import ProductList from "../components/ProductList";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import PaginationButton from "../components/PaginationButton";
import LoadingBox from "../components/Boxes/LoadingBox";
import ErrorBox from "../components/Boxes/ErrorBox";
import SearchFilter from "../components/Filters/SearchFilter";

export default function Home() {

  const {
    page, products, total, totalPages, limit, hasNext,
    isLoading, isError, error, isFetching, handlePrev, handleNext } = usePaginatedProducts({ initialPage: 1, limit: 12 });

  if (isLoading) return <LoadingBox message="Loading products…" />;

  if (isError) return <ErrorBox title="Error loading products" message={error?.message} />;

  return (
    <>
      <div className="mb-4">
        Showing <strong>{(page- 1)*limit + 1}</strong> to <strong>{page * limit}</strong>
        {typeof total === "number" ? <> of <strong>{total}</strong></> : null}
        {isFetching && <span className="ml-2 text-xs"> — updating…</span>}
      </div>

      <SearchFilter />

      <ProductList products={products} onAdd={(p) => console.log("Add to cart:", p.id)} />

      <PaginationButton
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        isNextDisabled={!hasNext}
      />
    </>
  );

}

