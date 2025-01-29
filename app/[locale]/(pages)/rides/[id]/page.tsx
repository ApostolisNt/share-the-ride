import SingleRidePage from "@components/SingleRidePage/SingleRidePage";

type ParamProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RidePage(props: ParamProps) {
  const params = await props.params;
  const id = params.id;
  return (
    <div>
      <SingleRidePage id={id} />
    </div>
  );
}
