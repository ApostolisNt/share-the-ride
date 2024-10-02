import { Ride } from "data/schemas/rides";
import React, { useEffect, useState } from "react";

const RidesCompleted = () => {
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompletedRides = async () => {
      try {
        const res = await fetch(`/api/rides/rideStatus/completed`);
        const data = await res.json();
        setCompletedRides(data.rides || []);
      } catch (error) {
        console.error("Error fetching completed rides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedRides();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading completed rides...</p>
    );
  }

  if (completedRides.length === 0) {
    return (
      <p className="text-center text-gray-600">No completed rides found.</p>
    );
  }

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Completed Rides
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {completedRides.map((ride) => (
          <div
            key={ride._id}
            className="shadow-lg rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-700">
                <span className="uppercase">{ride.from}</span> -{" "}
                <span className="uppercase">{ride.to}</span>
                <div>
                  <span className="text-base uppercase text-gray-600">
                    {ride.date}
                  </span>
                </div>
              </h3>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                  ride.rideStatus === "completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {ride.rideStatus}
              </span>
            </div>
            {ride.rideStatus === "completed" && (
              <>
                <h4 className="mb-2 text-lg font-medium text-gray-700">
                  Travel Buddies
                </h4>
                {ride.bookings && ride.bookings.length > 0 ? (
                  <ul className="pl-2 font-medium text-gray-600">
                    {ride.bookings.map((booking) => (
                      <li key={booking.clientId} className="text-base">
                        {booking.userName} - {booking.userEmail}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No bookings for this ride.</p>
                )}
              </>
            )}
            {ride.rideStatus === "inactive" && (
              <p className="text-gray-500">No bookings for this ride.</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RidesCompleted;
