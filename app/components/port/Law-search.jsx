'use client'
import { useState } from "react";

export default function LawSearch() {
    const [searchQuery, setSearchQuery] = useState("");

    const lawCategories = [
        {
            title: "Registry Rules",
            subtitle: "Transfer of Property Act 1882",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Fard (Records)",
            subtitle: "Land Revenue Act 1967",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            color: "from-green-500 to-green-600"
        },
        {
            title: "Stamp Duty",
            subtitle: "Stamp Act 1989",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-purple-500 to-purple-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                        Pakistan Property Law Library
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Legal Knowledge Base
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Search for specific sections of the Land Revenue Act (1967), Registration Act (1908), 
                        Transfer of Property Act (1882) and other relevant laws.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search keyword (e.g., Mutation, Gift Deed, Registry...)"
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg shadow-lg"
                        />
                        <button className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                            Search Law
                        </button>
                    </div>
                </div>

                {/* Law Categories */}
                <div className="grid md:grid-cols-3 gap-6">
                    {lawCategories.map((category, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                        >
                            <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                            <div className="p-8">
                                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                    {category.title}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {category.subtitle}
                                </p>
                                <button className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-4 transition-all">
                                    <span>Learn More</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info Section */}
                <div className="mt-16 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 text-white text-center shadow-xl">
                    <h3 className="text-2xl font-bold mb-3">Need Expert Guidance?</h3>
                    <p className="text-green-100 mb-6">Connect with verified legal professionals for personalized advice</p>
                    <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Contact a Lawyer
                    </button>
                </div>
            </div>
        </div>
    );
}
