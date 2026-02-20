'use client'
import { useState } from "react";

export default function Page() {
const [loginMode, setLoginMode] = useState('citizen')
const modes = ['citizen', 'lawyer','admin']
    return (
        <div className="h-[100vh] w-[100vw] bg-white/80 flex justify-center items-center">
            <div className="form bg-white p-5 rounded-lg shadow-lg">
                <div className="div form-header flex w-70 p-2 px-5 gap-3 justify-around bg-black rounded">
                    {modes.map((mode)=>(
                        <button onClick={()=>setLoginMode(mode)} className="bg-green-300 p-2 rounded text-black">{mode}</button>
                    ))}
                </div>
                <div className="form-body text-black pb-3 mt-4">
                    {loginMode === 'citizen' &&(
                        <>
                        citizen Login Fields
                        </>
                    )}
                    {loginMode === 'lawyer'&&(
                        <>
                        Lawyer Login Fields
                        </>
                    )}
                    {/* {loginMode === 'admin'&&(
                        <>
                        Admin Login Fields
                        </>
                    )} */}
                </div>



            </div>
        </div>
    );
}