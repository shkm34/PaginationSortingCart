// src/pages/Home.tsx
import ProductList from "../components/ProductList";
import { usePaginatedProducts } from "../hooks/usePaginatedProducts";
import PaginationButton from "../components/PaginationButton";
import LoadingBox from "../components/Boxes/LoadingBox";
import ErrorBox from "../components/Boxes/ErrorBox";
import SearchFilter from "../components/Filters/SearchFilter";
import CategoryList from "../components/CategoryList";
import SortingFilter from "../components/Filters/SortingFilter";

export default function Home() {

  const {
    page, products, categories, total, totalPages, limit, hasNext,
    isLoading, isError, error, isFetching, handlePrev, handleNext,
    q, setQ, category, setCategory, sorting, setSorting, range, setRange
  } = usePaginatedProducts({ initialPage: 1, limit: 12 });
  console.log("Home render:", { category });

  if (isLoading) return <LoadingBox message="Loading products…" />;

  if (isError) return <ErrorBox title="Error loading products" message={error?.message} />;

  return (
    <>
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="w-1/4 bg-white p-4 rounded-2xl shadow-md">
          <div className="mb-4">
            <SearchFilter q={q} setQ={setQ} />
            <SortingFilter
              sorting={sorting}
              setSorting={setSorting}
              range={range}
              setRange={setRange}
            />
          </div>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            <CategoryList categories={categories} category={category} setCategory={setCategory} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Showing <strong>{(page - 1) * limit + 1}</strong> to <strong>{page * limit}</strong>
            {typeof total === "number" ? <> of <strong>{total}</strong></> : null}
            {isFetching && <span className="ml-2 text-xs text-blue-500"> — updating…</span>}
          </div>

          <ProductList
            products={products}
            onAdd={(p) => console.log("Add to cart:", p.id)}
          />

          <div className="mt-6 flex justify-center">
            <PaginationButton
              page={page}
              totalPages={totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
              isNextDisabled={!hasNext}
            />
          </div>
        </div>
      </div>

    </>

  );

}

