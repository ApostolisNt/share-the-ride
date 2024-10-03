import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongoDB from "./../../lib/mongodb";
import Rides from "./../../models/rides";

// Create a new ride
export async function POST(request) {
  try {
    const {
      rideOwnerId,
      from,
      to,
      date,
      time,
      ridePrice,
      rideStatus,
      availableSeats,
      description,
    } = await request.json();

    // Ensure MongoDB connection
    await connectMongoDB();

    // Create new ride entry
    const newRide = await Rides.create({
      rideOwnerId,
      from,
      to,
      date,
      time,
      ridePrice,
      rideStatus,
      availableSeats,
      description,
    });

    // Send success response
    return NextResponse.json(
      { message: "Ride created", ride: newRide },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating ride:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}

// Fetch all rides
export async function GET() {
  try {
    await connectMongoDB();
    const rides = await Rides.find();
    return NextResponse.json({ rides }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Message: error }, { status: 500 });
  }
}
