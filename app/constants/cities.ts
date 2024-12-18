import { z } from "zod";

export const greekCitiesEnum = z.enum([
  "Athens",
  "Thessaloniki",
  "Patras",
  "Heraklion",
  "Larissa",
  "Volos",
  "Rhodes",
  "Ioannina",
  "Chania",
  "Agrinio",
  "Karditsa",
  "Trikala",
]);

export type greekCitiesKeys = z.infer<typeof greekCitiesEnum>;
