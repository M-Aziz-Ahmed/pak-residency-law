'use client'
import { useState } from "react";

export default function AiChat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (message.trim()) {
            setMessages([...messages, { text: message, sender: 'user' }]);
            setMessage("");
            // Here you would typically send to your AI backend
        }
    };

    const quickQuestions = [
        "What is a Sale Deed?",
        "How to register property?",
        "What is mutation process?",
        "Land grab protection laws"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Card */}
                <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white">Legal AI Advisor</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                <p className="text-sm text-green-100">Online | Supports Urdu & Roman Urdu</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    
                    {/* Messages Area */}
                    <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">How can I help you today?</h2>
                                <p className="text-gray-600 mb-6">Ask about Sale Deeds, Registry, Mutation, or<br />Land grab issues in Pakistan.</p>
                                
                                {/* Quick Questions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                                    {quickQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setMessage(question)}
                                            className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700">{question}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] p-4 rounded-2xl ${
                                                msg.sender === 'user'
                                                    ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                                                    : 'bg-white border border-gray-200 text-gray-800'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-200">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Poochain (Ask) anything about property laws..."
                                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                            >
                                <span>Send</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
