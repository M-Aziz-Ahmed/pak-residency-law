'use client'
import Navbar from "../components/Navbar";
import useMe from "../hooks/me";

export default function Page() {
    const { user, loading } = useMe()
    if (!loading) {
        console.log(user)

    }

    return (
        <>
            <Navbar />
            {user?.role === 'citizen' && (
                <>
                    Citizen
                </>
            )}
            {user?.role === 'lawyer' && (
                <>
                    Lawyer
                </>
            )}
        </>
    );
}