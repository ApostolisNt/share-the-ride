import PopupModal from "@components/PopupModal/PopupModal";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { RideId, UserId } from "app/types/types";

type BookNowButtonProps = {
  rideId: RideId;
  clientId: UserId;
  onBookingSuccess: () => void;
};

const BookNowButton = ({
  rideId,
  clientId,
  onBookingSuccess,
}: BookNowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "info",
  );

  const bookRideMutation = useMutation(api.bookings.bookRide);

  const handleBooking = async () => {
    setLoading(true);

    try {
      await bookRideMutation({ rideId, clientUserId: clientId });

      setModalType("success");
      setModalMessage("Booking successful!");
      setShowModal(true);
      onBookingSuccess();
    } catch (error: any) {
      if (error.message === "Client already booked this ride") {
        setModalType("error");
        setModalMessage("You have already booked this ride!");
      } else if (error.message === "Ride fully booked") {
        setModalType("error");
        setModalMessage("Ride fully booked!");
      } else {
        setModalType("error");
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
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </div>
    </>
  );
};

export default BookNowButton;
