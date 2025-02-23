import { useState } from "react";
import Image from "next/image";
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

export type Icons = {
  [K in IconKey]: {
    img: StaticImageData;
    alt: string;
  };
};

const allIcons: Icons = {
  drink: { img: drink, alt: "Drink" },
  music: { img: music, alt: "Music" },
  pets: { img: pets, alt: "Pets" },
  smoke: { img: smoke, alt: "Smoking" },
  twoPersons: { img: twoPersons, alt: "Two Persons" },
  threePersons: { img: threePersons, alt: "Three Persons" },
};

type EditTravelPreferencesProps = {
  initialAllowed: IconKey[];
  initialNotAllowed: IconKey[];
  onSave: (prefs: { allowed: IconKey[]; notAllowed: IconKey[] }) => void;
};

const EditTravelPreferences = ({
  initialAllowed,
  initialNotAllowed,
  onSave,
}: EditTravelPreferencesProps) => {
  const [allowed, setAllowed] = useState<IconKey[]>(initialAllowed);
  const [notAllowed, setNotAllowed] = useState<IconKey[]>(initialNotAllowed);

  const toggleSelection = (
    icon: IconKey,
    category: "allowed" | "notAllowed",
  ) => {
    if (category === "allowed") {
      if (allowed.includes(icon)) {
        setAllowed(allowed.filter((key) => key !== icon));
      } else {
        setAllowed([...allowed, icon]);
      }
    } else {
      if (notAllowed.includes(icon)) {
        setNotAllowed(notAllowed.filter((key) => key !== icon));
      } else {
        setNotAllowed([...notAllowed, icon]);
      }
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-2 text-xl font-semibold text-gray-700">
        Edit Travel Preferences
      </h3>
      <div>
        <h4 className="mb-2 mt-4 font-medium text-gray-700">
          Allowed Preferences
        </h4>
        <div className="flex flex-wrap gap-4">
          {Object.keys(allIcons).map((key) => {
            const icon = key as IconKey;
            return (
              <div
                key={`allowed-${icon}`}
                onClick={() => toggleSelection(icon, "allowed")}
                className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 ${
                  allowed.includes(icon)
                    ? "border-green-500 bg-green-200"
                    : "border-green-300"
                }`}
              >
                <Image
                  className="w-8 object-contain"
                  src={allIcons[icon].img}
                  alt={allIcons[icon].alt}
                  width={40}
                  height={40}
                />
                <span className="mt-1 text-sm capitalize text-black">
                  {icon}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-2 mt-4 font-medium text-gray-700">
          Not Allowed Preferences
        </h4>
        <div className="flex flex-wrap gap-4">
          {Object.keys(allIcons).map((key) => {
            const icon = key as IconKey;
            return (
              <div
                key={`notAllowed-${icon}`}
                onClick={() => toggleSelection(icon, "notAllowed")}
                className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 ${
                  notAllowed.includes(icon)
                    ? "border-red-500 bg-red-200"
                    : "border-red-300"
                }`}
              >
                <Image
                  src={allIcons[icon].img}
                  alt={allIcons[icon].alt}
                  className="w-8 object-contain"
                  width={40}
                  height={40}
                />
                <span className="mt-1 text-sm capitalize text-black">
                  {icon}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => onSave({ allowed, notAllowed })}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default EditTravelPreferences;
