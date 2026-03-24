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
        <div className="h-[100vh] w-[100vw] bg-white/80 flex justify-center items-center">
            <div className="form bg-white p-5 rounded-lg shadow-lg">
                <div className="div form-header flex w-70 p-2 px-5 gap-3 justify-around bg-black rounded">
                    {modes.map((mode) => (
                        <button key={mode} onClick={() => setLoginMode(mode)} className="bg-green-300 p-2 rounded text-black">{mode}</button>
                    ))}
                </div>

                <div className="form-body text-black pb-3 mt-4">
                    <div className="img"><img src="/navlogo.png" alt="Logo" className="w-16 h-16 mx-auto my-4" /></div>

                    {loginMode === 'citizen' && (
                        <>
                            <h2 className="text-2xl font-bold text-center">Citizen Portal Login</h2>
                            <p className="text-center mb-6">Plz login to access your account.</p>
                            <p>Authorized Name</p>
                            <input type="text" placeholder="Username" onChange={(e) => setValues({ ...values, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            <p>Authorized Password</p>
                            <input type="password" placeholder="Password" onChange={(e) => setValues({ ...values, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                        </>
                    )}

                    {loginMode === 'lawyer' && (
                        <>
                            <h2 className="text-2xl font-bold text-center">Lawyer Portal Login</h2>
                            <p className="text-center mb-6">Plz login to access your account.</p>
                            <p>Authorized Name</p>
                            <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            <p>Authorized Password</p>
                            <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                        </>
                    )}
                    {loginMode === 'admin' && (
                        <>
                            <h2 className="text-2xl font-bold text-center">Admin Portal Login</h2>
                            <p className="text-center mb-6">Plz login to access your account.</p>
                            <p>Authorized Name</p>
                            <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            <p>Authorized Password</p>
                            <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                        </>
                    )}

                    <p>create a new account ?.. <Link href="./signin">SignIN</Link></p>
                    <button className="bg-green-700 text-white p-2 rounded-md w-full">Enter {loginMode} Portal</button>

                </div>
            </div>
        </div>
    );
}