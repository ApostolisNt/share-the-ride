"use client";
import { GreekCitiesKeys } from "app/consts/cities";
import React, { useState, KeyboardEvent, useEffect, useRef } from "react";

interface AutocompleteInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  cityList: GreekCitiesKeys[];
  required?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  cityList,
  required = false,
}) => {
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

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

  /**
   * Handle direct typing in the text input
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  /**
   * Keyboard navigation for the suggestions
   */
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

  /**
   * Close the suggestions if focus leaves the input + dropdown
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      setFilteredCities([]);
    }
  };

  return (
    <div className="autocomplete_wrapper">
      {label && (
        <label className="text-base font-semibold text-white">{label}</label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />

      {filteredCities.length > 0 && (
        <ul className="autocomplete_list" ref={dropdownRef}>
          {filteredCities.map((city, index) => (
            <li
              key={city}
              onMouseDown={() => selectCity(city)}
              className={index === highlightedIndex ? "bg-gray-200" : ""}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
