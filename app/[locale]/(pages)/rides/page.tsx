import Rides from "@components/rides/rides";
import { FilterRidesType } from "app/types/types";
import { Suspense } from "react";
import RideFilters from "@components/rides/ride-filters";
import RideCardSkeleton from "../../../components/loading-skeletons/ride-card-skeleton";

export type searchParamsProps = {
  searchParams: FilterRidesType;
};

export default async function AllRidesPage(props: searchParamsProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="sxl:grid-cols-4 mx-auto my-8 grid max-w-[1700px] grid-cols-1 gap-4 px-4">
      <RideFilters />
      <Suspense fallback={<RideCardSkeleton count={6} />}>
        <Rides results={searchParams} />
      </Suspense>
    </div>
  );
}
