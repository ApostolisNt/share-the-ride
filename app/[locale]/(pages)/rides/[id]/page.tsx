import SingleRideCardSkeleton from "@components/loading-skeletons/single-ride-skeleton";
import SingleRidePage from "@components/single-ride-page/SingleRidePage";
import { RideId } from "app/types/types";
import { Suspense } from "react";

type ParamProps = {
  params: Promise<{
    id: RideId;
  }>;
};

export default async function RidePage(props: ParamProps) {
  const params = await props.params;
  const id = params.id;

  return (
    <div>
      <Suspense fallback={<SingleRideCardSkeleton />}>
        <SingleRidePage rideId={id} />
      </Suspense>
    </div>
  );
}
