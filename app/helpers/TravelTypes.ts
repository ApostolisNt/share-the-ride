import drink from "@assets/travelIcons/drink.png";
import music from "@assets/travelIcons/music.png";
import pets from "@assets/travelIcons/pet.png";
import smoke from "@assets/travelIcons/smoke.png";
import twoPersons from "@assets/travelIcons/two-people.png";
import threePersons from "@assets/travelIcons/three-people.png";
import { StaticImageData } from "next/image";

export type IconKey =
  | "drink"
  | "music"
  | "pets"
  | "smoke"
  | "twoPersons"
  | "threePersons";

export type IconInfo = {
  img: StaticImageData;
  alt: string;
};

export type Icons = Record<IconKey, IconInfo>;

export const allIcons: Icons = {
  drink: { img: drink, alt: "Drink" },
  music: { img: music, alt: "Music" },
  pets: { img: pets, alt: "Pets" },
  smoke: { img: smoke, alt: "Smoking" },
  twoPersons: { img: twoPersons, alt: "Two Persons" },
  threePersons: { img: threePersons, alt: "Three Persons" },
};

export const getTravelIcons = (prefs: {
  allowed?: string[];
  notAllowed?: string[];
}) => {
  const filterValidKeys = (types: string[]): IconKey[] =>
    types.filter((type): type is IconKey => type in allIcons);

  const mapIcons = (types: string[]) =>
    filterValidKeys(types).map((key) => ({
      key,
      ...allIcons[key],
    }));

  return {
    allowedIcons: mapIcons(prefs.allowed ?? []),
    notAllowedIcons: mapIcons(prefs.notAllowed ?? []),
  };
};
