// SearchFilter.tsx (replace component body with this)
import { useEffect, useRef } from "react";
import { useSearchInput } from "../hooks/useSearchInput";
import { useDebounce } from "../hooks/useDebounce"; // default import

//SearchFilter now receives q and setQ as props from parent

export function useSyncedSearchFilter(q: string | undefined, setQ: (v: string) => void, debounceMs = 500) {
console.log("useSyncedSearchFilter")
    const { input, setInput } = useSearchInput();
    const debouncedInput = useDebounce(input, debounceMs);

    // keep a ref of the last value we asked setQ to set such that we can avoid redundant calls to setQ
    const lastSetQRef = useRef<string | undefined>(undefined);

    const mountedRef = useRef(false);

    // 1) Seed the input when parent `q` changes (only when q is defined and differs)
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
        //console.log("ho rah hai")
        const normalized = (debouncedInput ?? "").trim();
         //console.log("q", q,"lastSetQRef.current", lastSetQRef.current)
        //if(normalized === undefined) return
        const normalizedOrUndefined = normalized === "" ? undefined : normalized;

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
        setQ(normalizedOrUndefined);
        //console.log("last wala")
    }, [debouncedInput, q, setQ]);

    return { input, setInput };
}