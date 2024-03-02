import { SearchParamsType } from "app/types/types";
import dummyRides from "./dummyRides.json";
import RidesCard from "./RidesCard";

export type ResultsProps = {
  results: SearchParamsType;
};

const Rides = ({ results }: ResultsProps) => {
  const rides = dummyRides;

  return (
    <section className="rides_section">
      {rides.map((ride: any) => (
        <RidesCard key={ride.id} ride={ride} />
      ))}
    </section>
  );
};

export default Rides;
