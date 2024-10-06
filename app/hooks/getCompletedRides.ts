import { Ride } from "data/schemas/rides";

export const getCompletedRides = async (): Promise<Ride[]> => {
  const res = await fetch(
    "http://localhost:3000/api/rides/rideStatus/completed",
  );

  if (!res.ok) {
    console.log("Failed to load completed rides");
    return [];
  }

  const data = await res.json();
  return data.rides || [];
};
