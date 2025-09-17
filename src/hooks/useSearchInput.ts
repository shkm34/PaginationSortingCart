import { useState } from "react";

export function useSearchInput(initial = "") {
    const [input, setInput] = useState(initial);

    return { input, setInput };
}