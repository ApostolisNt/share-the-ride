import { NextResponse } from "next/server";
import connectMongoDB from "./../../lib/mongodb";
import Topic from './../../models/topic';

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic created" }, { status: 201 });
}
