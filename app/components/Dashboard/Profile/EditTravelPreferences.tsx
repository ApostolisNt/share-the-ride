import { useEffect, useState } from "react";
import { User } from "app/types/types";
import { allIcons, IconKey } from "app/helpers/TravelTypes";
import { Image } from "@components/Global/Image";
import { PawPrint } from "lucide-react";
import { petFriendlyStyle } from "app/consts/general";

type EditProfileModalProps = {
  user: User;
  initialAllowed: IconKey[];
  initialNotAllowed: IconKey[];
  onSave: (updatedData: Partial<User>) => void;
  onClose: () => void;
};

const EditProfileModal = ({
  user,
  initialAllowed,
  initialNotAllowed,
  onSave,
  onClose,
}: EditProfileModalProps) => {
  const [allowed, setAllowed] = useState<IconKey[]>(initialAllowed);
  const [notAllowed, setNotAllowed] = useState<IconKey[]>(initialNotAllowed);
  const [aboutMe, setAboutMe] = useState(user.aboutMe || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    user.driverInfo?.yearsOfExperience,
  );
  const [drivingLicense, setDrivingLicense] = useState(
    user.driverInfo?.drivingLicense || "",
  );
  const [language, setLanguage] = useState(user.driverInfo?.language || "");
  const [vehicleBrand, setVehicleBrand] = useState(
    user.driverInfo?.vehicleBrand || "",
  );
  const [isPetFriendly, setIsPetFriendly] = useState(
    user.isPetFriendly || false,
  );
  const [bankName, setBankName] = useState(user.bankInfo?.bankName || "");
  const [iban, setIban] = useState(user.bankInfo?.iban || "");

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleSave = () => {
    onSave({
      aboutMe,
      driverInfo: {
        yearsOfExperience,
        drivingLicense,
        language,
        vehicleBrand,
      },
      isPetFriendly,
      bankInfo: {
        bankName,
        iban,
      },
      allowed,
      notAllowed,
    });
  };

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

  const handleTogglePetFriendly = () => {
    setIsPetFriendly((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="shadow-lg relative w-full max-w-lg rounded-lg bg-white">
        {/* Scrollable Modal Content */}
        <div className="max-h-[80vh] overflow-y-auto p-6">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Edit Profile
          </h3>

          <label className="block">
            <span className="text-gray-700">About Me</span>
            <textarea
              rows={3}
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              className="mt-1 w-full rounded-sm border border-gray-300 p-2"
            />
          </label>

          {/* Driver Information Group */}
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-medium text-gray-700">
              Driver Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Years of Experience</span>
                <input
                  type="number"
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                  className="mt-1 w-full rounded-sm border border-gray-300 p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Driving License</span>
                <input
                  type="text"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value)}
                  className="mt-1 w-full rounded-sm border border-gray-300 p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Language</span>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 w-full rounded-sm border border-gray-300 p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Vehicle Brand</span>
                <input
                  type="text"
                  value={vehicleBrand}
                  onChange={(e) => setVehicleBrand(e.target.value)}
                  className="mt-1 w-full rounded-sm border border-gray-300 p-2"
                />
              </label>
            </div>
          </div>

          {/* Bank Information Group */}
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-medium text-gray-700">
              Bank Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Bank Name</span>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="mt-1 w-full rounded-sm border border-gray-300 p-2"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">IBAN</span>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="mt-1 w-full rounded-sm border border-gray-300 p-2"
                />
              </label>
            </div>
          </div>

          {/* Pet Friendly Toggle */}
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-medium text-gray-700">
              Pet Friendly
            </h4>
            <div
              onClick={handleTogglePetFriendly}
              className={`flex w-fit cursor-pointer items-center gap-2 rounded-lg border-2 p-2 ${petFriendlyStyle(isPetFriendly)}`}
            >
              <PawPrint size={30} className="text-gray-600" />
            </div>
          </div>

          {/* Preferences */}
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-medium text-gray-700">
              Allowed Preferences
            </h4>
            <div className="flex flex-wrap gap-4">
              {Object.keys(allIcons).map((key) => {
                const icon = key as IconKey;
                return (
                  <div
                    key={icon}
                    onClick={() => toggleSelection(icon, "allowed")}
                    className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 ${
                      allowed.includes(icon)
                        ? "border-green-500 bg-green-200"
                        : "border border-gray-300"
                    }`}
                  >
                    <Image
                      src={allIcons[icon].img}
                      alt={allIcons[icon].alt}
                      width={40}
                      height={40}
                      className="w-8 object-contain"
                    />
                    <span className="mt-1 text-sm capitalize text-black">
                      {icon}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 text-lg font-medium text-gray-700">
              Not Allowed Preferences
            </h4>
            <div className="flex flex-wrap gap-4">
              {Object.keys(allIcons).map((key) => {
                const icon = key as IconKey;
                return (
                  <div
                    key={icon}
                    onClick={() => toggleSelection(icon, "notAllowed")}
                    className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-2 ${
                      notAllowed.includes(icon)
                        ? "border-red-500 bg-red-200"
                        : "border border-gray-300"
                    }`}
                  >
                    <Image
                      src={allIcons[icon].img}
                      alt={allIcons[icon].alt}
                      width={40}
                      height={40}
                      className="w-8 object-contain"
                    />
                    <span className="mt-1 text-sm capitalize text-black">
                      {icon}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 rounded-b-lg bg-gray-100 p-6">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
