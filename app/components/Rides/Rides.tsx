"use client";
import { SearchParamsType } from "app/types/types";
import RidesCard from "./RidesCard";
import { formatDate } from "app/helpers/FomatDate";
import { useEffect, useState } from "react";
import FilterRides from "./FilterRides";

export type ResultsProps = {
  results: SearchParamsType;
};

export type Ride = {
  _id: string;
  userId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  ridePrice: number;
};

export type User = {
  _id: string;
  allowed: string[];
  notAllowed: string[];
  rating: number;
  vehicleBrand: string;
  name: string;
  contact: {
    phone: string;
    email: string;
  };
  driverInfo: {
    yearsOfExperience: number;
    drivingLicense: string;
    language: string;
  };
};

const Rides = ({ results }: ResultsProps) => {
  const [rides, setRides] = useState<Array<Ride>>([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const [filteredRides, setFilteredRides] = useState<Array<Ride>>([]);

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

  const { from, to, date } = results;
  const isEmptyResults = !from || !to || !date;
  const initialFilteredRides = isEmptyResults
    ? rides
    : rides.filter(
        (ride: Ride) =>
          ride.from === from &&
          ride.to === to &&
          formatDate(ride.date) === date,
      );

  useEffect(() => {
    setFilteredRides(initialFilteredRides);
  }, [initialFilteredRides]);

  return (
    <section className="rides_section">
      <FilterRides
        rides={initialFilteredRides}
        setFilteredRides={setFilteredRides}
      />
      {filteredRides.map((ride: Ride) => (
        <RidesCard key={ride._id} ride={ride} users={users} />
      ))}
    </section>
  );
};

export default Rides;
