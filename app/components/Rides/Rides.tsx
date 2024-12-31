"use client";

import { SearchParamsType } from "app/types/types";
import RidesCard from "./RidesCard";
import { useEffect, useState } from "react";
import FilterRides from "./FilterRides";
import { Ride } from "data/schemas/rides";
import { User } from "data/schemas/users";
import { formatDate } from "app/helpers/FormatDate";
import Loading from "app/[locale]/(pages)/rides/loading";

export type ResultsProps = {
  results: SearchParamsType;
};

const Rides = ({ results }: ResultsProps) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);

  useEffect(() => {
    const getRides = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/rides");
        const data = await res.json();
        setRides(data.rides);
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
    getRides();
  }, []);

  useEffect(() => {
    const { from, to, date } = results;

    const formattedDate = date ? formatDate(date) : null;

    const isEmptyResults = !from || !to || !date;

    const initialFilteredRides = isEmptyResults
      ? rides
      : rides.filter(
          (ride: Ride) =>
            ride.from.toLowerCase() === from.toLowerCase() &&
            ride.to.toLowerCase() === to.toLowerCase() &&
            ride.date === formattedDate,
        );

    setFilteredRides(initialFilteredRides);
  }, [rides, results]);

  return (
    <section className="rides_section">
      <FilterRides rides={rides} setFilteredRides={setFilteredRides} />
      {filteredRides.length > 0 ? (
        filteredRides.map((ride: Ride) => (
          <RidesCard key={ride._id} ride={ride} users={users} />
        ))
      ) : (
        <Loading height={44} items={4} />
      )}
    </section>
  );
};

export default Rides;
