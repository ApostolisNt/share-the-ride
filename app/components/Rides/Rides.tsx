"use client";

import { FilterRidesType } from "app/types/types";
import { usePaginatedQuery } from "convex/react";
import { api } from "convex/_generated/api";
import RidesCard from "./RidesCard";
import RideCardSkeleton from "@components/LoadingSkeletons/RidesSkeleton";

export type ResultsProps = {
  results: FilterRidesType;
};

const Rides = ({ results }: ResultsProps) => {
  const formattedResults: FilterRidesType = {
    ...results,
    petFriendly:
      typeof results.petFriendly === "string"
        ? results.petFriendly === "true"
        : results.petFriendly,
    priceMin:
      results.priceMin !== undefined ? Number(results.priceMin) : undefined,
    priceMax:
      results.priceMax !== undefined ? Number(results.priceMax) : undefined,
    allowed:
      results.allowed === undefined
        ? undefined
        : typeof results.allowed === "string"
          ? (results.allowed as string).split(",")
          : results.allowed,
  };

  const {
    results: rides,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.rides.getFilteredRides,
    {
      ...formattedResults,
    },
    { initialNumItems: 20 },
  );

  return (
    <section className="col-span-3">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-3 md:w-full md:grid-cols-2 xl:max-w-full">
        {rides && rides.length > 0 ? (
          rides.map((ride) => <RidesCard key={ride.rideId} ride={ride} />)
        ) : (
          <RideCardSkeleton count={6} />
        )}
      </div>

      <button
        onClick={() => loadMore(20)}
        disabled={status !== "CanLoadMore"}
        className="mx-auto my-12 block w-fit rounded-md border-2 border-yellow-500 bg-yellow-100 px-2 py-1 font-semibold text-yellow-600 disabled:hidden"
      >
        Load More
      </button>
    </section>
  );
};

export default Rides;
