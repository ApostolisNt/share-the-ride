import { greekCitiesKeys } from "app/constants/cities";

export type SearchParamsType = {
  from: greekCitiesKeys;
  to: greekCitiesKeys;
  date: string;
};
