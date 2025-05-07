"use client";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SearchParamsType } from "app/types/types";
import CityAutocomplete from "@components/create-ride/city-autocompleted";
import { cleanUrlSlash } from "utils/general";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale } = useParams();

  const defaultQuery: SearchParamsType = {
    from: (searchParams.get("from") as SearchParamsType["from"]) || undefined,
    to: (searchParams.get("to") as SearchParamsType["to"]) || undefined,
    date: searchParams.get("date") || undefined,
  };

  const [filters, setFilters] = useState<SearchParamsType>(defaultQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryObject: Record<string, string> = {};
    if (filters.from) queryObject.from = filters.from;
    if (filters.to) queryObject.to = filters.to;
    if (filters.date) queryObject.date = filters.date;

    const query = new URLSearchParams(queryObject).toString();
    router.push(cleanUrlSlash(`/${locale}/rides?${query}`));
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div className="mb-4 flex flex-col gap-3">
        <CityAutocomplete
          className="w-full flex-1 rounded-sm border bg-transparent p-2 text-white"
          placeholder="From"
          value={filters.from || ""}
          onChange={(val: string) =>
            handleInputChange({
              target: { name: "from", value: val },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          required
        />
        <CityAutocomplete
          className="w-full flex-1 rounded-sm border bg-transparent p-2 text-white"
          placeholder="To"
          value={filters.to || ""}
          onChange={(val: string) =>
            handleInputChange({
              target: { name: "to", value: val },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          required
        />
        <div>
          <input
            name="date"
            value={filters.date || ""}
            onChange={handleInputChange}
            placeholder="Date"
            type="date"
            className="w-full rounded-sm border bg-transparent p-2 text-white"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded border border-white p-2 text-white"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
