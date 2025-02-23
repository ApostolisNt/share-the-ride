"use client";

import Profile from "./Profile/Profile";
import RidesRequests from "./RidesRequests";
import RidesCompleted from "./RidesCompleted";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

type DashboardProps = {
  id: string;
  currentView: string;
};

const Dashboard = ({ id, currentView }: DashboardProps) => {
  const user = useQuery(api.users.getUserById, { userId: id });
  const completedRides = useQuery(api.rides.getCompletedRidesWithData);
  const activeRides = useQuery(api.rides.getActiveRidesWithBookings);

  const renderComponent = () => {
    switch (currentView) {
      case "profile":
        return <Profile user={user} />;
      case "rides-completed":
        return <RidesCompleted completedRides={completedRides} />;
      case "rides-requests":
        return <RidesRequests activeRides={activeRides} />;
      default:
        return <Profile user={user} />;
    }
  };

  // Define active/inactive tab classes.
  const isActive = (view: string) =>
    currentView === view
      ? "border-blue-600 bg-blue-300"
      : "border-gray-300 bg-gray-100";

  const isProfile = currentView === "profile";

  return (
    <div className="my-12 flex w-full flex-col items-center">
      <h1 className="mb-8 text-2xl font-semibold">
        Welcome <span className="text-blue-400">{user?.name}!</span>
      </h1>
      <Link href="?view=profile" className={`mb-4 text-blue-400`}>
        {!isProfile && (
          <span className="text-base font-bold text-blue-400">
            Back to Profile
          </span>
        )}
      </Link>
      <div className="mx-auto my-4 grid auto-cols-fr grid-cols-2 justify-items-center gap-4 md:grid-cols-3">
        <Link
          href="?view=rides-completed"
          className={`flex min-h-[5rem] w-full flex-col items-center justify-center rounded-md border-2 px-4 py-6 text-center text-sm font-semibold md:text-base ${isActive("rides-completed")}`}
        >
          <span className="text-4xl font-bold text-blue-400">
            {completedRides?.length ?? 0}
          </span>
          <span className="text-base font-bold text-blue-600">
            Completed Rides
          </span>
        </Link>
        <Link
          href="?view=rides-requests"
          className={`flex min-h-[5rem] w-full flex-col items-center justify-center rounded-md border-2 px-4 py-6 text-center text-sm font-semibold md:text-base ${isActive("rides-requests")}`}
        >
          <span className="text-4xl font-bold text-blue-400">
            {activeRides?.length ?? 0}
          </span>
          <span className="text-base font-bold text-blue-600">
            Requested Rides
          </span>
        </Link>
        <div
          className={`flex min-h-[5rem] w-full flex-col items-center rounded-md border-2 border-yellow-400 bg-yellow-200 px-4 py-6 text-center text-sm font-semibold md:text-base`}
        >
          <span className="text-4xl font-bold text-blue-400">
            {user?.points ?? 0}
          </span>
          <span className="text-base font-bold text-blue-600">Points</span>{" "}
        </div>
      </div>
      <div className="shadow-md mx-auto w-full max-w-[60rem] rounded-lg bg-white p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
