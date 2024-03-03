import Rides from "@components/Rides/Rides";
import { SearchParamsType } from "app/types/types";

export type searchParamsProps = {
  searchParams: SearchParamsType;
};

export default function AllRidesPage({ searchParams }: searchParamsProps) {
  return (
    <>
      <Rides results={searchParams} />
    </>
  );
}
