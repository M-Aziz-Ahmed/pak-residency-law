import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/models/User";

async function GET() {
    try {
        const cookie = await cookies()
        const currentuser = JSON.parse(cookie.get('user')?.value || 'null')

        if (!currentuser) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        }

        // Fetch full user data from database to get profilePic
        await connectDB()
        const user = await User.findById(currentuser._id).select('-password')

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePic: user.profilePic,
                verified: user.verified,
                cnicFront: user.cnicFront,
                cnicBack: user.cnicBack,
                licenceFront: user.licenceFront,
                licenceBack: user.licenceBack
            }
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export { GET }
