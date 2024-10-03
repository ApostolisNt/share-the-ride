import PopupModal from "@components/PopupModal/PopupModal";
import { useState } from "react";

type BookNowButtonProps = {
  rideId: string;
  clientId: string;
  onBookingSuccess: () => void;
};

const BookNowButton = ({
  rideId,
  clientId,
  onBookingSuccess,
}: BookNowButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error" | "info">(
    "info",
  );

  const handleBooking = async () => {
    setLoading(true);
    setError(null);

    const bookingInfo = {
      rideId,
      clientId,
    };

    try {
      const res = await fetch(`/api/rides/bookRide`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingInfo),
      });

      const resData = await res.json();

      if (resData.message === "Client already booked this ride") {
        setModalType("error");
        setModalMessage("You have already booked this ride!");
        setShowModal(true);
        return;
      }

      if (resData.message === "Ride fully booked") {
        setModalType("error");
        setModalMessage("Ride fully booked!");
        setShowModal(true);
        return;
      }

      setModalType("success");
      setModalMessage("Booking successful!");
      setShowModal(true);
      onBookingSuccess();
    } catch (error: any) {
      setModalType("error");
      setModalMessage("Failed to book the ride.");
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
