"use client";
import { SearchParamsType } from "app/types/types";
import RidesCard from "./RidesCard";
import { formatDate } from "app/helpers/FomatDate";
import { useEffect, useState } from "react";
import dummyRides from "../../dummyRides.json";
import dummyUsers from "../../dummyUser.json";

export type ResultsProps = {
  results: SearchParamsType;
};

export type Ride = {
  // _id: string;
  id: string;
  userId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  ridePrice: number;
};

export type User = {
  // _id: string;
  id: string;
  allowed: string[];
  notAllowed: string[];
  rating: number;
  vehicleBrand: string;
  name: string;
};

const Rides = ({ results }: ResultsProps) => {
  const [rides, setRides] = useState<Array<Ride>>(dummyRides);
  const [users, setUsers] = useState<Array<User>>(dummyUsers);

  // useEffect(() => {
  //   const getRides = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/api/rides");
  //       const data = await res.json();
  //       setRides(data.rides);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getUsers = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3000/api/users");
  //       const data = await res.json();
  //       setUsers(data.users);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getUsers();
  //   getRides();
  // }, []);

  const { from, to, date } = results;
  const isEmptyResults = !from || !to || !date;
  const filteredRides = isEmptyResults
    ? rides
    : rides?.filter(
        (ride: any) =>
          ride.from === from &&
          ride.to === to &&
          formatDate(ride.date) === date,
      );

  return (
    <section className="rides_section">
      {filteredRides.map((ride: any) => (
        <RidesCard key={ride.id} ride={ride} users={users} />
      ))}
    </section>
  );
};

export default Rides;
