import { useState } from "react";
import Image from "next/image";
import { User } from "app/types/types";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import drink from "@assets/travelIcons/drink.png";
import music from "@assets/travelIcons/music.png";
import pets from "@assets/travelIcons/pet.png";
import smoke from "@assets/travelIcons/smoke.png";
import twoPersons from "@assets/travelIcons/two-people.png";
import threePersons from "@assets/travelIcons/three-people.png";
import EditTravelPreferences from "@components/EditTravelPreferences/EditTravelPreferences";

type IconKey =
  | "drink"
  | "music"
  | "pets"
  | "smoke"
  | "twoPersons"
  | "threePersons";

// Map icon key to image data (for view mode)
const iconMapping: Record<IconKey, { img: any; alt: string }> = {
  drink: { img: drink, alt: "Drink" },
  music: { img: music, alt: "Music" },
  pets: { img: pets, alt: "Pets" },
  smoke: { img: smoke, alt: "Smoking" },
  twoPersons: { img: twoPersons, alt: "Two Persons" },
  threePersons: { img: threePersons, alt: "Three Persons" },
};

const Profile = ({ user }: { user: User }) => {
  const [editMode, setEditMode] = useState(false);
  const updatePreferencesMutation = useMutation(api.users.updatePreferences);

  if (!user) return null;

  // Extract initial preferences from the user record.
  const initialAllowed = (user.allowed || []) as IconKey[];
  const initialNotAllowed = (user.notAllowed || []) as IconKey[];

  const handleSavePreferences = async ({
    allowed,
    notAllowed,
  }: {
    allowed: IconKey[];
    notAllowed: IconKey[];
  }) => {
    // Update preferences in the database.
    await updatePreferencesMutation({
      userId: user.userId,
      allowed,
      notAllowed,
    });
    setEditMode(false);
  };

  return (
    <div className="mx-auto w-full md:max-w-5xl">
      <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
        {/* Personal Info & Vehicle Info */}
        <div className="space-y-8">
          {/* Personal Info Card */}
          <div className="shadow rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Personal Info
            </h2>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Rating:</span>{" "}
              {user.rating ? (user.rating / 5).toFixed(1) : "No rating yet"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Languages:</span>{" "}
              {user.driverInfo?.language || "N/A"}
            </p>
          </div>
          {/* Vehicle Info Card */}
          <div className="shadow rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Vehicle Info
            </h2>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Brand:</span>{" "}
              {user.vehicleBrand || "N/A"}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-semibold">Years of Experience:</span>{" "}
              {user.driverInfo?.yearsOfExperience
                ? `${user.driverInfo.yearsOfExperience} years`
                : "N/A"}
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Driving License:</span>{" "}
              {user.driverInfo?.drivingLicense || "N/A"}
            </p>
          </div>
        </div>
        {/* Travel Preferences */}
        <div>
          {editMode ? (
            <EditTravelPreferences
              initialAllowed={initialAllowed}
              initialNotAllowed={initialNotAllowed}
              onSave={handleSavePreferences}
            />
          ) : (
            <>
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-700">
                  Allowed Preferences
                </h3>
                <div className="flex flex-wrap gap-4">
                  {initialAllowed.length > 0 ? (
                    initialAllowed.map((pref, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center rounded-lg border-green-500 bg-green-200 p-2"
                      >
                        <Image
                          src={iconMapping[pref].img}
                          alt={iconMapping[pref].alt}
                          className="w-8 object-contain"
                          width={40}
                          height={40}
                        />
                        <span className="mt-1 text-sm capitalize text-black">
                          {pref}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No allowed preferences.</p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-700">
                  Not Allowed Preferences
                </h3>
                <div className="flex flex-wrap gap-4">
                  {initialNotAllowed.length > 0 ? (
                    initialNotAllowed.map((pref, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center rounded-lg border-red-500 bg-red-200 p-2"
                      >
                        <Image
                          src={iconMapping[pref].img}
                          alt={iconMapping[pref].alt}
                          className="w-8 object-contain"
                          width={40}
                          height={40}
                        />
                        <span className="mt-1 text-sm capitalize text-black">
                          {pref}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No restrictions.</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Edit Preferences
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
