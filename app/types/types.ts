import { GreekCitiesKeys } from "app/constants/cities";

export type SearchParamsType = {
  from: GreekCitiesKeys;
  to: GreekCitiesKeys;
  date: string;
};
