import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongoDB from "./../../../lib/mongodb";
import Rides from "./../../../models/rides";

// Book a ride
export async function PATCH(request) {
  const { rideId, clientId } = await request.json();

  await connectMongoDB();

  try {
    const rideObjectId = new ObjectId(rideId);
    const ride = await Rides.findOne({ _id: rideObjectId });

    if (!ride) {
      return NextResponse.json({ message: "Ride not found" }, { status: 404 });
    }

    if (ride.bookings.length >= ride.availableSeats + 2) {
      return NextResponse.json(
        { message: "Ride fully booked" },
        { status: 400 },
      );
    }

    // Check if the client has already booked the ride
    const existingBooking = ride.bookings.find((b) => b.clientId === clientId);

    if (existingBooking) {
      return NextResponse.json(
        { message: "Client already booked this ride" },
        { status: 400 },
      );
    }

    // Add the new booking to the bookings array
    ride.bookings.push({
      clientId,
      status: "pending",
      bookingDate: new Date().toISOString(),
    });

    await ride.save();

    return NextResponse.json(
      { message: "Booking successful" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating booking", error: error.message },
      { status: 500 },
    );
  }
}
