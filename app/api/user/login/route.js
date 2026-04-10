import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if password is hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
    const isHashed = user.password.startsWith('$2');
    let isPasswordValid = false;

    if (isHashed) {
      // Compare with bcrypt for hashed passwords
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Direct comparison for legacy plain text passwords
      isPasswordValid = user.password === password;
      
      // Optionally: Hash the password for this user going forward
      if (isPasswordValid) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      }
    }

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const cookie = await cookies();
    cookie.set('user', JSON.stringify({ 
      _id: user._id.toString(),
      name: user.name, 
      email: user.email,
      role: user.role, 
      verified: user.verified
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({
      message: "Login successful",
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
