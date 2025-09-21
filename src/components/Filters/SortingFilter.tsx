import React, { useState, useEffect } from "react";

// Define the types for props
export type SortOption = "lowToHigh" | "highToLow" | undefined;
export type Range = { min: number; max: number };

type Props = {
    sorting: SortOption;
    setSorting: (s: SortOption) => void;
    range: Range;
    setRange: (r: Range) => void;
    bounds?: Range;
};

// Simplified Filter Component with Tailwind CSS
export default function SortingFilter({
    sorting,
    setSorting,
    range,
    setRange,
    bounds = { min: 0, max: 50000 },
}: Props) {
    const [localSorting, setLocalSorting] = useState<SortOption>(sorting);
    const [localMin, setLocalMin] = useState<number>(range.min);
    const [localMax, setLocalMax] = useState<number>(range.max);

    // Sync local state with props when parent's range changes
    useEffect(() => {
        setLocalMin(range.min);
        setLocalMax(range.max);
        setLocalSorting(sorting);
    }, [range.min, range.max, sorting]);

    // Handler for range input changes
    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (e.target.name === "min") {
            setLocalMin(value);
        } else {
            if (value > bounds.max) return;
            setLocalMax(value);
        }
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSorting(e.target.value as SortOption);
    }

    // Handler to apply the filters
    const handleApply = () => {
        // Ensure min is not greater than max before setting the range
        const newMin = Math.min(localMin, localMax);
        const newMax = Math.max(localMin, localMax);
        setRange({ min: newMin, max: newMax });
        setSorting(localSorting);
    };

    // Handler to reset all filters
    const handleReset = () => {
        setSorting(undefined);
        setRange({ min: bounds.min, max: bounds.max });
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg max-w-sm">
            <h3 className="mt-0 text-xl font-semibold mb-4">Filters</h3>

            {/* Sorting with Radio Buttons */}
            <div className="mb-4">
                <h4 className="text-lg font-medium">Sort by Price</h4>
                <label className="block mb-2">
                    <input
                        type="radio"
                        name="sort"
                        value="lowToHigh"
                        checked={localSorting === "lowToHigh"}
                        onChange={handleSortChange}
                        className="mr-2"
                    />
                    Low to High
                </label>
                <label className="block">
                    <input
                        type="radio"
                        name="sort"
                        value="highToLow"
                        checked={localSorting === "highToLow"}
                        onChange={handleSortChange}
                        className="mr-2"
                    />
                    High to Low
                </label>
            </div>

            {/* Price Range Inputs with a single slider */}
            <div className="mb-4">
                <h4 className="text-lg font-medium">Price Range</h4>
                <div className="flex justify-between items-center mb-2">
                    <span>Min : </span> <input className="w-1/4 mr-2" type="number" value={localMin} onChange={handleRangeChange} name="min" />
                    <span>Max :</span> <input className="w-1/4" type="number" value={localMax} onChange={handleRangeChange} name="max" />
                </div>
                <input
                    type="range"
                    name="min"
                    min={bounds.min}
                    max={bounds.max}
                    value={localMin}
                    onChange={handleRangeChange}
                    className="w-full mb-2"
                />
                <input
                    type="range"
                    name="max"
                    min={bounds.min}
                    max={bounds.max}
                    value={localMax}
                    onChange={handleRangeChange}
                    className="w-full"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}