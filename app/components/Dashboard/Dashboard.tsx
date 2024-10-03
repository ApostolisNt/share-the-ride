"use client";
import { useState } from "react";
import Profile from "./Profile";
import RidesRequests from "./RidesRequests";
import RidesCompleted from "./RidesCompleted";

type DashboardProps = {
  id: string;
};

// Ride Request check id to match rideOwnerId
const Dashboard = ({ id }: DashboardProps) => {
  const ChangePasswordComponent = () => <div>Change Password View</div>;

  const [currentView, setCurrentView] = useState("profile");

  const navigateTo = (view: string) => {
    setCurrentView(view);
  };

  const renderComponent = () => {
    switch (currentView) {
      case "profile":
        return <Profile id={id} />;
      case "rides-completed":
        return <RidesCompleted />;
      case "rides-requests":
        return <RidesRequests />;
      case "change-password":
        return <ChangePasswordComponent />;
      default:
        return <Profile id={id} />;
    }
  };

  const isActive = (view: string) => {
    return currentView === view ? "border-b-2 border-solid border-black" : "";
  };

  return (
    <div className="my-12 flex w-full flex-col items-center">
      Dashboard {id}
      <div className="dashboard-list mx-auto my-8 flex w-3/5 flex-wrap justify-evenly gap-4">
        <button
          onClick={() => navigateTo("profile")}
          className={`px-8 py-4 ${isActive("profile")}`}
        >
          Profile
        </button>
        <button
          onClick={() => navigateTo("rides-completed")}
          className={`px-8 py-4 ${isActive("rides-completed")}`}
        >
          Rides Completed
        </button>
        <button
          onClick={() => navigateTo("rides-requests")}
          className={`px-8 py-4 ${isActive("rides-requests")}`}
        >
          Rides Requests
        </button>
        <button
          onClick={() => navigateTo("change-password")}
          className={`px-8 py-4 ${isActive("change-password")}`}
        >
          Change Password
        </button>
      </div>
      <div className="shadow-md mx-auto w-full max-w-[60rem] rounded-lg bg-white p-6 md:w-[95%]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
