"use client";

// import RidesDummy from "app/dummyRides.json"

import { SearchParamsType } from "app/types/types";
// import RidesCard from "./RidesCard";
// import FilterRides from "./FilterRides";
import Loading from "app/[locale]/(pages)/rides/loading";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import RidesCard from "./RidesCard";

export type ResultsProps = {
  results: SearchParamsType;
};

const Rides = ({ results }: ResultsProps) => {
  const rides = useQuery(api.rides.get);

  return (
    <section className="rides_section">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-3 md:grid-cols-2">
        {rides && rides.length > 0 ? (
          rides?.map((ride) => <RidesCard key={ride.rideId} ride={ride} />)
        ) : (
          <Loading height={44} items={4} />
        )}
      </div>
    </section>
  );
};

export default Rides;
