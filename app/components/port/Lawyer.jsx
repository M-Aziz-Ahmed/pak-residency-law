'use client'
import { useState } from "react";

export default function Lawyer() {
    const lawyers = [
        {
            name: "Advocate Ahmed Khan",
            specialty: "Property Registration Expert",
            experience: "15+ years",
            rating: 4.8,
            cases: 250,
            image: null
        },
        {
            name: "Advocate Fatima Ali",
            specialty: "Land Revenue Specialist",
            experience: "12+ years",
            rating: 4.9,
            cases: 180,
            image: null
        },
        {
            name: "Advocate Hassan Raza",
            specialty: "Property Dispute Resolution",
            experience: "10+ years",
            rating: 4.7,
            cases: 200,
            image: null
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                        Authentic Panel
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Pakistan Land Advisors
                    </h1>
                    <p className="text-lg text-gray-600">
                        Specialized legal professionals for land-related matters
                    </p>
                </div>

                {/* Lawyers Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {lawyers.map((lawyer, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
                        >
                            {/* Profile Image */}
                            <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                {lawyer.image ? (
                                    <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-800">{lawyer.rating}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                    {lawyer.name}
                                </h2>
                                <p className="text-green-600 font-medium mb-4">
                                    {lawyer.specialty}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{lawyer.experience}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{lawyer.cases} cases</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Request Case Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Are you a Legal Professional?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Join our panel of verified lawyers and help citizens navigate property law complexities
                        </p>
                        <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            Apply as a Lawyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
