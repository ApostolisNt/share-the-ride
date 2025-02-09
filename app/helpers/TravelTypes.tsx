import drink from "@assets/travelIcons/drink.png";
import music from "@assets/travelIcons/music.png";
import pets from "@assets/travelIcons/pet.png";
import smoke from "@assets/travelIcons/smoke.png";
import twoPersons from "@assets/travelIcons/two-people.png";
import threePersons from "@assets/travelIcons/three-people.png";
import { StaticImageData } from "next/image";

export type TravelTypesProps = {
  allowed?: Array<keyof Icons>;
  notAllowed?: Array<keyof Icons>;
};

type IconInfo = {
  img: StaticImageData;
  alt: string;
};

export type Icons = {
  drink: IconInfo;
  music: IconInfo;
  pets: IconInfo;
  smoke: IconInfo;
  twoPersons: IconInfo;
  threePersons: IconInfo;
};

export const TravelTypes = ({ allowed, notAllowed }: TravelTypesProps) => {
  const allIcons: Icons = {
    drink: { img: drink, alt: "drink" },
    music: { img: music, alt: "music" },
    pets: { img: pets, alt: "pets" },
    smoke: { img: smoke, alt: "smoking" },
    twoPersons: { img: twoPersons, alt: "two persons" },
    threePersons: { img: threePersons, alt: "three persons" },
  };

  const mapIcons = (types: Array<keyof Icons>) =>
    types.map((type) => ({
      ...allIcons[type],
      key: type,
    }));

  if (!allowed && !notAllowed) {
    return { allowedIcons: [], notAllowedIcons: [] };
  }

  const allowedIcons = mapIcons(allowed ?? []);
  const notAllowedIcons = mapIcons(notAllowed ?? []);

  return { allowedIcons, notAllowedIcons };
};
