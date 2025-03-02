import { useState } from "react";
import Image from "next/image";
import { allIcons, IconKey } from "app/helpers/TravelTypes";

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
      setAllowed(
        allowed.includes(icon)
          ? allowed.filter((key) => key !== icon)
          : [...allowed, icon],
      );
    } else {
      setNotAllowed(
        notAllowed.includes(icon)
          ? notAllowed.filter((key) => key !== icon)
          : [...notAllowed, icon],
      );
    }
  };

  const renderIcon = (
    icon: IconKey,
    selected: boolean,
    category: "allowed" | "notAllowed",
  ) => (
    <div
      key={icon}
      onClick={() => toggleSelection(icon, category)}
      className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 ${
        selected
          ? category === "allowed"
            ? "border-green-500 bg-green-200"
            : "border-red-500 bg-red-200"
          : category === "allowed"
            ? "border-green-300"
            : "border-red-300"
      }`}
    >
      <Image
        src={allIcons[icon].img}
        alt={allIcons[icon].alt}
        width={40}
        height={40}
        className="w-8 object-contain"
      />
      <span className="mt-1 text-sm capitalize text-black">{icon}</span>
    </div>
  );

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
            return renderIcon(icon, allowed.includes(icon), "allowed");
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
            return renderIcon(icon, notAllowed.includes(icon), "notAllowed");
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
