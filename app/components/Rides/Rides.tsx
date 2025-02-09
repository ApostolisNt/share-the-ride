"use client";

import { SearchParamsType } from "app/types/types";
// import RidesCard from "./RidesCard";
// import FilterRides from "./FilterRides";
import { Ride } from "data/schemas/rides";
// import Loading from "app/[locale]/(pages)/rides/loading";
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
      {/* <FilterRides rides={rides} setFilteredRides={setFilteredRides} />
      {filteredRides.length > 0 ? (
        filteredRides.map((ride: Ride) => (
          <RidesCard key={ride._id} ride={ride} users={users} />
        ))
      ) : (
        <Loading height={44} items={4} />
      )} */}
      {rides?.map((ride) => (
        <RidesCard key={ride._id} ride={ride} />
      ))}
    </section>
  );
};

export default Rides;
