import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongoDB from "../../../../lib/mongodb";
import Rides from "../../../../models/rides";
import Users from "../../../../models/users";

export async function GET(req, { params }) {
  const { rideStatus } = params;

  try {
    await connectMongoDB();

    const rides = await Rides.find({ rideStatus: rideStatus });

    if (!rides) {
      return NextResponse.json({ message: "No rides found" }, { status: 404 });
    }

    let enhancedRides;

    if (rideStatus === "active" || rideStatus === "completed") {
      enhancedRides = await Promise.all(
        rides.map(async (ride) => {
          const bookingsWithUserInfo = await Promise.all(
            ride.bookings.map(async (booking) => {
              const user = await Users.findOne({ _id: booking.clientId });

              return {
                clientId: booking.clientId,
                status: booking.status,
                bookingDate: booking.bookingDate,
                userName: user ? user.name : "Unknown",
                userEmail: user ? user.contact.email : "Unknown",
              };
            }),
          );
          return { ...ride._doc, bookings: bookingsWithUserInfo };
        }),
      );
    }

    return NextResponse.json({ rides: enhancedRides }, { status: 200 });
  } catch (error) {
    console.error("Error fetching rides with status:", rideStatus, error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  const { rideStatus } = params;
  const { rideId } = await request.json();

  try {
    await connectMongoDB();

    const rideObjectId = new ObjectId(rideId);

    // Find and update the ride's status
    const updatedRide = await Rides.findOneAndUpdate(
      { _id: rideObjectId },
      { $set: { rideStatus: rideStatus } },
      { new: true },
    );

    if (!updatedRide) {
      return NextResponse.json({ message: "Ride not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Ride status updated to ${rideStatus}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating ride status:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
