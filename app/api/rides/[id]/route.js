import connectMongoDB from "app/lib/mongodb";
import { NextResponse } from "next/server";
import Rides from './../../../models/rides';
const { ObjectId } = require("mongodb");

export async function POST(Request) {
  try {
    const { id } = Request.query;
    const objectId = new ObjectId(id);
    await connectMongoDB();
    const ride = await Rides.findOne(id);
    return NextResponse.json({ ride }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Message: error }, { status: 500 });
  }
}
