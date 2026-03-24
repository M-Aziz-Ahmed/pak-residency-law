import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import User from "@/models/User";
async function POST(req, res) {
    const { name, email, password, role, verified } = await req.json()
    try {
        await connectDB();

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({
                message: `User "${user.name}" already Exist`,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                }
            });
        }


        const newUser = User.create({
            name: name,
            email: email,
            password: password,
            role: role,
            verified: verified,
        })


        

        return NextResponse.json({
            message: "User Created successfuly",
            user: newUser,
        },{status:201}
    );


    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export { POST };