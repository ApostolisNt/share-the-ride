"use client";
import { SearchParamsType } from "app/types/types";
import dummyRides from "../../dummyRides.json";
import RidesCard from "./RidesCard";
import { formatDate } from "app/helpers/FomatDate";

export type ResultsProps = {
  results: SearchParamsType;
};

const Rides = ({ results }: ResultsProps) => {
  // const rides = dummyRides;
  const localStoredRides = localStorage.getItem("rides");
  const ridesFromLocalStorage = localStoredRides
    ? JSON.parse(localStoredRides)
    : [];

  const { from, to, date } = results;
  const isEmptyResults = !from || !to || !date;
  const filteredRides = isEmptyResults
    ? ridesFromLocalStorage
    : ridesFromLocalStorage.filter(
        (ride: any) =>
          ride.from === from && ride.to === to && formatDate(ride.date) === date,
      );

  
  return (
    <section className="rides_section">
      {filteredRides.map((ride: any) => (
        <RidesCard key={ride.id} ride={ride} />
      ))}
    </section>
  );
};

export default Rides;
