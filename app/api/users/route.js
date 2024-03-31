import { NextResponse } from "next/server";
import connectMongoDB from "app/lib/mongodb";
import Users from "./../../models/users";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await Users.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
