export default function LawSearch() {
    return (
        <div className="">
            <div className="lawheader text-center">
                <h4 className="text-green-700">Pakistan Property Law Library</h4>
                <h1 className="m-5 font-extrabold text-4xl">Legal Knowledge Base</h1>
                <p>Search for the specific sections of the land Revenue Act(1967), Registration</p>
                <p>Act(1908),Transfer of Property Act(1882) and other relevant laws.</p>
            </div>
            <div className="searchbar flex items-center justify-center mt-10 mb-10">
                <input type="text" placeholder="Search keyword(e.g., Mutation , Gift Deed, Registry..)" className="w-1/2 p-2 border border-gray-300 rounded-md" />
                <button className="bg-green-700 text-white p-2 rounded-md ml-2">Search Law</button>
            </div>
            <div className="box flex gap-10 text-center justify-center">
                <div className="box1 border p-10 w-1/4 rounded-lg">
                   <h2 className="hover:text-green-700 font-bold">Registry Rules</h2>
                    <p className="m-2">Transfer of Property Act 1882</p>
                </div>
                <div className="box2 border p-10 w-1/4 rounded-lg">
                   <h2 className="hover:text-green-700 font-bold">Fard(Records)</h2>
                    <p className="m-2">Land Revenue Act 1967</p>
                </div>
                <div className="box3 border p-10 w-1/4 rounded-lg">
                      <h2 className="hover:text-green-700 font-bold">Stamp Duty</h2>
                      <p className="m-2">Stamp Act 1989</p>
                </div>
            </div>
        </div>
    );
}