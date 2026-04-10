"use client"
import useMe from "@/app/hooks/me";
import { useState } from "react";

export default function Page() {
    const {user, loading} = useMe()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const [profilePic, setProfilePic] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [documents, setDocuments] = useState({
        cnicFront: null,
        cnicBack: null,
        licenceFront: null,
        licenceBack: null
    })
    const [documentPreviews, setDocumentPreviews] = useState({})
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState("")

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Please log in to view your profile</div>
            </div>
        )
    }

    const handleEdit = () => {
        setFormData({
            name: user.name || '',
            email: user.email || ''
        })
        setPreviewUrl(user.profilePic || null)
        setDocumentPreviews({
            cnicFront: user.cnicFront || null,
            cnicBack: user.cnicBack || null,
            licenceFront: user.licenceFront || null,
            licenceBack: user.licenceBack || null
        })
        setIsEditing(true)
        setMessage("")
    }

    const handleCancel = () => {
        setIsEditing(false)
        setFormData({})
        setProfilePic(null)
        setPreviewUrl(null)
        setDocuments({
            cnicFront: null,
            cnicBack: null,
            licenceFront: null,
            licenceBack: null
        })
        setDocumentPreviews({})
        setMessage("")
    }

    const compressImage = (file, callback) => {
        if (file.size > 5 * 1024 * 1024) {
            setMessage("Image too large. Please choose an image under 5MB.")
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height
                
                const maxSize = 800
                if (width > maxSize || height > maxSize) {
                    if (width > height) {
                        height = (height / width) * maxSize
                        width = maxSize
                    } else {
                        width = (width / height) * maxSize
                        height = maxSize
                    }
                }
                
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
                callback(compressedBase64)
            }
            img.src = reader.result
        }
        reader.readAsDataURL(file)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfilePic(file)
            compressImage(file, (compressed) => {
                setPreviewUrl(compressed)
            })
        }
    }

    const handleDocumentChange = (docType, e) => {
        const file = e.target.files[0]
        if (file) {
            setDocuments({...documents, [docType]: file})
            compressImage(file, (compressed) => {
                setDocumentPreviews({...documentPreviews, [docType]: compressed})
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage("")

        try {
            const updateData = {
                name: formData.name,
                email: formData.email
            }

            if (profilePic) {
                updateData.profilePic = previewUrl
            }

            // Add lawyer documents if user is a lawyer
            if (user.role === 'lawyer') {
                if (documents.cnicFront) updateData.cnicFront = documentPreviews.cnicFront
                if (documents.cnicBack) updateData.cnicBack = documentPreviews.cnicBack
                if (documents.licenceFront) updateData.licenceFront = documentPreviews.licenceFront
                if (documents.licenceBack) updateData.licenceBack = documentPreviews.licenceBack
            }

            console.log('Sending update request:', updateData)

            const response = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData),
                credentials: 'same-origin'
            })

            if (!response.ok) {
                const data = await response.json()
                console.error('Update failed:', data)
                setMessage(data.message || `Failed to update profile (${response.status})`)
                setSaving(false)
                return
            }

            const data = await response.json()
            console.log('Update response:', data)

            setMessage("Profile updated successfully!")
            setIsEditing(false)
            setTimeout(() => window.location.reload(), 1500)
        } catch (error) {
            console.error('Update error:', error)
            setMessage("Network error. Please check your connection and try again.")
        } finally {
            setSaving(false)
        }
    }

    const isLawyer = user.role === 'lawyer'
    const isCitizen = user.role === 'citizen'

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">
                            {isLawyer ? 'Lawyer Profile' : isCitizen ? 'Citizen Profile' : 'Profile'}
                        </h1>
                        {!isEditing && (
                            <button 
                                onClick={handleEdit}
                                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message && (
                        <div className={`mb-6 p-4 rounded-xl border-l-4 ${message.includes('success') ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
                            <div className="flex items-center gap-2">
                                {message.includes('success') ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                )}
                                <span className="font-medium">{message}</span>
                            </div>
                        </div>
                    )}

                    {!isEditing ? (
                        <div className="space-y-6">
                            <div className="flex justify-center mb-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-xl ring-4 ring-green-100">
                                    {user.profilePic ? (
                                        <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl text-white font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Name
                                </label>
                                <p className="text-lg mt-2 font-semibold text-gray-900">{user.name || 'N/A'}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </label>
                                <p className="text-lg mt-2 font-semibold text-gray-900">{user.email || 'N/A'}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Role
                                </label>
                                <p className="text-lg mt-2 font-semibold text-gray-900 capitalize">{user.role || 'N/A'}</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Verification Status
                                </label>
                                <p className="text-lg mt-2">
                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${user.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {user.verified ? (
                                            <>
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Verified
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                Pending Verification
                                            </>
                                        )}
                                    </span>
                                </p>
                            </div>

                            {isLawyer && (
                                <div className="border-t pt-4">
                                    <h2 className="text-xl font-semibold mb-4">Verification Documents</h2>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">CNIC Front</label>
                                            {user.cnicFront ? (
                                                <img src={user.cnicFront} alt="CNIC Front" className="w-full h-32 object-cover rounded border" />
                                            ) : (
                                                <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-400">
                                                    Not uploaded
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">CNIC Back</label>
                                            {user.cnicBack ? (
                                                <img src={user.cnicBack} alt="CNIC Back" className="w-full h-32 object-cover rounded border" />
                                            ) : (
                                                <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-400">
                                                    Not uploaded
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">Licence Front</label>
                                            {user.licenceFront ? (
                                                <img src={user.licenceFront} alt="Licence Front" className="w-full h-32 object-cover rounded border" />
                                            ) : (
                                                <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-400">
                                                    Not uploaded
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">Licence Back</label>
                                            {user.licenceBack ? (
                                                <img src={user.licenceBack} alt="Licence Back" className="w-full h-32 object-cover rounded border" />
                                            ) : (
                                                <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-400">
                                                    Not uploaded
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl text-gray-400">
                                                {formData.name?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-green-700 text-white p-2 rounded-full cursor-pointer hover:bg-green-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-medium block mb-2">Name</label>
                                <input 
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-medium block mb-2">Email</label>
                                <input 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-medium block mb-2">Role</label>
                                <input 
                                    type="text"
                                    value={user.role || 'N/A'}
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                    disabled
                                />
                            </div>

                            {isLawyer && (
                                <div className="border-t pt-4">
                                    <h2 className="text-xl font-semibold mb-4">Upload Verification Documents</h2>
                                    <p className="text-sm text-gray-600 mb-4">Upload your CNIC and Licence documents for verification</p>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">CNIC Front</label>
                                            <div className="relative">
                                                {documentPreviews.cnicFront ? (
                                                    <img src={documentPreviews.cnicFront} alt="CNIC Front Preview" className="w-full h-32 object-cover rounded border" />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm">No image</span>
                                                    </div>
                                                )}
                                                <label className="absolute bottom-2 right-2 bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 text-sm">
                                                    Upload
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(e) => handleDocumentChange('cnicFront', e)}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">CNIC Back</label>
                                            <div className="relative">
                                                {documentPreviews.cnicBack ? (
                                                    <img src={documentPreviews.cnicBack} alt="CNIC Back Preview" className="w-full h-32 object-cover rounded border" />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm">No image</span>
                                                    </div>
                                                )}
                                                <label className="absolute bottom-2 right-2 bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 text-sm">
                                                    Upload
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(e) => handleDocumentChange('cnicBack', e)}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">Licence Front</label>
                                            <div className="relative">
                                                {documentPreviews.licenceFront ? (
                                                    <img src={documentPreviews.licenceFront} alt="Licence Front Preview" className="w-full h-32 object-cover rounded border" />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm">No image</span>
                                                    </div>
                                                )}
                                                <label className="absolute bottom-2 right-2 bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 text-sm">
                                                    Upload
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(e) => handleDocumentChange('licenceFront', e)}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600 font-medium block mb-2">Licence Back</label>
                                            <div className="relative">
                                                {documentPreviews.licenceBack ? (
                                                    <img src={documentPreviews.licenceBack} alt="Licence Back Preview" className="w-full h-32 object-cover rounded border" />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm">No image</span>
                                                    </div>
                                                )}
                                                <label className="absolute bottom-2 right-2 bg-green-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-800 text-sm">
                                                    Upload
                                                    <input 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={(e) => handleDocumentChange('licenceBack', e)}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button 
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {saving ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : 'Save Changes'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
