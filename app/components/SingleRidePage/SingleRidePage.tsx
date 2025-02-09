"use client";
import SingleRideCard from "./SingleRideCard";
import Loading from "app/[locale]/(pages)/rides/loading";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Doc } from "convex/_generated/dataModel";

type SingleRidePageProps = {
  id: Doc<"rides">["_id"];
};

const SingleRidePage = ({ id }: SingleRidePageProps) => {
  const userSingleRide = useQuery(api.rides.getUserSingleRide, { rideId: id });


  return (
    <section className="single_ride_section">
      {userSingleRide ? (
        <SingleRideCard rideId={id} singleData={userSingleRide} />
      ) : (
        <Loading height={96} items={1} />
      )}
    </section>
  );
};

export default SingleRidePage;
