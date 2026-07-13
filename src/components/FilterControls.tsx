"use client";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export type StoreCategory = {
    id: string;
    name: string;
    slug: string;
};

type FilterControlsProps = {
    categories: StoreCategory[];
};

const FilterControls = ({
    categories,
}: FilterControlsProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [minPrice, setMinPrice] = useState(
        searchParams.get("min") ?? ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("max") ?? ""
    );

    useEffect(() => {
        setMinPrice(searchParams.get("min") ?? "");
        setMaxPrice(searchParams.get("max") ?? "");
    }, [searchParams]);

    const updateFilters = (
        updates: Record<string, string>
    ) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        Object.entries(updates).forEach(([key, value]) => {
            const cleanedValue = value.trim();

            if (cleanedValue) {
                params.set(key, cleanedValue);
            } else {
                params.delete(key);
            }
        });

        params.delete("page");

        const queryString = params.toString();

        router.replace(
            queryString
                ? `${pathname}?${queryString}`
                : pathname,
            {
                scroll: false,
            }
        );
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        updateFilters({
            [event.target.name]: event.target.value,
        });
    };

    const applyPriceFilter = () => {
        updateFilters({
            min: minPrice,
            max: maxPrice,
        });
    };

    const handlePriceKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            event.currentTarget.blur();
        }
    };

    const clearFilters = () => {
        setMinPrice("");
        setMaxPrice("");

        const params = new URLSearchParams(
            searchParams.toString()
        );

        ["cat", "min", "max", "sort", "page"].forEach(
            (key) => params.delete(key)
        );

        router.replace(pathname, {
            scroll: false,
        });
    };

    const hasActiveFilters =
        searchParams.has("cat") ||
        searchParams.has("min") ||
        searchParams.has("max") ||
        searchParams.has("sort");

    const baseControlClass =
        "h-8 rounded-md border border-white/25 bg-white " +
        "px-2 text-[11px] font-semibold text-black " +
        "shadow-sm outline-none transition-all duration-200 " +
        "hover:border-white hover:shadow-md " +
        "focus:border-white focus:ring-1 focus:ring-white";

    const labelClass =
        "mb-1 block text-[9px] font-bold uppercase " +
        "tracking-[0.12em] text-white/80";

    return (
        <section className="w-full rounded-lg bg-black px-3 py-3 shadow-sm">
            <div className="flex flex-wrap items-end gap-x-2 gap-y-3">
                {/* Category */}
                <div>
                    <label
                        htmlFor="category-filter"
                        className={labelClass}
                    >
                        Category
                    </label>

                    <select
                        id="category-filter"
                        name="cat"
                        value={searchParams.get("cat") ?? ""}
                        onChange={handleSelectChange}
                        className={`${baseControlClass} w-[145px]`}
                    >
                        <option value="">All products</option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.slug}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div>
                    <label
                        htmlFor="sort-filter"
                        className={labelClass}
                    >
                        Sort
                    </label>

                    <select
                        id="sort-filter"
                        name="sort"
                        value={searchParams.get("sort") ?? ""}
                        onChange={handleSelectChange}
                        className={`${baseControlClass} w-[125px]`}
                    >
                        <option value="">Featured</option>
                        <option value="asc price">
                            Price: low to high
                        </option>
                        <option value="desc price">
                            Price: high to low
                        </option>
                        <option value="desc lastUpdated">
                            Newest
                        </option>
                        <option value="asc lastUpdated">
                            Oldest
                        </option>
                    </select>
                </div>

                {/* Minimum price */}
                <div>
                    <label
                        htmlFor="minimum-price"
                        className={labelClass}
                    >
                        Min price
                    </label>

                    <div className="relative">
                        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-gray-500">
                            £
                        </span>

                        <input
                            id="minimum-price"
                            name="min"
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={minPrice}
                            placeholder="0"
                            onChange={(event) =>
                                setMinPrice(event.target.value)
                            }
                            onBlur={applyPriceFilter}
                            onKeyDown={handlePriceKeyDown}
                            className={`${baseControlClass} w-[88px] pl-5`}
                        />
                    </div>
                </div>

                {/* Maximum price */}
                <div>
                    <label
                        htmlFor="maximum-price"
                        className={labelClass}
                    >
                        Max price
                    </label>

                    <div className="relative">
                        <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-gray-500">
                            £
                        </span>

                        <input
                            id="maximum-price"
                            name="max"
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={maxPrice}
                            placeholder="100"
                            onChange={(event) =>
                                setMaxPrice(event.target.value)
                            }
                            onBlur={applyPriceFilter}
                            onKeyDown={handlePriceKeyDown}
                            className={`${baseControlClass} w-[88px] pl-5`}
                        />
                    </div>
                </div>
            </div>

            {hasActiveFilters && (
                <div className="mt-3 flex justify-end">
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-[10px] font-semibold uppercase tracking-wide text-white/70 underline underline-offset-4 transition hover:text-white"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    );
};

export default FilterControls;