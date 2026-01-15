export default function AiChat() {
    return (
        <div className="">
            <div className="cont mt-10 ml-20 mr-20">
                <div className="header bg-green-700 items-center justify-center p-5 rounded-t-lg text-white">
                 <h3 className="font-bold">Legal AI Advisor</h3>
                   <p className="text-sm text-green-200">
              Online | Support Urdu & Roman Urdu
            </p>
                </div>
                <div className="body items-center justify-center mt-8">
                 <img src="/message.png" alt="icon message" className="py-5 w-10 h-20 ml-130 items-center justify-center"/>
                  <h2 className="font-bold ml-110">How I can help you today</h2>
                  <p className="ml-100">Ask about Sale Deeds,Registry Mutation,or</p>
                  <p className="ml-110">Land grab issues in Pakistan.</p>
                </div>
                <div className="footer flex items-center justify-center mt-10">
                 <searchbar className="w-full">
                  <input type="text" placeholder="Poochain(Ask) anything about property laws" className="w-full p-2 border border-gray-300 rounded"/>
                 </searchbar>
                 <button className="bg-green-700 text-white p-2 rounded ml-2">Send</button>
                </div>
            </div>
        </div>
    );
}