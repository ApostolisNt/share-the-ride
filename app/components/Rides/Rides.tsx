import { SearchParamsType } from "app/types/types";
import dummyRides from "./dummyRides.json";
import RidesCard from "./RidesCard";

export type ResultsProps = {
  results: SearchParamsType;
};

const Rides = ({ results }: ResultsProps) => {
  const rides = dummyRides;

  const { from, to, date } = results;
  const isEmptyResults = !from || !to || !date;
  const filteredRides = isEmptyResults
    ? rides
    : rides.filter(
        (ride: any) =>
          ride.from === from && ride.to === to && ride.date === date
      );

  return (
    <section className="rides_section">
      {filteredRides.map((ride: any) => (
        <RidesCard key={ride.id} ride={ride} />
      ))}
    </section>
  );
};

export default Rides;
