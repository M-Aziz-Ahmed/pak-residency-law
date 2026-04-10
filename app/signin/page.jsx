'use client'
import Link from "next/link";
import { useState } from "react";
import useMe from "../hooks/me";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

export default function Page() {
    const { user } = useMe()
    const [signInMode, setSignInMode] = useState('citizen')
    const modes = ['citizen', 'lawyer']
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role: 'citizen',
        verified: 'true'

    });
    console.log(values)

    const handleMode = (mode)=>{
        setSignInMode(mode)
        if(mode === 'citizen'){
        setValues({...values, verified: true})
        setValues({...values, role:'citizen'})
        }
        else{
        setValues({...values, verified: false})
        setValues({...values, role:'lawyer'})
        }
    }
    const handleSubmit = async (e) => {
        try {
            const res = fetch('/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            console.log(res);
           redirect('/')
        } catch (error) {
            console.log(error);
        }
    }
    console.log(user)
    return (
        <div className="h-[100vh] w-[100vw] bg-white/80 flex justify-center items-center">
            <div className="form bg-white p-5 rounded-lg shadow-lg">
                <div className="div form-header flex w-70 p-2 px-5 gap-3 justify-around bg-black rounded">
                    {modes.map((mode) => (
                        <button key={mode} onClick={() => handleMode(mode)} className="bg-green-300 p-2 rounded text-black">{mode}</button>
                    ))}
                </div>

                <div className="form-body text-black pb-3 mt-4">
                    <div className="img"><img src="/navlogo.png" alt="Logo" className="w-16 h-16 mx-auto my-4" /></div>

                    {signInMode === 'citizen' && (
                        <>
                            <h2 className="text-2xl font-bold text-center">Citizen Portal Login </h2>
                            <p className="text-center mb-6">Plz login to access your account.</p>

                            <div className="">
                                <p>Full Name</p>
                                <input type="text" placeholder="Your Full Name" onChange={(e) => setValues({ ...values, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>
                            <div className="">
                                <p>Email Address</p>
                                <input type="text" placeholder="example@gmail.com" onChange={(e) => setValues({ ...values, email: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>

                            <div className="">
                                <p>Password</p>
                                <input type="password" placeholder="Password" onChange={(e) => setValues({ ...values, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>
                            <div className="">
                                <p>Confirm Password</p>
                                <input type="password" placeholder="Password" onChange={(e) => setValues({ ...values, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>

                        </>
                    )}

                    {signInMode === 'lawyer' && (
                        <>
                        <h2 className="text-2xl font-bold text-center">Lawyer Portal Login</h2>
                            <p className="text-center mb-6">Plz login to access your account.</p>

                            <div className="">
                                <p>Full Name</p>
                                <input type="text" placeholder="Your Full Name" onChange={(e) => setValues({ ...values, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>
                            <div className="">
                                <p>Email Address</p>
                                <input type="text" placeholder="example@gmail.com" onChange={(e) => setValues({ ...values, email: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>

                            <div className="">
                                <p>Password</p>
                                <input type="password" placeholder="Password" onChange={(e) => setValues({ ...values, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>
                            <div className="">
                                <p>Confirm Password</p>
                                <input type="password" placeholder="Password" onChange={(e) => setValues({ ...values, password: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md mb-4" />
                            </div>
                        </>
                    )}

                    <p>Already have an account ?.. <Link href="./login">Login</Link></p>
                    <button className="bg-green-700 text-white p-2 rounded-md w-full" onClick={handleSubmit}>Enter {signInMode} Portal</button>

                </div>
            </div>
        </div>
    );
}