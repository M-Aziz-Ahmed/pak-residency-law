import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";
async function POST(req, res) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    const user = await mongoose.model("User").findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    else{
        cookies().set({
            name: "user",
            value: "some-jwt-token", // You should generate a real JWT token here
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
    })
}
    return NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
    } catch (error) {                   
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export { POST };