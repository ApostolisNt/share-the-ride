import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import connectMongoDB from "../../../lib/mongodb";
import Users from "../../../models/users";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { id } = params;
    await connectMongoDB();
    const user = await Users.findOne({ _id: new ObjectId(id) });
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  } catch (error) {
    console.error("Error accessing the database:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
