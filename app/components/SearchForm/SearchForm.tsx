import { useState } from "react";
import "./SearchForm.scss";
import { useRouter } from "next/navigation";
import { formatDate } from "app/helpers/FomatDate";

const SearchForm = () => {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  // Generate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formattedDate = formatDate(date);
    router.push(
      `/rides?from=${from.toLowerCase()}&to=${to.toLowerCase()}&date=${formattedDate}`
    );
  };

  return (
    <div className="ride_search_section">
      <h2>Find your destination</h2>
      <form onSubmit={handleSubmit} className="ride_search_form">
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          required
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
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
      </form>
    </div>
  );
};

export default SearchForm;
