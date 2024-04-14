import CreateRide from "@components/CreateRide/CreateRide";
import { SupportedLangCodes } from "data/translations/translations";

type ConstructionProps = {
  params: { locale: SupportedLangCodes };
};

export default function createRide({
  params: { locale },
}: ConstructionProps) {
  return <CreateRide />;
}
