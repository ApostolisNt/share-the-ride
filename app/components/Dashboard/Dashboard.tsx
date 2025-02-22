"use client";

import Profile from "./Profile";
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

  const renderComponent = () => {
    switch (currentView) {
      case "profile":
        return <Profile user={user} />;
      case "rides-completed":
        return <RidesCompleted />;
      case "rides-requests":
        return <RidesRequests />;
      default:
        return <Profile user={user} />;
    }
  };

  const isActive = (view: string) =>
    currentView === view ? "border-b-2 border-solid border-black" : "";

  return (
    <div className="my-12 flex w-full flex-col items-center">
      <h1 className="mb-8 text-2xl font-semibold">
        Welcome <span className="text-blue-400">{user?.name}!</span>
      </h1>
      <div className="dashboard-list mx-auto my-8 flex w-3/5 flex-wrap justify-evenly gap-4">
        <Link
          href="?view=profile"
          className={`px-8 py-4 ${isActive("profile")}`}
        >
          Profile
        </Link>
        <Link
          href="?view=rides-completed"
          className={`px-8 py-4 ${isActive("rides-completed")}`}
        >
          Rides Completed
        </Link>
        <Link
          href="?view=rides-requests"
          className={`px-8 py-4 ${isActive("rides-requests")}`}
        >
          Rides Requests
        </Link>
        <Link
          href="?view=change-password"
          className={`px-8 py-4 ${isActive("change-password")}`}
        >
          Change Password
        </Link>
      </div>
      <div className="shadow-md mx-auto w-full max-w-[60rem] rounded-lg bg-white p-6 md:w-[95%]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
