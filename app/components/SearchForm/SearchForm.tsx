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
    router.push(`/rides?from=${from}&to=${to}&date=${formattedDate}`);
  };

  return (
    <div className="flex-1 flex flex-col gap-8 justify-center items-center relative">
      <h2 className="text-lg uppercase text-white">Find your destination</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          className="border-b-2 border-slate-500 p-2"
          required
        />
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          className="border-b-2 border-slate-500 p-2"
          required
        />
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          className="border-b-2 border-slate-500 p-2"
          required
        />

        <button
          type="submit"
          className="bg-slate-500 text-white p-2 rounded-sm hover:bg-slate-600 transition-all duration-300 ease-in-out"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
