"use client";
import SingleRideCard from "./SingleRideCard";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { RideId } from "app/types/types";
import SingleRideCardSkeleton from "@components/loading-skeletons/single-ride-skeleton";

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
        <SingleRideCardSkeleton />
      )}
    </section>
  );
};

export default SingleRidePage;
