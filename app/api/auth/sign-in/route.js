import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectMongoDB from "app/lib/mongodb";
import Users from "app/models/users";

export async function POST(request) {
  await connectMongoDB();
  console.log("MongoDB connected for sign-in");

  try {
    const { email, password } = await request.json();

    // Check if all required fields are present
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find the user by email
    const user = await Users.findOne({ "contact.email": email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Compare provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Sign-in successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.contact.email,
          userStatus: user.userStatus,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
