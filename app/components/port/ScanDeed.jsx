export default function ScanDeed() {
    return (
        <div className="">
            <div className="scandeedheader mt-6">
            <h1 className="text-2xl font-bold items-center justify-center flex">AI Document Inspector</h1>
            <p className="mt-2 items-center justify-center flex">Upload your Registry,sale deed or Allotement letter.Our AI will extract text,</p>
            <p className="items-center justify-center flex">identify risks, and suggest relevant sections of Pakistani law.</p>
            </div>
            <div className="m-12 flex gap-10 justify-center">
                <div className="border text-center w-1/3 p-19 rounded-lg">
                <button><img src="/uploadicon.png" alt="upload icon" className="w-20 h-20 items-center justify-center flex mx-auto"/></button>
              <h2 className=" text-2xl font-bold">Drop Legal papers</h2>
              <span className="font-medium">Support Png,Jpg & pdf scans.High</span>
              <p>resolution recomended.</p>
              <button className="bg-green-700 text-white p-2 rounded mt-5 pl-1">Upload Document</button>
                </div>
                <div className="border text-center w-1/3 p-5 rounded-lg">
              <h2 className=" text-2xl font-bold text-green-700">AI Assessment</h2>
              <img src="/reporticon.png" alt="report icon" className="w-20 h-20 items-center justify-center flex mx-auto mt-20 bg-gray-400"/>
              <p className="text-center m-3">Reports will appear here after scanning</p>

                </div>
            </div>
        </div>
    );
}