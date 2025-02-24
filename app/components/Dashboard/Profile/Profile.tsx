import { useState } from "react";
import Image from "next/image";
import { User } from "app/types/types";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { IconKey, getTravelIcons } from "app/helpers/TravelTypes";
import EditTravelPreferences from "./EditTravelPreferences";

type ProfileProps = {
  user: User | undefined | null;
};

const Profile = ({ user }: ProfileProps) => {
  const [editMode, setEditMode] = useState(false);
  const updatePreferencesMutation = useMutation(api.users.updatePreferences);

  if (!user) return null;

  const initialAllowed = (user.allowed || []) as IconKey[];
  const initialNotAllowed = (user.notAllowed || []) as IconKey[];

  const handleSavePreferences = async ({
    allowed,
    notAllowed,
  }: {
    allowed: IconKey[];
    notAllowed: IconKey[];
  }) => {
    await updatePreferencesMutation({
      userId: user.userId,
      allowed,
      notAllowed,
    });
    setEditMode(false);
  };

  const { allowedIcons, notAllowedIcons } = getTravelIcons({
    allowed: initialAllowed,
    notAllowed: initialNotAllowed,
  });

  return (
    <div className="mx-auto w-full p-6 md:max-w-7xl">
      <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
        {/* Personal & Vehicle Info */}
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
                  {allowedIcons.length > 0 ? (
                    allowedIcons.map((icon) => (
                      <div
                        key={icon.key}
                        className="flex flex-col items-center rounded-lg border-green-500 bg-green-200 p-2"
                      >
                        <Image
                          src={icon.img}
                          alt={icon.alt}
                          width={40}
                          height={40}
                          className="w-8 object-contain"
                        />
                        <span className="mt-1 text-sm capitalize text-black">
                          {icon.key}
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
                  {notAllowedIcons.length > 0 ? (
                    notAllowedIcons.map((icon) => (
                      <div
                        key={icon.key}
                        className="flex flex-col items-center rounded-lg border-red-500 bg-red-200 p-2"
                      >
                        <Image
                          src={icon.img}
                          alt={icon.alt}
                          width={40}
                          height={40}
                          className="w-8 object-contain"
                        />
                        <span className="mt-1 text-sm capitalize text-black">
                          {icon.key}
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
