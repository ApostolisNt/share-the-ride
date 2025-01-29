// import Dashboard from "@components/Dashboard/Dashboard";

type ParamProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    view?: string;
  }>;
};

export default async function DashboardPage(props: ParamProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  console.log(params, searchParams);

  // const id = params.id;
  // const currentView = searchParams.view || "?view=profile";

  return <div>{/* <Dashboard id={id} currentView={currentView} /> */}</div>;
}
