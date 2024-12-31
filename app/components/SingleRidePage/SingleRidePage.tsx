"use client";
import { Ride } from "data/schemas/rides";
import SingleRideCard from "./SingleRideCard";
import { useEffect, useState } from "react";
import { User } from "data/schemas/users";
import Loading from "app/[locale]/(pages)/rides/loading";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const [ride, setRide] = useState<Ride[]>();
  const [rideOwnerId, setRideOwnerId] = useState<string>("");
  const [user, setUser] = useState<User[]>();
  const [singleData, setSingleData] = useState<(Ride & User) | null>(null);

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

  console.log(singleData);

  return (
    <section className="single_ride_section">
      {singleData ? (
        <SingleRideCard rideId={id} singleData={singleData} />
      ) : (
        <Loading height={96} items={1} />
      )}
    </section>
  );
};

export default SingleRidePage;
