'use client'
import Link from "next/link";

export default function TopSection() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            text: 'AI-based law simplification'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            text: 'OCR document analysis'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
            ),
            text: 'Urdu and Roman Urdu support'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            text: 'Consultation with Experts'
        },
    ]

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage: "url('/bgpic.png')",
                }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-green-900/40 to-black/60" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
                    
                    {/* Left Section - Text Content */}
                    <div className="text-white space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                Smart Legal Help
                            </h1>
                            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                                for
                            </h2>
                            <h3 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                                Property Disputes
                            </h3>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                            Navigate complex residential laws in Urdu, Roman Urdu or English. 
                            Analyze deeds, identify risks and connect with experts instantly.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/portfollio/AiChat">
                                <button className="px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Ask AI Question
                                </button>
                            </Link>
                            <Link href="/portfollio/ScanDeed">
                                <button className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/50 shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Scan Property Papers
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section - Features Card */}
                    <div className="lg:ml-auto">
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6">Secure Your Assets</h2>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                            {feature.icon}
                                        </div>
                                        <p className="text-white font-medium">{feature.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
