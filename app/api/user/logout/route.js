import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function GET() {
    try {
        const cookie = await cookies()
        const currentuser = JSON.parse(cookie.delete('user') || 'null')

        if (!currentuser) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        }

        return NextResponse.json({ user: currentuser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}

export { GET }
