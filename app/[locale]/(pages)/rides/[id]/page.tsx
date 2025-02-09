import SingleRidePage from "@components/SingleRidePage/SingleRidePage";
import { Doc } from "convex/_generated/dataModel";

type ParamProps = {
  params: Promise<{
    id: Doc<"rides">["_id"];
  }>;
};

export default async function RidePage(props: ParamProps) {
  const params = await props.params;
  const id = params.id;
  console.log(id);
  
  return (
    <div>
      <SingleRidePage id={id} />
    </div>
  );
}
