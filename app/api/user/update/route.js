import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/models/User";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

async function PUT(request) {
    try {
        const cookie = await cookies()
        const currentuser = JSON.parse(cookie.get('user')?.value || 'null')

        console.log('Current user from cookie:', currentuser)

        if (!currentuser) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        }

        await connectDB()
        const body = await request.json()
        
        console.log('Update request body:', body)
        
        const updateData = {
            name: body.name,
            email: body.email,
        }

        if (body.profilePic) {
            updateData.profilePic = body.profilePic
        }

        // Add lawyer verification documents if provided
        if (body.cnicFront) updateData.cnicFront = body.cnicFront
        if (body.cnicBack) updateData.cnicBack = body.cnicBack
        if (body.licenceFront) updateData.licenceFront = body.licenceFront
        if (body.licenceBack) updateData.licenceBack = body.licenceBack

        // Find user by email if _id is not available in cookie
        const userId = currentuser._id || (await User.findOne({ email: currentuser.email }))?._id

        if (!userId) {
            return NextResponse.json({ message: "User not found. Please log in again." }, { status: 404 })
        }

        console.log('Updating user with ID:', userId)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password')

        console.log('Updated user:', updatedUser)

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found in database" }, { status: 404 })
        }

        // Update cookie with new user data (without profilePic to keep cookie size small)
        const cookieStore = await cookies()
        cookieStore.set('user', JSON.stringify({
            _id: updatedUser._id.toString(),
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            verified: updatedUser.verified
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        return NextResponse.json({ 
            message: "Profile updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profilePic: updatedUser.profilePic,
                verified: updatedUser.verified
            }
        }, { status: 200 })
    } catch (error) {
        console.error('Update profile error:', error)
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export { PUT }
