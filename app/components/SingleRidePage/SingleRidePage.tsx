"use client";
import { Ride } from "data/schemas/rides";
import SingleRideCard from "./SingleRideCard";
import { useEffect, useState } from "react";
import { User } from "data/schemas/users";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const [ride, setRide] = useState<Ride[]>();
  const [rideOwnerId, setRideOwnerId] = useState<string>("");
  const [user, setUser] = useState<User[]>();
  const [singleData, setSingleData] = useState<any>(null);

  useEffect(() => {
    const getRide = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/rides/${id}`);
        const data = await res.json();
        setRide(data.ride);
        setRideOwnerId(data.ride.rideOwnerId);
      } catch (error) {
        console.log(error);
      }
    };

    getRide();

    const getUsers = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/${rideOwnerId}`,
        );
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [id, rideOwnerId]);

  useEffect(() => {
    if (ride && user) {
      setSingleData({ ...ride, ...user });
    }
  }, [ride, user]);

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
