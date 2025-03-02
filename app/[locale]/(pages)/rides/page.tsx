import Rides from "@components/Rides/Rides";
import { FilterRidesType } from "app/types/types";
import { Suspense } from "react";
import Loading from "./loading";
import RideFilters from "@components/Rides/RideFilters";

export type searchParamsProps = {
  searchParams: FilterRidesType;
};

export default async function AllRidesPage(props: searchParamsProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="sxl:grid-cols-4 mx-auto my-8 grid max-w-[1700px] grid-cols-1 gap-4 px-4">
      <RideFilters />
      <Suspense fallback={<Loading height={96} items={4} />}>
        <Rides results={searchParams} />
      </Suspense>
    </div>
  );
}
