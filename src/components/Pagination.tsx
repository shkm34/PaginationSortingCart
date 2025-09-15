
type Props = {
  page: number;
  totalPages?: number;
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
};

export default function Pagination({ page, totalPages, onPrev, onNext, isNextDisabled }: Props) {
  return (
    <div className="mt-6 flex items-center justify-center space-x-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md transition"
        aria-label="Previous page"
      >
        Prev
      </button>

      <div className="text-sm text-white">
        Page <span className="font-medium">{page}</span>
        {totalPages ? <span className="text-white"> of <span className="font-medium">{totalPages}</span></span> : ""}
      </div>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
