import PopupModal from "@components/popup-modal/popup-modal";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { ModalType, RideId, UserId } from "app/types/types";
import { MODAL_TYPE } from "app/consts/general";

type BookNowButtonProps = {
  rideId: RideId;
  passengerId: UserId;
};

const BookNowButton = ({ rideId, passengerId }: BookNowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<ModalType>(MODAL_TYPE.INFO);

  const bookRideMutation = useMutation(api.bookings.bookRide);

  const handleBooking = async () => {
    setLoading(true);

    try {
      await bookRideMutation({ rideId, passengerUserId: passengerId });

      setModalType(MODAL_TYPE.SUCCESS);
      setModalMessage("Booking successful!");
      setShowModal(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes("User not authenticated")) {
        setModalType(MODAL_TYPE.ERROR);
        setModalMessage("You need to be logged in to book a ride.");
      } else if (error.message.includes("Passenger already booked this ride")) {
        setModalType(MODAL_TYPE.ERROR);
        setModalMessage("You have already booked this ride!");
      } else if (error.message.includes("Ride fully booked")) {
        setModalType(MODAL_TYPE.ERROR);
        setModalMessage("Ride fully booked!");
      } else {
        setModalType(MODAL_TYPE.ERROR);
        setModalMessage("Failed to book the ride.");
      }
      setShowModal(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
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
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <button
          onClick={handleBooking}
          disabled={loading}
          className={`mt-4 rounded px-4 py-2 font-semibold transition-colors duration-300 ease-in-out 
    ${loading ? "cursor-not-allowed bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} 
    text-white`}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </>
  );
};

export default BookNowButton;
