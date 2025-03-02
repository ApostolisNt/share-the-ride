import CreateRide from "@components/CreateRide/CreateRide";
import { SupportedLangCodes } from "data/translations/translations";

type ConstructionProps = {
  params: Promise<{ locale: SupportedLangCodes }>;
};

export default async function createRide(props: ConstructionProps) {
  const params = await props.params;
  console.log(params);

  return <CreateRide />;
}
