import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { User } from "app/types/types";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { IconKey, getTravelIcons } from "app/helpers/travel-types";
import EditProfileModal from "./edit-travel-preferences";
import { PawPrint } from "lucide-react";
import { petFriendlyStyle } from "app/consts/general";

type ProfileProps = {
  user: User | undefined | null;
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <p className="text-gray-700">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="shadow space-y-2 rounded-lg bg-white p-6">
    <h2 className="mb-4 text-2xl font-semibold text-gray-700">{title}</h2>
    {children}
  </div>
);

const InfoGroup = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    {items.map((item, index) => (
      <InfoItem key={index} label={item.label} value={item.value} />
    ))}
  </div>
);

type IconCardProps = {
  icon: { key: IconKey; img: StaticImageData; alt: string };
  borderClass: string;
  bgClass: string;
};
const IconCard = ({ icon, borderClass, bgClass }: IconCardProps) => (
  <div
    className={`flex flex-col items-center rounded-lg ${borderClass} ${bgClass} p-2`}
  >
    <Image
      src={icon.img}
      alt={icon.alt}
      width={40}
      height={40}
      className="w-8 object-contain"
    />
    <span className="mt-1 text-sm capitalize text-black">{icon.key}</span>
  </div>
);

type PreferencesSectionProps = {
  title: string;
  icons: { key: IconKey; img: StaticImageData; alt: string }[];
  emptyMessage: string;
  borderClass: string;
  bgClass: string;
};
const PreferencesSection = ({
  title,
  icons,
  emptyMessage,
  borderClass,
  bgClass,
}: PreferencesSectionProps) => (
  <div className="mb-6">
    <h3 className="mb-3 text-xl font-semibold text-gray-700">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {icons.length > 0 ? (
        icons.map((icon) => (
          <IconCard
            key={icon.key}
            icon={icon}
            borderClass={borderClass}
            bgClass={bgClass}
          />
        ))
      ) : (
        <p className="text-gray-500">{emptyMessage}</p>
      )}
    </div>
  </div>
);

const PetFriendlyDisplay = ({ isPetFriendly }: { isPetFriendly: boolean }) => (
  <div className="mb-6">
    <h3 className="mb-3 text-xl font-semibold text-gray-700">Pet Friendly</h3>
    <div
      className={`flex w-fit items-center gap-2 rounded-lg border-2 p-2 ${petFriendlyStyle(isPetFriendly)}`}
    >
      <PawPrint size={30} className="text-gray-600" />
    </div>
  </div>
);

const Profile = ({ user }: ProfileProps) => {
  const [editMode, setEditMode] = useState(false);
  const updatePreferencesMutation = useMutation(api.users.updatePreferences);
  if (!user) return null;

  const initialAllowed = (user.allowed || []) as IconKey[];
  const initialNotAllowed = (user.notAllowed || []) as IconKey[];

  const handleSaveProfile = async (updatedData: Partial<User>) => {
    const defaultProfileData = {
      userId: user.userId,
      driverInfo: {
        yearsOfExperience: user.driverInfo?.yearsOfExperience ?? 0,
        drivingLicense: user.driverInfo?.drivingLicense ?? "",
        language: user.driverInfo?.language ?? "",
        vehicleBrand: user.driverInfo?.vehicleBrand || "",
      },
      allowed: user.allowed || [],
      notAllowed: user.notAllowed || [],
      aboutMe: user.aboutMe || "",
      isPetFriendly: user.isPetFriendly || false,
      bankInfo: {
        bankName: user.bankInfo?.bankName || "",
        iban: user.bankInfo?.iban || "",
      },
    };

    await updatePreferencesMutation({ ...defaultProfileData, ...updatedData });
    setEditMode(false);
  };

  const { allowedIcons, notAllowedIcons } = getTravelIcons({
    allowed: initialAllowed,
    notAllowed: initialNotAllowed,
  });

  const personalInfoItems = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    {
      label: "Rating",
      value: user.rating ? (user.rating / 5).toFixed(1) : "No rating yet",
    },
    { label: "Languages", value: user.driverInfo?.language || "N/A" },
    { label: "About Me", value: user.aboutMe || "N/A" },
  ];

  const bankInfoItems = [
    { label: "Bank Name", value: user.bankInfo?.bankName || "N/A" },
    { label: "Iban", value: user.bankInfo?.iban || "N/A" },
  ];

  const vehicleInfoItems = [
    { label: "Brand", value: user.driverInfo?.vehicleBrand || "N/A" },
    {
      label: "Years of Experience",
      value: user.driverInfo?.yearsOfExperience
        ? `${user.driverInfo.yearsOfExperience} years`
        : "N/A",
    },
    {
      label: "Driving License",
      value: user.driverInfo?.drivingLicense || "N/A",
    },
  ];

  return (
    <div className="mx-auto w-full p-6 md:max-w-7xl">
      <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2">
        {/* Left Column: Personal & Vehicle Info */}
        <div className="space-y-8">
          <Card title="Personal Info">
            {personalInfoItems.map((item, index) => (
              <InfoItem key={index} label={item.label} value={item.value} />
            ))}
            <InfoGroup title="Bank Information" items={bankInfoItems} />
          </Card>
          <Card title="Vehicle Info">
            {vehicleInfoItems.map((item, index) => (
              <InfoItem key={index} label={item.label} value={item.value} />
            ))}
          </Card>
        </div>
        {/* Right Column: Travel Preferences */}
        <div>
          <PreferencesSection
            title="Allowed Preferences"
            icons={allowedIcons}
            emptyMessage="No allowed preferences."
            borderClass="border-green-500"
            bgClass="bg-green-200"
          />
          <PreferencesSection
            title="Not Allowed Preferences"
            icons={notAllowedIcons}
            emptyMessage="No restrictions."
            borderClass="border-red-500"
            bgClass="bg-red-200"
          />
          <PetFriendlyDisplay isPetFriendly={user.isPetFriendly} />
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Edit Preferences
          </button>
          {editMode && (
            <EditProfileModal
              user={user}
              initialAllowed={initialAllowed}
              initialNotAllowed={initialNotAllowed}
              onSave={handleSaveProfile}
              onClose={() => setEditMode(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
