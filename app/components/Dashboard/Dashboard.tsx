"use client";
import { useState } from "react";

type DashboardProps = {
  id: string;
};

const Dashboard = ({ id }: DashboardProps) => {
  const ProfileComponent = () => <div>Profile View</div>;
  const RidesComponent = () => <div>Rides Completed View</div>;
  const RideRequestsComponent = () => <div>Ride Requests View</div>;
  const ChangePasswordComponent = () => <div>Change Password View</div>;

  const [currentView, setCurrentView] = useState("profile");

  const navigateTo = (view: string) => {
    setCurrentView(view);
  };

  const renderComponent = () => {
    switch (currentView) {
      case "profile":
        return <ProfileComponent />;
      case "rides-completed":
        return <RidesComponent />;
      case "rides-requests":
        return <RideRequestsComponent />;
      case "change-password":
        return <ChangePasswordComponent />;
      default:
        return <ProfileComponent />;
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
      {renderComponent()}
    </div>
  );
};

export default Dashboard;
