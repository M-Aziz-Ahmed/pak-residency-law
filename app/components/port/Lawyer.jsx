export default function Lawyer() {
    return(
        <div>
            <div className="lawheader text-center">
                <h4 className="text-green-700">Authentic Panel</h4>
                <h1 className="m-5 font-extrabold text-4xl">Pakistan Land Advisors</h1>
                <p>Specialized legal professionals for land-related matters</p>
            </div>
            <div className="box flex gap-10 text-center justify-center m-10">
                <div className="box1 border p-10 w-1/4 rounded-lg">
                   <h2 className="hover:text-green-700 font-bold">Registry Rules</h2>
                    <p className="m-2">Transfer of Property Act 1882</p>
                    <button className="bg-green-700 text-white p-2 rounded-md mt-4">Request Case Review</button>
                </div>
                <div className="box2 border p-10 w-1/4 rounded-lg">
                   <h2 className="hover:text-green-700 font-bold">Fard(Records)</h2>
                    <p className="m-2">Land Revenue Act 1967</p>
                    <button className="bg-green-700 text-white p-2 rounded-md mt-4">Request Case Review</button>
                </div>
                <div className="box3 border p-10 w-1/4 rounded-lg">
                      <h2 className="hover:text-green-700 font-bold">Stamp Duty</h2>
                      <p className="m-2">Stamp Act 1989</p>
                      <button className="bg-green-700 text-white p-2 rounded-md mt-4">Request Case Review</button>
                </div>
            </div>

        </div>
    );
}