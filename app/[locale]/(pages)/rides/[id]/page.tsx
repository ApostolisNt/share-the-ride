import SingleRidePage from "@components/SingleRidePage/SingleRidePage";

type ParamProps = {
  params: {
    id: string;
  };
};

export default function RidePage({ params }: ParamProps) {
  const id = params.id;
  return (
    <div>
      <SingleRidePage id={id} />
    </div>
  );
}
