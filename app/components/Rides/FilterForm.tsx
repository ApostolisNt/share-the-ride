// FilterForm.tsx
"use client";

import React from "react";
import Image from "next/image";
import { FilterRidesType } from "app/types/types";
import { allIcons, IconKey } from "app/helpers/TravelTypes";
import { PawPrint, RefreshCw } from "lucide-react";

export type FilterFormProps = {
  filters: FilterRidesType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleAllowed: (icon: IconKey) => void;
  onTogglePetFriendly: () => void;
  onSubmit: (e: React.FormEvent) => void;
  clearFilters: () => void;
};

const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onInputChange,
  onPriceMinChange,
  onPriceMaxChange,
  onToggleAllowed,
  onTogglePetFriendly,
  onSubmit,
  clearFilters,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Basic inputs */}
      <div className="flex flex-wrap gap-2">
        <input
          name="from"
          value={filters.from || ""}
          onChange={onInputChange}
          placeholder="From"
          className="flex-1 border p-2"
        />
        <input
          name="to"
          value={filters.to || ""}
          onChange={onInputChange}
          placeholder="To"
          className="flex-1 border p-2"
        />
        <input
          name="date"
          value={filters.date || ""}
          onChange={onInputChange}
          placeholder="Date"
          type="date"
          className="flex-1 border p-2"
        />
      </div>
      {/* Price range */}
      <div className="flex flex-wrap gap-2">
        <input
          name="priceMin"
          value={filters.priceMin !== undefined ? filters.priceMin : ""}
          onChange={onPriceMinChange}
          placeholder="Min Price"
          type="number"
          className="flex-1 border p-2"
        />
        <input
          name="priceMax"
          value={filters.priceMax !== undefined ? filters.priceMax : ""}
          onChange={onPriceMaxChange}
          placeholder="Max Price"
          type="number"
          className="flex-1 border p-2"
        />
      </div>
      {/* Allowed preferences */}
      <div>
        <h3 className="mb-2 text-lg font-medium">Allowed Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(allIcons).map((key) => {
            const icon = key as IconKey;
            const selected = filters.allowed?.includes(icon);
            return (
              <div
                key={icon}
                onClick={() => onToggleAllowed(icon)}
                className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 ${
                  selected ? "border-green-500 bg-green-200" : "border-gray-300"
                }`}
              >
                <Image
                  src={allIcons[icon].img}
                  alt={allIcons[icon].alt}
                  width={40}
                  height={40}
                  className="w-8 object-contain"
                />
                <span className="mt-1 text-sm capitalize text-black">
                  {icon}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Pet-friendly toggle as an icon checkbox */}
      <div>
        <h3 className="mb-2 text-lg font-medium">Pet Friendly</h3>
        <div
          onClick={onTogglePetFriendly}
          className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-2 ${
            filters.petFriendly
              ? "border-green-500 bg-green-200"
              : "border-red-500 bg-red-200"
          }`}
        >
          <PawPrint size={30} className="text-gray-600" />
          <span className="text-sm capitalize text-black">
            {filters.petFriendly ? "Yes" : "No"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="rounded-md border border-red-500 bg-red-200 px-4 py-2 text-white"
        >
          <RefreshCw size={16} color="red" />
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
