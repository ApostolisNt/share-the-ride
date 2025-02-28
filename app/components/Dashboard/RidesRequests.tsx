"use client";

import PopupModal from "@components/PopupModal/PopupModal";
import {
  BookingStatusEnum,
  ModalType,
  RideId,
  RideStatusEnum,
  RideWithBookings,
  UserId,
} from "app/types/types";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { BOOKING_STATUS, MODAL_TYPE, RIDE_STATUS } from "app/consts/general";
import { Image } from "@components/Global/Image";
import profileDefault from "@assets/profile-default.png";

type RidesRequestsProps = {
  activeRides: RideWithBookings[] | undefined;
};

const RidesRequests = ({ activeRides }: RidesRequestsProps) => {
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
        clientUserId: clientId,
        status: bookStatus,
      });
      showPopup(`Booking ${bookStatus}!`, "success");
    } catch (error) {
      console.error("Error in handleBooking:", error);
      showPopup(
        "An error occurred while updating the booking status",
        MODAL_TYPE.ERROR,
      );
    }
  };

  const handleUpdateRideStatus = async (
    rideId: RideId,
    newStatus: RideStatusEnum,
  ) => {
    try {
      await updateRideStatusMutation({ rideId, status: newStatus });
      showPopup(`Ride status updated to ${newStatus}`, "success");
    } catch (error) {
      console.error("Error in handleUpdateRideStatus:", error);
      showPopup(
        "An error occurred while updating the ride status",
        MODAL_TYPE.ERROR,
      );
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

      {activeRides.length > 0 ? (
        activeRides.map((item: RideWithBookings) => (
          <div
            key={item.ride.rideId}
            className="shadow-md mb-6 rounded-lg border p-4"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  <span className="uppercase">{item.ride.from}</span> -{" "}
                  <span className="uppercase">{item.ride.to}</span>
                </h3>
                <p className="font-semibold">
                  Available Seats:{" "}
                  <span
                    className={availableSeatsClass(item.ride.availableSeats)}
                  >
                    {item.ride.availableSeats > 0
                      ? item.ride.availableSeats
                      : "Congrats! No seats available"}
                  </span>
                </p>
                <p className="font-semibold">
                  Ride Status:{" "}
                  <span className="uppercase text-green-500">
                    {item.ride.status}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 sm:flex-col sm:items-start">
                <button
                  onClick={() =>
                    handleUpdateRideStatus(
                      item.ride.rideId,
                      RIDE_STATUS.COMPLETED,
                    )
                  }
                  className="w-full rounded border border-green-500 bg-transparent px-2 py-1 text-sm text-green-500 transition-colors duration-200 hover:bg-green-500 hover:text-white sm:w-auto"
                >
                  Complete Ride
                </button>
                <button
                  onClick={() =>
                    handleUpdateRideStatus(
                      item.ride.rideId,
                      RIDE_STATUS.INACTIVE,
                    )
                  }
                  className="w-full rounded border border-red-500 bg-transparent px-2 py-1 text-sm text-red-500 transition-colors duration-200 hover:bg-red-500 hover:text-white sm:w-auto"
                >
                  Close Ride
                </button>
              </div>
            </div>

            <h4 className="mt-2 font-medium">Bookings:</h4>
            {item.bookings && item.bookings.length > 0 ? (
              <ul className="space-y-4">
                {item.bookings.map((booking) => (
                  <div
                    key={booking.userId}
                    className={`mb-2 flex flex-col items-center justify-between gap-2 border-b pb-2 sm:flex-row ${
                      booking.status === BOOKING_STATUS.REJECTED ||
                      booking.status === BOOKING_STATUS.ACCEPTED
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <div className="my-2 flex flex-row gap-2 text-left">
                      <Image
                        src={booking.profileImage ?? profileDefault}
                        width={40}
                        height={40}
                        alt="Driver profile"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-base">
                          Client Name: {booking.userName}
                        </p>
                        <p className="text-base">Email: {booking.userEmail}</p>
                        <p
                          className={`text-${
                            booking.status === BOOKING_STATUS.ACCEPTED
                              ? "green"
                              : booking.status === BOOKING_STATUS.REJECTED
                                ? "red"
                                : "yellow"
                          }-500 text-sm capitalize`}
                        >
                          Status: {booking.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {booking.status === BOOKING_STATUS.PENDING ? (
                        <>
                          <button
                            onClick={() =>
                              handleBooking(
                                item.ride.rideId,
                                booking.userId,
                                BOOKING_STATUS.ACCEPTED,
                              )
                            }
                            className="rounded border border-green-500 bg-transparent px-2 py-1 text-sm text-green-500 hover:bg-green-500 hover:text-white"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleBooking(
                                item.ride.rideId,
                                booking.userId,
                                BOOKING_STATUS.REJECTED,
                              )
                            }
                            className="rounded border border-red-500 bg-transparent px-2 py-1 text-sm text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          disabled
                          className={`cursor-not-allowed rounded border px-2 py-1 text-sm capitalize ${
                            booking.status === BOOKING_STATUS.ACCEPTED
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {booking.status === BOOKING_STATUS.ACCEPTED
                            ? BOOKING_STATUS.ACCEPTED
                            : BOOKING_STATUS.REJECTED}
                        </button>
                      )}
                    </div>
                  </div>
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
