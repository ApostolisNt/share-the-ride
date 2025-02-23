"use client";

import Profile from "./Profile/Profile";
import RidesRequests from "./RidesRequests";
import RidesCompleted from "./RidesCompleted";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { MoveLeft } from "lucide-react";

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

  const activeClasses: { [key in "green" | "orange"]: string } = {
    green: "border-green-600 bg-green-200",
    orange: "border-orange-600 bg-orange-200",
  };

  const isActive = (view: string, color: "green" | "orange") =>
    currentView === view ? activeClasses[color] : "border-gray-300 bg-gray-100";

  const isProfile = currentView === "profile";

  return (
    <div className="my-12 flex w-full flex-col items-center">
      <h1 className="mb-8 text-2xl font-semibold">
        Welcome <span className="text-blue-400">{user?.name}!</span>
      </h1>
      <div className="flex w-full flex-col items-center px-1">
        {/* Back to Profile link */}
        {!isProfile && (
          <div className="mb-4 w-full max-w-3xl">
            <Link href="?view=profile" className="text-blue-400">
              <div className="flex cursor-pointer items-center gap-2">
                <MoveLeft className="h-5 w-5" />
                <span className="text-sm font-bold">Back to Profile</span>
              </div>
            </Link>
          </div>
        )}
        {/* Tab Grid */}
        <div className="mx-auto my-4 grid w-full max-w-3xl auto-cols-fr grid-cols-2 justify-items-center gap-4 md:grid-cols-3">
          <Link
            href="?view=rides-completed"
            className={`flex min-h-[5rem] w-full flex-col items-center justify-center rounded-md border-2 px-4 py-6 text-center text-sm font-semibold md:text-base ${isActive(
              "rides-completed",
              "green",
            )}`}
          >
            <span className="text-4xl font-bold text-green-400">
              {completedRides?.length ?? 0}
            </span>
            <span className="text-sm font-bold text-green-500">
              Completed Rides
            </span>
          </Link>
          <Link
            href="?view=rides-requests"
            className={`flex min-h-[5rem] w-full flex-col items-center justify-center rounded-md border-2 px-4 py-6 text-center text-sm font-semibold md:text-base ${isActive(
              "rides-requests",
              "orange",
            )}`}
          >
            <span className="text-4xl font-bold text-orange-400">
              {activeRides?.length ?? 0}
            </span>
            <span className="text-sm font-bold text-orange-500">
              Requested Rides
            </span>
          </Link>
          <div className="flex min-h-[5rem] w-full flex-col items-center rounded-md border-2 border-blue-600 bg-blue-100 px-4 py-6 text-center text-sm font-semibold md:text-sm">
            <span className="text-4xl font-bold text-blue-400">
              {user?.points ?? 0}
            </span>
            <span className="text-sm font-bold text-blue-500">Points</span>
          </div>
        </div>
        {/* Content Area */}
        <div className="shadow-md mx-auto w-full max-w-[60rem] rounded-lg bg-white p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
