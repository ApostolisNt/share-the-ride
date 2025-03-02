// RideFilters.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FilterRidesType } from "app/types/types";
import FilterForm from "./FilterForm";
import { LucideFilter, X } from "lucide-react";
import { IconKey } from "app/helpers/TravelTypes";
import { cleanUrlSlash } from "utils/general";

const RideFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useParams();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const defaultQuery: FilterRidesType = {
    from: (searchParams.get("from") as FilterRidesType["from"]) || undefined,
    to: (searchParams.get("to") as FilterRidesType["to"]) || undefined,
    date: searchParams.get("date") || undefined,
    priceMin: searchParams.get("priceMin")
      ? Number(searchParams.get("priceMin"))
      : undefined,
    priceMax: searchParams.get("priceMax")
      ? Number(searchParams.get("priceMax"))
      : undefined,
    allowed: undefined,
    petFriendly: undefined,
  };

  const [filters, setFilters] = useState<FilterRidesType>(defaultQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = e.target.value ? Number(e.target.value) : undefined;
    setFilters((prev) => ({
      ...prev,
      priceMin: min,
    }));
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = e.target.value ? Number(e.target.value) : undefined;
    setFilters((prev) => ({
      ...prev,
      priceMax: max,
    }));
  };

  // Toggle allowed icons.
  const handleToggleAllowed = (icon: IconKey) => {
    setFilters((prev) => ({
      ...prev,
      allowed: prev.allowed
        ? prev.allowed.includes(icon)
          ? prev.allowed.filter((i) => i !== icon)
          : [...prev.allowed, icon]
        : [icon],
    }));
  };

  // Toggle pet-friendly value.
  const handleTogglePetFriendly = () => {
    setFilters((prev) => ({ ...prev, petFriendly: !prev.petFriendly }));
  };

  const clearFilters = () => {
    setFilters(defaultQuery);
    router.push(cleanUrlSlash(`${lang}/rides`));
  };

  // Build query string and navigate.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryObject: Record<string, string> = {};
    if (filters.from) queryObject.from = filters.from;
    if (filters.to) queryObject.to = filters.to;
    if (filters.date) queryObject.date = filters.date;
    if (filters.priceMin !== undefined)
      queryObject.priceMin = filters.priceMin.toString();
    if (filters.priceMax !== undefined)
      queryObject.priceMax = filters.priceMax.toString();
    if (filters.allowed && filters.allowed.length > 0)
      queryObject.allowed = filters.allowed.join(",");
    if (filters.petFriendly !== undefined)
      queryObject.petFriendly = filters.petFriendly ? "true" : "false";
    const query = new URLSearchParams(queryObject).toString();
    router.push(`?${query}`);
  };

  return (
    <div>
      {/* Desktop */}
      <div className="sxl:block hidden">
        <div className="rounded-lg border bg-gray-50 p-4 shadow-card">
          <FilterForm
            filters={filters}
            onInputChange={handleInputChange}
            onPriceMinChange={handlePriceMinChange}
            onPriceMaxChange={handlePriceMaxChange}
            onToggleAllowed={handleToggleAllowed}
            onTogglePetFriendly={handleTogglePetFriendly}
            onSubmit={handleSubmit}
            clearFilters={clearFilters}
          />
        </div>
      </div>
      {/* Mobile */}
      <div className="sxl:hidden">
        <button
          onClick={() => setIsPopoverOpen(true)}
          className="fixed bottom-8 right-4 z-[99999] mb-4 animate-pulse rounded-full border border-yellow-500 bg-yellow-200 p-2 text-white"
        >
          <LucideFilter size={24} className="text-yellow-500" />
        </button>
        {isPopoverOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
          >
            <div className="shadow-lg mx-4 w-full max-w-md rounded-lg bg-white p-4">
              <div className="mb-4 flex justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsPopoverOpen(false)}
                  className="text-red-500"
                >
                  <X size={24} color="red" />
                </button>
              </div>
              <FilterForm
                filters={filters}
                onInputChange={handleInputChange}
                onPriceMinChange={handlePriceMinChange}
                onPriceMaxChange={handlePriceMaxChange}
                onToggleAllowed={handleToggleAllowed}
                onTogglePetFriendly={handleTogglePetFriendly}
                onSubmit={handleSubmit}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideFilters;
