import drink from "@assets/travelIcons/drink.png";
import music from "@assets/travelIcons/music.png";
import pets from "@assets/travelIcons/pet.png";
import smoke from "@assets/travelIcons/smoke.png";
import twoPersons from "@assets/travelIcons/two-people.png";
import threePersons from "@assets/travelIcons/three-people.png";
import { StaticImageData } from "next/image";

type TravelTypesProps = {
  allowed: Array<keyof Icons>;
  notAllowed: Array<keyof Icons>;
};

type Icons = {
  drink: StaticImageData;
  music: StaticImageData;
  pets: StaticImageData;
  smoke: StaticImageData;
  twoPersons: StaticImageData;
  threePersons: StaticImageData;
};

export const TravelTypes = ({ allowed, notAllowed }: TravelTypesProps) => {
  const allIcons: Icons = {
    drink,
    music,
    pets,
    smoke,
    twoPersons,
    threePersons,
  };

  const mapIcons = (types: Array<keyof Icons>) =>
    types
      .map((type) => allIcons[type])
      .filter((icon): icon is StaticImageData => Boolean(icon));

  const allowedIcons = mapIcons(allowed);
  const notAllowedIcons = mapIcons(notAllowed);

  return { allowedIcons, notAllowedIcons };
};
