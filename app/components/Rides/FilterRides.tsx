import { useState, useEffect } from "react";
import { Ride } from "./Rides";

type FilterRidesProps = {
  rides: Ride[];
  setFilteredRides: (rides: Ride[]) => void;
};

const FilterRides = ({ rides, setFilteredRides }: FilterRidesProps) => {
  const [filter, setFilter] = useState("all");
  const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const sortedRides = rides.slice().sort((a: Ride, b: Ride) => {
      const isAExpired = a.date < currentDate;
      const isBExpired = b.date < currentDate;

      if (isAExpired && !isBExpired) return 1;
      if (!isAExpired && isBExpired) return -1;
      return 0;
    });

    const filteredAndSortedRides = sortedRides.filter((ride: Ride) => {
      if (filter === "nonExpired") return ride.date >= currentDate;
      if (filter === "expired") return ride.date < currentDate;
      return true;
    });

    setFilteredRides(filteredAndSortedRides);
  }, [filter, rides, setFilteredRides, currentDate]);

  const activeButtonClass = "bg-blue-600 text-white";
  const inactiveButtonClass = "bg-white text-blue-600";
  const buttonHoverClass =
    "transition-colors duration-200 hover:bg-blue-700 hover:text-white";

  return (
    <div className="mb-6 flex justify-center space-x-4">
      <button
        onClick={() => setFilter("all")}
        className={`rounded-md border-2 px-4 py-2 ${
          filter === "all" ? activeButtonClass : inactiveButtonClass
        } ${buttonHoverClass}`}
      >
        All Rides
      </button>
      <button
        onClick={() => setFilter("nonExpired")}
        className={`rounded-md border-2 px-4 py-2 ${
          filter === "nonExpired" ? activeButtonClass : inactiveButtonClass
        } ${buttonHoverClass}`}
      >
        Non-expired Rides
      </button>
      <button
        onClick={() => setFilter("expired")}
        className={`rounded-md border-2 px-4 py-2 ${
          filter === "expired" ? activeButtonClass : inactiveButtonClass
        } ${buttonHoverClass}`}
      >
        Expired Rides
      </button>
    </div>
  );
};

export default FilterRides;
