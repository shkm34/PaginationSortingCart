import { useSyncedSearchFilter } from "../../hooks/useSyncedSearchFilter"; // default import

//SearchFilter now receives q and setQ as props from parent

function SearchFilter({ q, setQ }: { q?: string; setQ: (v?: string) => void }) {

    const { input, setInput } = useSyncedSearchFilter(q, setQ, 400);

    return (
        <div style={{ width: "25vw" }} className="bg-white p-4 rounded-2xl">
            <label htmlFor="search" className="block text-sm font-semibold text-black mb-2">
            Search products
            </label>

            <div className="relative">
            
            <input
                id="search"
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search by title or description..."
                autoComplete="off"
                aria-label="Search products"
                className={`w-full pl-5 pr-5 py-3 bg-white text-black placeholder-gray-500 rounded-xl border border-gray-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            </div>

            <p className="mt-3 text-xs text-gray-500">Typing is debounced (400ms) to avoid extra requests.</p>
        </div>
    );
}

export default SearchFilter;