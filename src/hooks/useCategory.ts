import { useState } from "react";

export function useCategory() {
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [sorting, setSorting] = useState<'highToLow' | 'lowToHigh' | undefined>(undefined);
    const [range, setRange] = useState<{ min: number; max: number }>({ min: 0, max: 50000 });

    return { category, setCategory, sorting, setSorting, range, setRange };
}