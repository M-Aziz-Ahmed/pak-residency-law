'use client'
import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [loginMode, setLoginMode] = useState('citizen')
    const modes = ['citizen', 'lawyer', 'admin']

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role: loginMode,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-full bg-gray-100 flex items-center justify-center">

            <div className="w-[380px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6">

                {/* Tabs */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl mb-6">
                    {modes.map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setLoginMode(mode)}
                            className={`flex-1 py-2 rounded-lg text-sm capitalize transition-all duration-300 ${
                                loginMode === mode
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-white'
                            }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img src="/navlogo.png" alt="Logo" className="w-14 h-14" />
                </div>

                <div className="text-gray-800">

                    {loginMode === 'citizen' && (
                        <>
                            <h2 className="text-2xl font-semibold text-center">Citizen Portal Login</h2>
                            <p className="text-center text-gray-500 mb-5">
                                Please login to access your account
                            </p>

                            <label className="text-sm text-gray-600">Authorized Name</label>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                                className="w-full mt-1 mb-3 p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <label className="text-sm text-gray-600">Authorized Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
                                className="w-full mt-1 mb-4 p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </>
                    )}

                    {loginMode === 'lawyer' && (
                        <>
                            <h2 className="text-2xl font-semibold text-center">Lawyer Portal Login</h2>
                            <p className="text-center text-gray-500 mb-5">
                                Please login to access your account
                            </p>

                            <label className="text-sm text-gray-600">Authorized Name</label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full mt-1 mb-3 p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                            />

                            <label className="text-sm text-gray-600">Authorized Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full mt-1 mb-4 p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                            />
                        </>
                    )}

                    {loginMode === 'admin' && (
                        <>
                            <h2 className="text-2xl font-semibold text-center">Admin Portal Login</h2>
                            <p className="text-center text-gray-500 mb-5">
                                Please login to access your account
                            </p>

                            <label className="text-sm text-gray-600">Authorized Name</label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full mt-1 mb-3 p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                            />

                            <label className="text-sm text-gray-600">Authorized Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full mt-1 mb-4 p-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-800"
                            />
                        </>
                    )}

                    <p className="text-center text-sm text-gray-500 mt-2">
                        create a new account ?..
                        <Link href="./signin" className="text-green-600 hover:underline">
                            SignIn
                        </Link>
                    </p>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition-all duration-300"
                    >
                        Enter {loginMode} Portal
                    </button>

                </div>
            </div>
        </div>
    );
}