import { useState } from "react";

export function useCategory() {
    const [category, setCategory] = useState<string | undefined>(undefined);
    console.log("Category selected:", category);

    return { category, setCategory };
}