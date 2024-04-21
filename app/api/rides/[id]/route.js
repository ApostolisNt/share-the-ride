import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongoDB from "../../../lib/mongodb";
import Rides from "../../../models/rides";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id } = params;
    await connectMongoDB();
    const ride = await Rides.findOne({ _id: new ObjectId(id) });
    if (ride) {
      return NextResponse.json({ ride }, { status: 200 });
    }
    return NextResponse.json({ message: "Ride not found" }, { status: 404 });
  } catch (error) {
    console.error("Error accessing the database:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
