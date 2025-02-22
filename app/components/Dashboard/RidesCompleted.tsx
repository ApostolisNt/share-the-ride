// RidesCompleted.tsx
import { RIDE_STATUS } from "app/consts/general";
import { Booking, Ride } from "app/types/types";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";

type RideProps = {
  ride: Ride;
};

const RideWithBookings = ({ ride }: RideProps) => {
  // Fetch enriched bookings for the ride.
  const bookings = useQuery(api.bookings.getBookingByRide, {
    rideId: ride.rideId,
  });

  if (!bookings) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
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
            ride.status === RIDE_STATUS.COMPLETED
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {ride.status}
        </span>
      </div>
      <h4 className="mb-2 text-lg font-medium text-gray-700">Travel Buddies</h4>
      {bookings.length > 0 ? (
        <ul className="pl-2 font-medium text-gray-600">
          {bookings.map((booking: Booking) => (
            <li key={booking.userId} className="text-base">
              {booking.userName} - {booking.userEmail}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No bookings for this ride.</p>
      )}
    </div>
  );
};

const RidesCompleted = () => {
  const completedRides = useQuery(api.rides.getCompletedRides);

  if (completedRides === undefined) {
    return <p>Loading completed rides...</p>;
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
        {completedRides.map((ride: Ride) => (
          <RideWithBookings key={ride.rideId} ride={ride} />
        ))}
      </div>
    </>
  );
};

export default RidesCompleted;
