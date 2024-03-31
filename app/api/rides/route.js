import { NextResponse } from "next/server";
import connectMongoDB from "./../../lib/mongodb";
import Rides from "./../../models/rides";

export async function POST(request) {
  const { id, from, to, date, time, ridePrice, availableSeats, description } =
    await request.json();
  await connectMongoDB();
  await Rides.create({
    id,
    from,
    to,
    date,
    time,
    ridePrice,
    availableSeats,
    description,
  });
  return NextResponse.json({ message: "Rides created" }, { status: 201 });
}

export async function GET() {
  try {
    await connectMongoDB();
    const rides = await Rides.find();
    return NextResponse.json({ rides }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Message: error }, { status: 500 });
  }
}
