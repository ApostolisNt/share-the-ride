"use client";
import { Ride, User } from "@components/Rides/Rides";
import SingleRideCard from "./SingleRideCard";
import { useEffect, useState } from "react";
import dummyRides from "../../dummyRides.json";
import dummyUsers from "../../dummyUser.json";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const [ride, setRide] = useState<Array<Ride>>(dummyRides);
  const [users, setUsers] = useState<Array<User>>(dummyUsers);

  // useEffect(() => {
  //   const getRide = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:3000/api/rides/${id}`);
  //       const data = await res.json();
  //       setRide(data.ride);
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
  //   getRide();
  // }, [id]);

  // const user = users.find((u) => u._id === ride?.userId);
  const singleRide = ride.find((r) => r.id === id);
  const user = users.find((u) => u.id === singleRide?.userId);

  const singleData = singleRide && user ? { ...singleRide, ...user } : null;

  console.log(singleData);

  return (
    <section className="single_ride_section">
      {singleData ? (
        <SingleRideCard singleData={singleData} />
      ) : (
        <p>Loading ride details...</p>
      )}
    </section>
  );
};

export default SingleRidePage;
