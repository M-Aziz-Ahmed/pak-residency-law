'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const links = [
        {name:'Home', link:'/portfollio'},
        {name:'AI-Chat', link:'/'},
        {name:'Scan Deed', link:'/'},
        {name:'Law Search', link:'/'},
        {name:'Land Advisors', link:'/'},
    ]
    const path = usePathname()
    return (
        <>
        <div className="flex justify-around items-center bg-white text-gray-400 py-7">
            <div className="flex gap-2">
                <div className="logo rotate-6">Logo</div>
                <div className="text-2xl font-extrabold text-green-700">PakResidencyLaw</div>
            </div>
            <div className="flex gap-15 items-center">
                <div className="links flex">
                    {links.map((l)=>(
                        <div key={l.name}>
                        <Link href={l.link} className={`p-2 text-xl font-semibold ${path === l.link?'text-green-700 border-b-2':''}`}>{l.name}</Link>
                        </div>
                    ))}
                </div>
                <div className="">
                    <button className="bg-green-700 p-2 rounded-full text-xl font-semibold text-white px-10">Portal Login</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Navbar;