'use client'
import Navbar from "../components/Navbar";
import useMe from "../hooks/me";
import Link from "next/link";

export default function Page() {
    const { user, loading } = useMe()

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading dashboard...</p>
                    </div>
                </div>
            </>
        )
    }

    const citizenStats = [
        { label: "Active Cases", value: "3", icon: "📋", color: "from-blue-500 to-blue-600" },
        { label: "Documents Scanned", value: "12", icon: "📄", color: "from-green-500 to-green-600" },
        { label: "AI Consultations", value: "8", icon: "💬", color: "from-purple-500 to-purple-600" },
        { label: "Lawyer Consultations", value: "2", icon: "⚖️", color: "from-orange-500 to-orange-600" },
    ];

    const lawyerStats = [
        { label: "Active Cases", value: "15", icon: "📋", color: "from-blue-500 to-blue-600" },
        { label: "Completed Cases", value: "48", icon: "✅", color: "from-green-500 to-green-600" },
        { label: "Client Reviews", value: "4.8", icon: "⭐", color: "from-yellow-500 to-yellow-600" },
        { label: "Earnings", value: "PKR 250K", icon: "💰", color: "from-purple-500 to-purple-600" },
    ];

    const quickActions = user?.role === 'citizen' ? [
        { title: "Ask AI", description: "Get instant legal advice", link: "/portfollio/AiChat", icon: "🤖" },
        { title: "Scan Document", description: "Analyze property papers", link: "/portfollio/ScanDeed", icon: "📄" },
        { title: "Search Laws", description: "Browse legal database", link: "/portfollio/Law-search", icon: "📚" },
        { title: "Find Lawyer", description: "Connect with experts", link: "/portfollio/Lawyers", icon: "👨‍⚖️" },
    ] : [
        { title: "View Cases", description: "Manage active cases", link: "#", icon: "📋" },
        { title: "Client Messages", description: "Respond to inquiries", link: "#", icon: "💬" },
        { title: "Documents", description: "Review submissions", link: "#", icon: "📄" },
        { title: "Earnings", description: "View financial reports", link: "#", icon: "💰" },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">
                                    Welcome back, {user?.name}! 👋
                                </h1>
                                <p className="text-green-100">
                                    {user?.role === 'citizen' 
                                        ? 'Manage your property legal matters from your dashboard' 
                                        : 'Manage your cases and clients efficiently'}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    {user?.profilePic ? (
                                        <img src={user.profilePic} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <span className="text-4xl">{user?.role === 'citizen' ? '👤' : '⚖️'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {(user?.role === 'citizen' ? citizenStats : lawyerStats).map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl shadow-lg`}>
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {quickActions.map((action, index) => (
                                <Link key={index} href={action.link}>
                                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                            {action.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{action.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {item}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">Activity Title {item}</p>
                                        <p className="text-sm text-gray-600">Description of the activity</p>
                                    </div>
                                    <span className="text-sm text-gray-500">2 hours ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
