"use client";
import { Ride, User } from "@components/Rides/Rides";
import SingleRideCard from "./SingleRideCard";
import { useEffect, useState } from "react";

type SingleRidePageProps = {
  id: string;
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const [ride, setRide] = useState<Array<Ride>>();
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<Array<User>>();
  const [singleData, setSingleData] = useState<any>(null);

  useEffect(() => {
    const getRide = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/rides/${id}`);
        const data = await res.json();
        setRide(data.ride);
        setUserId(data.ride.userId);
      } catch (error) {
        console.log(error);
      }
    };

    getRide();

    const getUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [id, userId]);

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
