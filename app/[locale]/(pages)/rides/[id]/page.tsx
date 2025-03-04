import SingleRideCardSkeleton from "@components/LoadingSkeletons/SingleRideSkeleton";
import SingleRidePage from "@components/SingleRidePage/SingleRidePage";
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
