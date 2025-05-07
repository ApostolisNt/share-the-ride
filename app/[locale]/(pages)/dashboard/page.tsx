import Dashboard from "@components/dashboard/dashboard";

type ParamProps = {
  searchParams: Promise<{
    view?: string;
  }>;
};

export default async function DashboardPage(props: ParamProps) {
  const searchParams = await props.searchParams;

  const currentView = searchParams.view || "?view=profile";

  return (
    <div>
      <Dashboard currentView={currentView} />
    </div>
  );
}
