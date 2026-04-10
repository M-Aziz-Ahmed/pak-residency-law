'use client'
import { useState } from "react";

export default function ScanDeed() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            // Simulate scanning
            setScanning(true);
            setTimeout(() => {
                setScanning(false);
                setResult({
                    status: "completed",
                    risks: ["Minor discrepancy in property boundaries", "Stamp duty verification needed"],
                    suggestions: ["Verify with local revenue office", "Consult with property lawyer"]
                });
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                        AI-Powered Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        AI Document Inspector
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Upload your Registry, Sale Deed or Allotment Letter. Our AI will extract text, 
                        identify risks, and suggest relevant sections of Pakistani law.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Upload Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h2>
                        
                        <div className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-green-50 group cursor-pointer">
                            <input
                                type="file"
                                id="file-upload"
                                accept=".png,.jpg,.jpeg,.pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Drop Legal Papers</h3>
                                <p className="text-gray-600 mb-1">Support PNG, JPG & PDF scans</p>
                                <p className="text-sm text-gray-500 mb-6">High resolution recommended</p>
                                <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                                    Upload Document
                                </div>
                            </label>
                        </div>

                        {uploadedFile && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                                        <p className="text-sm text-gray-600">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-green-600 mb-6">AI Assessment</h2>
                        
                        {!uploadedFile && !scanning && !result && (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600">Reports will appear here after scanning</p>
                            </div>
                        )}

                        {scanning && (
                            <div className="flex flex-col items-center justify-center h-64">
                                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-6"></div>
                                <p className="text-gray-700 font-semibold">Analyzing document...</p>
                                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-6">
                                {/* Status */}
                                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="font-semibold text-green-800">Analysis Complete</p>
                                    </div>
                                </div>

                                {/* Risks Identified */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Risks Identified
                                    </h3>
                                    <ul className="space-y-2">
                                        {result.risks.map((risk, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                                <span className="text-orange-500 mt-1">•</span>
                                                <span>{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Suggestions */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Recommendations
                                    </h3>
                                    <ul className="space-y-2">
                                        {result.suggestions.map((suggestion, index) => (
                                            <li key={index} className="flex items-start gap-2 text-gray-700">
                                                <span className="text-blue-500 mt-1">•</span>
                                                <span>{suggestion}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Button */}
                                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                                    Download Full Report
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Secure & Private</h3>
                        <p className="text-sm text-gray-600">Your documents are encrypted and never stored</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Instant Analysis</h3>
                        <p className="text-sm text-gray-600">Get results in seconds with AI technology</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Legal Compliance</h3>
                        <p className="text-sm text-gray-600">Based on Pakistani property laws</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
