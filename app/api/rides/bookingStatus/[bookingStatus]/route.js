import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongoDB from "../../../../lib/mongodb";
import Rides from "../../../../models/rides";

// Handle booking status update
export async function PATCH(request, { params }) {
  const { bookingStatus } = params;
  const { rideId, clientId } = await request.json();

  try {
    await connectMongoDB();
    const rideObjectId = new ObjectId(rideId);

    // Find the ride by rideId
    const ride = await Rides.findOne({ _id: rideObjectId });

    if (!ride) {
      return NextResponse.json({ message: "Ride not found" }, { status: 404 });
    }

    // Find the booking and update the status based on bookingStatus param
    const bookingIndex = ride.bookings.findIndex(
      (b) => b.clientId === clientId && b.status === "pending",
    );

    if (bookingIndex === -1) {
      return NextResponse.json(
        { message: "Pending booking not found" },
        { status: 404 },
      );
    }

    ride.bookings[bookingIndex].status = bookingStatus;
    if (bookingStatus === "accepted") {
      ride.availableSeats -= 1;

      // If availableSeats reaches 0, reject remaining pending bookings
      if (ride.availableSeats === 0) {
        ride.bookings = ride.bookings.map((booking) => {
          if (booking.status === "pending") {
            booking.status = "rejected";
          }
          return booking;
        });
      }
    }

    const updatedRide = await ride.save();
    return NextResponse.json(
      { message: `Booking ${bookingStatus} and seat count updated` },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
