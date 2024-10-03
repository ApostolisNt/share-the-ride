"use client";

import PopupModal from "@components/PopupModal/PopupModal";
import { Ride } from "data/schemas/rides";
import { useEffect, useState } from "react";
import { z } from "zod";

export const bookingStatusEnum = z.enum(["pending", "accepted", "rejected"]);
export const rideStatusEnum = z.enum(["active", "inactive", "completed"]);
export type bookingStatusEnum = z.infer<typeof bookingStatusEnum>;
export type rideStatusEnum = z.infer<typeof rideStatusEnum>;

const RidesRequests = () => {
  const [pendingRides, setPendingRides] = useState<Ride[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "info",
  );

  useEffect(() => {
    const fetchActiveRides = async () => {
      const res = await fetch(
        `http://localhost:3000/api/rides/rideStatus/active`,
      );
      const data = await res.json();
      setPendingRides(data.rides || []);
    };

    fetchActiveRides();
  }, []);

  const showPopup = (message: string, type: "success" | "error" | "info") => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const acceptBooking = async (
    rideId: string,
    clientId: string,
    bookStatus: bookingStatusEnum,
  ): Promise<void> => {
    const res = await fetch(`/api/rides/bookingStatus/${bookStatus}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rideId, clientId }),
    });

    const data = await res.json();
    if (res.status === 200) {
      showPopup(`Booking ${bookStatus}!`, "success");
      const updatedRes = await fetch(`/api/rides/rideStatus/active`);
      const updatedData = await updatedRes.json();
      setPendingRides(updatedData.rides || []);
    } else {
      showPopup(`Error: ${data.message}`, "error");
    }
  };

  const updateRideStatus = async (
    rideId: string,
    newStatus: rideStatusEnum,
  ) => {
    const res = await fetch(`/api/rides/rideStatus/${newStatus}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rideId }),
    });

    if (res.status === 200) {
      showPopup(`Ride status updated to ${newStatus}`, "success");
      const updatedRes = await fetch(`/api/rides/rideStatus/active`);
      const updatedData = await updatedRes.json();
      setPendingRides(updatedData.rides || []);
    } else {
      const data = await res.json();
      showPopup(`Error: ${data.message}`, "error");
    }
  };

  const availableSeatsClass = (availableSeats: number) => {
    return availableSeats >= 1 && availableSeats <= 2
      ? "text-yellow-500"
      : "text-green-500";
  };
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
      {pendingRides.length > 0 ? (
        pendingRides.map((ride) => (
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
                      : "Gongrats! No seats available"}
                  </span>
                </p>
                <p className="font-semibold">
                  Ride Status: {""}
                  <span className="uppercase text-green-500">
                    {ride.rideStatus}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => updateRideStatus(ride._id, "completed")}
                  className="rounded border border-green-500 bg-transparent px-4 py-1 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  Complete Ride
                </button>

                <button
                  onClick={() => updateRideStatus(ride._id, "inactive")}
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
                        className={`text-${booking.status === "accepted" ? "green" : booking.status === "rejected" ? "red" : "yellow"}-500`}
                      >
                        Status: {booking.status}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {booking.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              acceptBooking(
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
                              acceptBooking(
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
