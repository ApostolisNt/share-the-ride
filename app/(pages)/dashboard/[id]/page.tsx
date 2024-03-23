import Dashboard from "@components/Dashboard/Dashboard";

type ParamProps = {
  params: {
    id: string;
  };
};

export default function DashboardPage({ params }: ParamProps) {
  const id = params.id;
  return (
    <div>
      <Dashboard id={id} />
    </div>
  );
}
