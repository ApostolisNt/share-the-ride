// app/api/auth/register/route.ts
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectMongoDB from "app/lib/mongodb";
import Users from "app/models/users";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { name, email, phone, password } = await request.json();

    // Check if all required fields are present
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if the user already exists
    const existingUser = await Users.findOne({ "contact.email": email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Users({
      name,
      contact: { email, phone },
      password: hashedPassword,
      userStatus: "client",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
