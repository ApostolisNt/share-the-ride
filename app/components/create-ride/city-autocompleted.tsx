"use client";

import React, { useState, useEffect, KeyboardEvent, useRef, FC } from "react";
import { greekCitiesEnum, GreekCitiesKeys } from "app/consts/cities";

export type CityAutocompleteProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
};

const CityAutocomplete: FC<CityAutocompleteProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  className,
}) => {
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const cityList = greekCitiesEnum.options as GreekCitiesKeys[];

  useEffect(() => {
    if (value.length < 2) {
      setFilteredCities([]);
      return;
    }

    const isExactMatch = cityList.some(
      (city) => city.toLowerCase() === value.toLowerCase(),
    );
    if (isExactMatch) {
      setFilteredCities([]);
    } else {
      const filtered = cityList.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase()),
      );
      setFilteredCities(filtered);
    }
    setHighlightedIndex(-1);
  }, [value, cityList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!filteredCities.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCities.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCities.length - 1,
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0) {
        selectCity(filteredCities[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setFilteredCities([]);
    }
  };

  const selectCity = (city: string) => {
    onChange(city);
    setFilteredCities([]);
    setHighlightedIndex(-1);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      setFilteredCities([]);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={
          className
            ? className
            : "input w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        }
      />
      {filteredCities.length > 0 && (
        <ul
          className="shadow absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border border-gray-300 bg-white"
          ref={dropdownRef}
        >
          {filteredCities.map((city, index) => (
            <li
              key={city}
              onMouseDown={() => selectCity(city)}
              className={`cursor-pointer px-3 py-2 hover:bg-blue-100 ${
                index === highlightedIndex ? "bg-gray-200" : ""
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
