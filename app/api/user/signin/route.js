import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req, res) {
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
            }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            verified: verified,
        })
        const cookie = await cookies()
        cookie.set('user', JSON.stringify({ 
            _id: newUser._id.toString(),
            role: role, 
            name: name, 
            email: email,
            verified: verified
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        return NextResponse.json({
            message: "User Created successfuly",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                verified: newUser.verified
            },
        }, { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}