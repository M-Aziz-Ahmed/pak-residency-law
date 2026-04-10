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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isExpanded && !event.target.closest('#user-menu')) {
                setIsExpanded(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isExpanded])

    if (user?.role === 'citizen') {
        return (
            <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Logo Section */}
                        <Link href="/portfollio" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                                <img src="/navlogo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                PakResidencyLaw
                            </span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {links.map((l) => (
                                <Link
                                    key={l.name}
                                    href={l.link}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                        path === l.link
                                            ? 'text-green-600 bg-green-50'
                                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                >
                                    {l.name}
                                </Link>
                            ))}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center">
                            {user ? (
                                <div className="relative" id="user-menu">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(prev => !prev)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                                    >
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.role}</p>
                                        </div>
                                        <div className="relative">
                                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white group-hover:ring-green-100 transition-all">
                                                {user.profilePic ? (
                                                    <img
                                                        src={user.profilePic}
                                                        alt={user.name}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    user.name?.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isExpanded && (
                                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                                            {/* User Info Header */}
                                            <div className="px-4 py-4 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                                                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                                <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-green-700 bg-green-200 rounded-full">
                                                    {user.role}
                                                </span>
                                            </div>

                                            {/* Menu Items */}
                                            <ul className="py-2">
                                                <li>
                                                    <Link
                                                        href={`/${user.role}`}
                                                        onClick={() => setIsExpanded(false)}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                        </svg>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`/${user.role}/profile`}
                                                        onClick={() => setIsExpanded(false)}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        Profile
                                                    </Link>
                                                </li>
                                                {user.role === 'lawyer' && (
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            onClick={() => setIsExpanded(false)}
                                                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Earnings
                                                        </Link>
                                                    </li>
                                                )}
                                                <li>
                                                    <Link
                                                        href="#"
                                                        onClick={() => setIsExpanded(false)}
                                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        Settings
                                                    </Link>
                                                </li>
                                                <li className="border-t border-gray-100 mt-2 pt-2">
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login">
                                    <button className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                                        Portal Login
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    if (user?.role === 'lawyer') {
        return (
            <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/portfollio" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2 shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                                <img src="/navlogo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                                PakResidencyLaw
                            </span>
                        </Link>
                        <div className="text-lg font-semibold text-gray-700">Lawyer Portal</div>
                    </div>
                </div>
            </nav>
        );
    }

    return null;
}

export default Navbar;
