import drink from "@assets/travel-icons/drink.png";
import music from "@assets/travel-icons/music.png";
import pets from "@assets/travel-icons/pet.png";
import smoke from "@assets/travel-icons/smoke.png";
import twoPersons from "@assets/travel-icons/two-people.png";
import threePersons from "@assets/travel-icons/three-people.png";
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
