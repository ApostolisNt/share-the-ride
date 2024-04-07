"use client";
import { Ride, User } from "@components/Rides/Rides";
import SingleRideCard from "./SingleRideCard";
import { useEffect, useState } from "react";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getRide = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/rides/${id}`);
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
    getRide();
  }, [id]);

  // const singleData = rides.map((ride) => {
  //   const user = users.filter((user) => user._id === ride.userId);
  //   return { ...ride, ...user };
  // });

  return (
    <section className="single_ride_section">
      {/* <SingleRideCard singleData={singleData} /> */}
    </section>
  );
};

export default SingleRidePage;
