import { useState } from "react";
import "./SearchForm.scss";
import { useRouter } from "next/navigation";
import { formatDate } from "app/helpers/FomatDate";
import { useLocale } from "next-intl";
import { z } from "zod";
import { greekCitiesEnum } from "app/constants/cities";

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
  const [filteredFromCities, setFilteredFromCities] = useState<string[]>([]);
  const [filteredToCities, setFilteredToCities] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Generate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: any) => {
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

  const handleFromChange = (e: any) => {
    const value = e.target.value;
    setFrom(value);
    if (value.length >= 2) {
      const filtered = greekCitiesEnum.options.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase()),
      );
      setFilteredFromCities(filtered);
    } else {
      setFilteredFromCities([]);
    }
  };

  const handleToChange = (e: any) => {
    const value = e.target.value;
    setTo(value);
    if (value.length >= 2) {
      const filtered = greekCitiesEnum.options.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase()),
      );
      setFilteredToCities(filtered);
    } else {
      setFilteredToCities([]);
    }
  };

  const selectFromCity = (city: string) => {
    setFrom(city);
    setFilteredFromCities([]);
  };

  const selectToCity = (city: string) => {
    setTo(city);
    setFilteredToCities([]);
  };

  return (
    <div className="ride_search_section">
      <h2>Find your destination</h2>
      <form onSubmit={handleSubmit} className="ride_search_form">
        <div>
          <input
            type="text"
            value={from}
            onChange={handleFromChange}
            placeholder="From"
            required
          />
          {filteredFromCities.length > 0 && (
            <ul className="autocomplete_list">
              {filteredFromCities.map((city) => (
                <li key={city} onClick={() => selectFromCity(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <input
            type="text"
            value={to}
            onChange={handleToChange}
            placeholder="To"
            required
          />
          {filteredToCities.length > 0 && (
            <ul className="autocomplete_list">
              {filteredToCities.map((city) => (
                <li key={city} onClick={() => selectToCity(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

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
