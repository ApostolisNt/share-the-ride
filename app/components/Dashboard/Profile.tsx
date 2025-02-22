import { Doc } from "convex/_generated/dataModel";

const Profile = ({ user }: { user: Doc<"users"> }) => {
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Profile</h1>

      {user && (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
          {/* User Info */}
          <div className="shadow-md rounded-lg bg-gray-100 p-4">
            <h2 className="mb-3 text-xl font-semibold">Personal Info</h2>
            <p className="text-gray-700">
              <span className="font-bold">Name:</span> {user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Rating:</span>{" "}
              {user.rating ? user.rating / 5 : "No rating yet"}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Languages:</span>{" "}
              {user.driverInfo?.language}
            </p>
          </div>

          {/* Vehicle Info */}
          <div className="shadow-md rounded-lg bg-gray-100 p-4">
            <h2 className="mb-3 text-xl font-semibold">Vehicle Info</h2>
            <p className="text-gray-700">
              <span className="font-bold">Brand:</span> {user.vehicleBrand}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Years of Experience:</span>{" "}
              {user.driverInfo?.yearsOfExperience} years
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Driving License:</span>{" "}
              {user.driverInfo?.drivingLicense}
            </p>
          </div>

          {/* Allowed Preferences */}
          <div className="shadow-md rounded-lg bg-gray-100 p-4">
            <h2 className="mb-3 text-xl font-semibold">Allowed Preferences</h2>
            <ul className="list-inside list-disc text-gray-700">
              {user.allowed?.map((preference, index) => (
                <li key={index}>{preference}</li>
              ))}
            </ul>
          </div>

          {/* Not Allowed Preferences */}
          <div className="shadow-md rounded-lg bg-gray-100 p-4">
            <h2 className="mb-3 text-xl font-semibold">
              Not Allowed Preferences
            </h2>
            <ul className="list-inside list-disc text-gray-700">
              {user.notAllowed?.map((preference, index) => (
                <li key={index}>{preference}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
