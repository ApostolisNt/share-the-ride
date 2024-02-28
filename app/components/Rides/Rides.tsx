import { SearchParamsType } from "app/types/types";

export type ResultsProps = {
  results: SearchParamsType;
};

const Rides = ({ results }: ResultsProps) => {
  return <>{results.from}</>;
};

export default Rides;
