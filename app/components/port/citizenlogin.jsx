export default function CitizenLogin() {
    return(
           <div className="bg-gray-100">
            <div className="citizen-portal-container flex-row w-100 items-center justify-center p-10 border bg-white text-black border-gray-300 rounded-lg ml-100">
                <div className="img"><img src="/navlogo.png" alt="Logo" className="w-16 h-16 mx-auto my-4" /></div>
<h2 className="text-2xl font-bold text-center">Citizen Portal Login</h2>
<p className="text-center mb-6">Plz login to access your account.</p>
<form>
    <p>Authorized Name</p>
    <input type="text" placeholder="Username" className="w-full p-2 border border-gray-300 rounded-md mb-4" />
    <p>Authorized Password</p>
    <input type="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded-md mb-4" /> 
    <button className="bg-green-700 text-white p-2 rounded-md w-full">Enter Citizen Portal</button>
</form>
            </div>
           </div>
    );
}