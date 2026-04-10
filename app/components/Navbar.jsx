'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useMe from "../hooks/me";
import { useEffect, useState } from "react";

const Navbar = () => {
    const links = [
        { name: 'Home', link: '/portfollio' },
        { name: 'AI-Chat', link: '/portfollio/AiChat' },
        { name: 'Scan Deed', link: '/portfollio/ScanDeed' },
        { name: 'Law Search', link: '/portfollio/Law-search' },
        { name: 'Land Advisors', link: '/portfollio/Lawyers' },
    ]
    const { user, loading } = useMe()
    const [isExpanded, setIsExpanded] = useState(false)
    const path = usePathname()
    const router = useRouter()

    const handleLogOut = async () => {
        await fetch('/api/user/logout', { method: 'GET' })
        router.push('/login')
    }
    useEffect(() => {
        if (!loading && user === null) {
            router.push('/login')
        }
    }, [user, loading])


    if (user?.role === 'citizen') {
        return (
            <>
                <div className="flex justify-around items-center bg-white text-gray-400 py-7">
                    <div className="flex gap-2">
                        <div className="logo rotate-7"><img src="/navlogo.png" alt="Logo" /></div>
                        <div className="text-2xl font-extrabold text-green-700">PakResidencyLaw</div>
                    </div>
                    <div className="flex gap-15 items-center">
                        <div className="links flex">
                            {links.map((l) => (
                                <div key={l.name}>
                                    <Link href={l.link} className={`p-2 text-xl font-semibold ${path === l.link ? 'text-green-700 border-b-2' : ''}`}>{l.name}</Link>
                                </div>
                            ))}
                        </div>
                        <div className="">
                            {user ?
                                <>
                                    <div className="">
                                        <button
                                            type="button"
                                            className=" border-3 bg-green-200 rounded-full"
                                            onClick={() => setIsExpanded(prev => !prev)}
                                        >
                                            <img
                                                className="w-12 h-12 rounded-full"
                                                src={user.profilePic}
                                                alt={user.name?.charAt(0).toUpperCase()}
                                            />
                                        </button>
                                        {/* Dropdown menu */}
                                        {isExpanded &&
                                            <div
                                                className="absolute z-50 bg-green-200 rounded text-gray-800 shadow-lg w-50 mt-3"
                                                id="user-dropdown"
                                            >
                                                <div className="px-4 py-3 text-sm border-b border-default">
                                                    <span className="block text-heading font-medium">{user.name}</span>
                                                    <span className="block text-body truncate">{user.email}</span>
                                                </div>
                                                <ul
                                                    className="p-2 text-sm text-body font-medium"
                                                    aria-labelledby="user-menu-button"
                                                >
                                                    <li>
                                                        <Link
                                                            href={user.role}
                                                            className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                    {user.role === 'lawyer' ?
                                                        <>
                                                            <li>
                                                                <Link
                                                                    href="#"
                                                                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                                >
                                                                    Earnings
                                                                </Link>

                                                            </li>
                                                            <li>
                                                                <Link
                                                                    href={`${user.role}/profile`}
                                                                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                                >
                                                                    Profile
                                                                </Link>
                                                            </li>
                                                        </> : <li>
                                                            <Link
                                                                href={`${user.role}/profile`}
                                                                className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                            >
                                                                Profile
                                                            </Link>
                                                        </li>}
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                                                        >
                                                            Settings
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded cursor-pointer" onClick={handleLogOut}>Logout</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    </div>

                                </> :
                                <>
                                    <Link href="/login">
                                        <button className="bg-green-700 p-2 rounded-full text-xl font-semibold text-white px-10 ">Portal Login</button>
                                    </Link >
                                </>
                            }

                        </div>
                    </div>
                </div>
            </>
        );
    }
    if (user?.role === 'lawyer') {
        return (
            <>
            </>
        );
    }

}

export default Navbar;