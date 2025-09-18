// SearchFilter.tsx (replace component body with this)
import React, { useEffect, useRef } from "react";
import { useSearchInput } from "../../hooks/useSearchInput";
import{ useDebounce} from "../../hooks/useDebounce"; // default import
// NOTE: SearchFilter now receives q and setQ as props from parent
function SearchFilter({ q, setQ }: { q?: string; setQ: (v?: string) => void }) {
  const { input, setInput } = useSearchInput();
  const debouncedInput = useDebounce(input, 500);

  // keep a ref of the last value we asked setQ to set
  const lastSetQRef = useRef<string | undefined>(undefined);

  const mountedRef = useRef(false);

  // 1) Seed the input when parent `q` changes (only when q is defined and differs)
// Replace previous seeding effect with this:
useEffect(() => {
  // Seed only once on mount (if there's an initial q in URL/state)
  if (!mountedRef.current) {
    mountedRef.current = true;
    if (typeof q !== "undefined" && q !== "") {
      setInput(q);
    }
  }
}, [q, setInput]);

// 2) Only call setQ when the debounced value actually differs from current canonical q.
useEffect(() => {
  const normalized = (debouncedInput ?? "").trim();
  const normalizedOrUndefined = normalized === "" ? undefined : normalized;

  console.log("[SearchFilter] effect -> debouncedInput:", JSON.stringify(debouncedInput));
  console.log("[SearchFilter] effect -> normalized:", normalizedOrUndefined, "prop q:", q);

  // If it's identical to current canonical q, don't call setQ (avoid redundant updates)
  if (normalizedOrUndefined === q) {
    // update lastSetQRef to reflect that we are in-sync
    lastSetQRef.current = normalizedOrUndefined;
    return;
  }

  // Optional safety: if we recently called setQ with this value, skip
  if (lastSetQRef.current === normalizedOrUndefined) return;

  // call setQ and remember that we called it
  lastSetQRef.current = normalizedOrUndefined;
  console.log("[SearchFilter] calling setQ with:", normalizedOrUndefined);
  setQ(normalizedOrUndefined);
}, [debouncedInput, q, setQ]);

return (
  <div>
    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
      Search products
    </label>

    <input
      id="search"
      type="search"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search by title or description..."
      className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      autoComplete="off"
    />
    <p className="mt-2 text-xs text-gray-500">Typing is debounced (400ms) to avoid extra requests.</p>
  </div>
);
}

export default SearchFilter;