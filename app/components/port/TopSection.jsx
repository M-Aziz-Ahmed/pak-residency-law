export default () => {
    return (
        <section
            style={{
                backgroundImage: "url('/bgpic.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <div className="bg-black opacity-25 absolute h-[100vh] w-[99vw]"></div>
            <div className="page1 flex justify-around items-center relative z-[10] top-20">
                <div className="portion1 flex bg-light">
                    <div className="textsection py-10 px-15 font-bold">
                        <h1 className="text-5xl">Smart Legal help</h1>
                        <h1 className="text-5xl">for</h1>
                        <h1 className="text-5xl text-green-400">property disputes</h1>
                        <br></br>
                        <p className="text-gray-600 ">Navigate complex residential laws in Urdu,Roman</p>
                        <p className="text-gray-600">Urdu or English.Analyze deeds,identify risks and </p>
                        <p className="text-gray-600">Urdu or English.Analyze deeds,identify risks and </p>
                        <p className="text-gray-600">connect with experts instantly.</p>
                        <div className="btn flex py-5 px-3 gap-4">
                            <button className="btn1 bg-green-700 font-weight:900 rounded-md px-4 py-3">Ask AI Question</button>
                            <button className="btn2 bg-green-700 font-weight:900 rounded-md px-4 py-3">Scan Property Papers</button>
                        </div>
                    </div>
                </div>
                <div className="portion2">
                    <div className="div px-25 py-10 border-2 m-6 backdrop-blur-md shadow-2xl rounded-2xl">
                        <h2 className="font-bold">Secure Your Assets</h2>
                        <br></br>
                        <p className="py-2 px-25 border-2 m-3 backdrop-blur-md shadow-lg rounded-lg">Ai-based law simplification</p>
                        <p className="py-2 px-25 border-2 m-3 backdrop-blur-md shadow-lg rounded-lg">OCR document analysis</p>
                        <p className="py-2 px-25 border-2 m-3 backdrop-blur-md shadow-lg rounded-lg">Urdu and Roman Urdu support</p>
                        <p className="py-2 px-25 border-2 m-3 backdrop-blur-md shadow-lg rounded-lg">Consultation with Experts</p>

                    </div>
                </div>
            </div>
        </section>
    );
}