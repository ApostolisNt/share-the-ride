import SingleRidePage from "@components/SingleRidePage/SingleRidePage";
import { RideId } from "app/types/types";

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
      <SingleRidePage rideId={id} />
    </div>
  );
}
