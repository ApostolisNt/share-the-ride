import Dashboard from "@components/Dashboard/Dashboard";

type ParamProps = {
  params: {
    id: string;
  };
  searchParams: {
    view?: string;
  };
};

export default function DashboardPage({ params, searchParams }: ParamProps) {
  const id = params.id;
  const currentView = searchParams.view || "?view=profile";

  return (
    <div>
      <Dashboard id={id} currentView={currentView} />
    </div>
  );
}
