import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  console.log("Login route hit");
  try {
    console.log("Connecting to DB...");
    await connectDB();
    
    console.log("Parsing request body...");
    const { email, password } = await req.json();
    console.log("Email:", email);

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    console.log("Finding user...");
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log("User found, checking password...");
    // Check if password is hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
    const isHashed = user.password && user.password.startsWith('$2');
    let isPasswordValid = false;

    if (isHashed) {
      console.log("Comparing hashed password...");
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      console.log("Comparing plain text password...");
      isPasswordValid = user.password === password;
      
      // Optionally: Hash the password for this user going forward
      if (isPasswordValid) {
        console.log("Upgrading to hashed password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      }
    }

    if (!isPasswordValid) {
      console.log("Invalid password");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    console.log("Setting cookie...");
    const cookie = await cookies();
    cookie.set('user', JSON.stringify({ 
      _id: user._id.toString(),
      name: user.name, 
      email: user.email,
      role: user.role, 
      verified: user.verified
    }));

    console.log("Login successful");
    return NextResponse.json({
      message: "Login successful",
    }, { status: 200 });

  } catch (error) {
    console.error("Login error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
