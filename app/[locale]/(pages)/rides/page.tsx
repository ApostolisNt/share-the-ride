import Rides from "@components/Rides/Rides";
import { SearchParamsType } from "app/types/types";
import { Suspense } from "react";
import Loading from "./loading";

export type searchParamsProps = {
  searchParams: SearchParamsType;
};

export default async function AllRidesPage(props: searchParamsProps) {
  const searchParams = await props.searchParams;
  return (
    <>
      <Suspense fallback={<Loading height={96} items={4} />}>
        <Rides results={searchParams} />
      </Suspense>
    </>
  );
}
