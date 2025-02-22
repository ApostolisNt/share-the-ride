// RidesRequests.tsx
"use client";

import PopupModal from "@components/PopupModal/PopupModal";
import {
  BookingStatusEnum,
  ModalType,
  Ride,
  RideId,
  RideStatusEnum,
  UserId,
} from "app/types/types";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";

const RidesRequests = () => {
  // Use the query that returns active rides with their bookings.
  const activeRides = useQuery(api.rides.getActiveRidesWithBookings);
  const updateRideStatusMutation = useMutation(api.rides.updateRideStatus);
  const updateBookingStatusMutation = useMutation(
    api.bookings.updateBookingStatus,
  );

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<ModalType>("info");

  const showPopup = (message: string, type: ModalType) => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const handleBooking = async (
    rideId: RideId,
    clientId: UserId,
    bookStatus: BookingStatusEnum,
  ) => {
    try {
      await updateBookingStatusMutation({
        rideId,
        clientId,
        status: bookStatus,
      });
      showPopup(`Booking ${bookStatus}!`, "success");
    } catch (e: any) {
      showPopup(`Error: ${e.message}`, "error");
    }
  };

  const handleUpdateRideStatus = async (
    rideId: RideId,
    newStatus: RideStatusEnum,
  ) => {
    try {
      await updateRideStatusMutation({ rideId, status: newStatus });
      showPopup(`Ride status updated to ${newStatus}`, "success");
    } catch (e: any) {
      showPopup(`Error: ${e.message}`, "error");
    }
  };

  const availableSeatsClass = (availableSeats: number) =>
    availableSeats >= 1 && availableSeats <= 2
      ? "text-yellow-500"
      : "text-green-500";

  if (activeRides === undefined) {
    return <p>Loading ride requests...</p>;
  }

  return (
    <>
      {showModal && (
        <PopupModal
          message={modalMessage}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}

      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Ride Requests
      </h2>
      {activeRides.length > 0 ? (
        activeRides.map((ride: Ride) => (
          <div key={ride._id} className="shadow-md mb-6 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  <span className="uppercase">{ride.from}</span> -{" "}
                  <span className="uppercase">{ride.to}</span>
                </h3>
                <p className="font-semibold">
                  Available Seats:{" "}
                  <span className={availableSeatsClass(ride.availableSeats)}>
                    {ride.availableSeats > 0
                      ? ride.availableSeats
                      : "Congrats! No seats available"}
                  </span>
                </p>
                <p className="font-semibold">
                  Ride Status:{" "}
                  <span className="uppercase text-green-500">
                    {ride.status}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handleUpdateRideStatus(ride._id, "completed")}
                  className="rounded border border-green-500 bg-transparent px-4 py-1 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  Complete Ride
                </button>
                <button
                  onClick={() => handleUpdateRideStatus(ride._id, "inactive")}
                  className="rounded border border-red-500 bg-transparent px-4 py-1 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Close Ride
                </button>
              </div>
            </div>

            <h4 className="mt-2 font-medium">Bookings:</h4>
            {ride.bookings && ride.bookings.length > 0 ? (
              <ul className="space-y-4">
                {ride.bookings.map((booking) => (
                  <li
                    key={booking.clientId}
                    className={`mb-2 flex items-center justify-between border-b pb-2 ${
                      booking.status === "rejected" ||
                      booking.status === "accepted"
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <div className="text-left">
                      <p>Client Name: {booking.userName}</p>
                      <p>Email: {booking.userEmail}</p>
                      <p
                        className={`text-${
                          booking.status === "accepted"
                            ? "green"
                            : booking.status === "rejected"
                              ? "red"
                              : "yellow"
                        }-500`}
                      >
                        Status: {booking.status}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {booking.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleBooking(
                                ride._id,
                                booking.clientId,
                                "accepted",
                              )
                            }
                            className="rounded border border-green-500 bg-transparent px-4 py-1 text-green-500 hover:bg-green-500 hover:text-white"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleBooking(
                                ride._id,
                                booking.clientId,
                                "rejected",
                              )
                            }
                            className="rounded border border-red-500 bg-transparent px-4 py-1 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          disabled
                          className="cursor-not-allowed rounded border border-gray-500 bg-gray-300 px-4 py-1 text-gray-700"
                        >
                          {booking.status === "accepted"
                            ? "Accepted"
                            : "Rejected"}
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pt-2">No bookings for this ride yet</p>
            )}
          </div>
        ))
      ) : (
        <p>No pending ride requests</p>
      )}
    </>
  );
};

export default RidesRequests;
