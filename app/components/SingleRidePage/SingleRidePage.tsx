"use client";
import SingleRideCard from "./SingleRideCard";
import Loading from "app/[locale]/(pages)/rides/loading";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { RideId } from "app/types/types";

type SingleRidePageProps = {
  rideId: RideId;
};

const SingleRidePage = ({ rideId }: SingleRidePageProps) => {
  const userSingleRide = useQuery(api.rides.getUserSingleRide, {
    rideId: rideId,
  });

  return (
    <section className="single_ride_section">
      {userSingleRide ? (
        <SingleRideCard singleData={userSingleRide} />
      ) : (
        <Loading height={96} items={1} />
      )}
    </section>
  );
};

export default SingleRidePage;
