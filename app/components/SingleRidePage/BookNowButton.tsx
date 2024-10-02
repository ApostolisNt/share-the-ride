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

      if (!res.ok) {
        throw new Error("Failed to book the ride.");
      }

      const resData = await res.json();

      if (resData.message === "Ride already booked") {
        setError("Ride already booked");
      }

      if (resData.message === "Ride fully booked") {
        setError("Ride fully booked");
      }

      onBookingSuccess();
    } catch (error: any) {
      setError("Failed to book the ride.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-1">
      <button
        onClick={handleBooking}
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BookNowButton;
