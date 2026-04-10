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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">
                            {isLawyer ? 'Lawyer Profile' : isCitizen ? 'Citizen Profile' : 'Profile'}
                        </h1>
                        {!isEditing && (
                            <button 
                                onClick={handleEdit}
                                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message && (
                        <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    {!isEditing ? (
                        <div className="space-y-6">
                            <div className="flex justify-center mb-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                    {user.profilePic ? (
                                        <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl text-gray-400">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border-b pb-4">
                                <label className="text-sm text-gray-600 font-medium">Name</label>
                                <p className="text-lg mt-1">{user.name || 'N/A'}</p>
                            </div>

                            <div className="border-b pb-4">
                                <label className="text-sm text-gray-600 font-medium">Email</label>
                                <p className="text-lg mt-1">{user.email || 'N/A'}</p>
                            </div>

                            <div className="border-b pb-4">
                                <label className="text-sm text-gray-600 font-medium">Role</label>
                                <p className="text-lg mt-1 capitalize">{user.role || 'N/A'}</p>
                            </div>

                            <div className="border-b pb-4">
                                <label className="text-sm text-gray-600 font-medium">Verification Status</label>
                                <p className="text-lg mt-1">
                                    <span className={`px-3 py-1 rounded-full text-sm ${user.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {user.verified ? 'Verified' : 'Pending Verification'}
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
                                    className="flex-1 bg-green-700 text-white p-2 rounded-md hover:bg-green-800 disabled:bg-gray-400"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
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
