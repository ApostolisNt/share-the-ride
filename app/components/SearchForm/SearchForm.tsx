"use client";
import { useState, FormEvent } from "react";
import "./SearchForm.scss";
import { useRouter } from "next/navigation";
import { formatDate } from "app/helpers/FormatDate";
import { useLocale } from "next-intl";
import { z } from "zod";

// Components
import AutocompleteInput from "app/components/AutoCompleteInput/AutoCompleteInput";

// Enums and data
import { greekCitiesEnum } from "app/consts/cities";

const searchFormSchema = z.object({
  from: greekCitiesEnum,
  to: greekCitiesEnum,
  date: z.string().nonempty("Date is required"),
});

const SearchForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  // Generate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  /**
   * Handle form submission + validation
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedDate = formatDate(date);

    const validationResult = searchFormSchema.safeParse({
      from,
      to,
      date: formattedDate,
    });

    if (!validationResult.success) {
      setError("Please select valid cities and fill out all fields correctly.");
      return;
    }

    setError("");
    router.push(
      `${locale}/rides?from=${from.toLowerCase()}&to=${to.toLowerCase()}&date=${formattedDate}`,
    );
  };

  return (
    <div className="ride_search_section">
      <h2>Find your destination</h2>

      <form
        onSubmit={handleSubmit}
        className="ride_search_form"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <AutocompleteInput
          label="From"
          placeholder="From"
          value={from}
          onChange={setFrom}
          cityList={greekCitiesEnum.options}
          required
        />

        <AutocompleteInput
          label="To"
          placeholder="To"
          value={to}
          onChange={setTo}
          cityList={greekCitiesEnum.options}
          required
        />

        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Search</button>

        {error && (
          <p className="error_message text-center text-red-600">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
