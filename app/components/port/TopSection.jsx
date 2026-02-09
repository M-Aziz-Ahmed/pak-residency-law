export default function TopSection() {
    const features = [
        "AI-based Law Simplification",
        "OCR Document Analysis",
        "Urdu & Roman Urdu Support",
        "Consultation with Experts"
    ];

    return (
        <section
            style={{
                backgroundImage: "url('/bgpic.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
            className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        Smart Legal help<br />
                        for<br />
                        <span className="text-green-400">property disputes</span>
                    </h1>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        Navigate complex residential laws in Urdu, Roman Urdu or English.
                        Analyze deeds, identify risks and connect with experts instantly.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg px-6 py-3 transition-colors">
                            Ask AI Question
                        </button>
                        <button className="bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg px-6 py-3 transition-colors">
                            Scan Property Papers
                        </button>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                    <h2 className="text-4xl font-bold text-white mb-8">
                        Secure Your Assets
                    </h2>

                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                            >
                                <div className="flex-shrink-0 w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center rounded-pill">
                                    <svg
                                        className="w-5 h-5 text-green-400 rounded-pill"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl text-white/90 font-light">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
