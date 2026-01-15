export default function ScanDeed() {
    return (
        <div>
            <div className="scandeedheader">
            <h1 className="text-2xl font-bold items-center justify-center flex mt-3">AI Document Inspector</h1>
            <p className="mt-2 items-center justify-center flex">Upload your Registry,sale deed or Allotement letter.Our AI will extract text,</p>
            <p className="items-center justify-center flex">identify risks, and suggest relevant sections of Pakistani law.</p>
            </div>
            <div className="box m-20 flex-row">
                <div className="box1 ml-55 mt-15 mr-155 border text-center w-50% h-100% pt-35 pb-15 pl-4 pr-4 rounded-lg">
              <h2 className=" text-2xl font-bold">Drop Legal papers</h2>
              <span className="font-medium">Support Png,Jpg & pdf scans.High</span>
              <p>resolution recomended.</p>
              <button className="bg-green-700 text-white p-2 rounded mt-5 pl-1">Upload Document</button>
                </div>
                <div className="box2 ml-55 mt-15 mr-155 border text-center w-50% h-100% pt-35 pb-15 pl-4 pr-4 rounded-lg">
              <h2 className=" text-2xl font-bold">AI Assesment</h2>

                </div>
            </div>
        </div>
    );
}