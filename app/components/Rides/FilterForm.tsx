"use client";

import React from "react";
import Image from "next/image";
import { FilterRidesType } from "app/types/types";
import { allIcons, IconKey } from "app/helpers/TravelTypes";
import { PawPrint, RefreshCw } from "lucide-react";
import CityAutocomplete from "@components/CreateRide/CityAutocomplete";
import { petFriendlyStyle } from "app/consts/general";

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

const FilterForm = ({
  filters,
  onInputChange,
  onPriceMinChange,
  onPriceMaxChange,
  onToggleAllowed,
  onTogglePetFriendly,
  onSubmit,
  clearFilters,
}: FilterFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div className="flex gap-2">
        <CityAutocomplete
          className="w-full flex-1 border p-2"
          placeholder="From"
          value={filters.from || ""}
          onChange={(val: string) =>
            onInputChange({
              target: { name: "from", value: val },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <CityAutocomplete
          className="w-full flex-1 border p-2"
          placeholder="To"
          value={filters.to || ""}
          onChange={(val: string) =>
            onInputChange({
              target: { name: "to", value: val },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </div>
      <div>
        <input
          name="date"
          value={filters.date || ""}
          onChange={onInputChange}
          placeholder="Date"
          type="date"
          className="w-full rounded-md border p-2"
        />
          
      </div>
      <div className="flex gap-2">
        <input
          name="priceMin"
          value={filters.priceMin !== undefined ? filters.priceMin : ""}
          onChange={onPriceMinChange}
          placeholder="Min Price"
          type="number"
          className="w-full flex-1 rounded-md border p-2"
        />
        <input
          name="priceMax"
          value={filters.priceMax !== undefined ? filters.priceMax : ""}
          onChange={onPriceMaxChange}
          placeholder="Max Price"
          type="number"
          className="w-full flex-1 rounded-md border p-2"
        />
      </div>
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
                  className="w-6 object-contain"
                />
                <span className="mt-1 text-sm capitalize text-black">
                  {icon}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-medium">Pet Friendly</h3>
        <div
          onClick={onTogglePetFriendly}
          className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg border-2 p-2 ${petFriendlyStyle(filters.petFriendly)}`}
        >
          <PawPrint size={30} className="text-gray-600" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">
          Apply Filters
        </button>
        <button
          type="button"
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
