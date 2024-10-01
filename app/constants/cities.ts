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
]);
