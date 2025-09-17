import { useSearchInput } from "../../hooks/useSearchInput"
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchFilterWithUrl } from "../../hooks/useSearchFilterWithUrl";
import { useEffect } from "react";

function SearchFilter() {
    const { input, setInput } = useSearchInput();
    const debouncedInput = useDebounce(input, 400);
    const { q, setQ } = useSearchFilterWithUrl();

   // useEffect(() =>{
     //   if(q !== undefined && q !== input) setInput(q)
    //}, [q, input, setInput])

    useEffect(() =>{
        const val = debouncedInput.trim()
        setQ(val === "" ? undefined : val)
    }, [debouncedInput, setQ])

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
  )
}

export default SearchFilter
