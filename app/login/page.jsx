'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const [loginMode, setLoginMode] = useState('citizen')
    const modes = ['citizen', 'lawyer', 'admin']
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, role: loginMode })
            });
            const data = await res.json()
            
            if (res.ok) {
                router.push('/')
            } else {
                setError(data.message || "Login failed")
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-center">
                        <div className="flex justify-center mb-3">
                            <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg">
                                <img src="/navlogo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">
                            Pak Residency Law
                        </h1>
                        <p className="text-green-100 text-sm">Welcome back! Please login to continue</p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        
                        {/* Mode Tabs */}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-shake">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="example@gmail.com"
                                        value={values.email}
                                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={values.password}
                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    `Enter ${loginMode.charAt(0).toUpperCase() + loginMode.slice(1)} Portal`
                                )}
                            </button>

                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="/signin" className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                                    Sign up here
                                </a>
                            </p>
                        </div>

                    </div>
                </div>

                {/* Bottom text */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Pakistan Residency Law Portal © 2026
                </p>
            </div>
        </div>
    );
}
