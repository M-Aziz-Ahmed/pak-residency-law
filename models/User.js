import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    profilePic:{
        type:String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    verified:{
        type: Boolean,
    },
    // Lawyer verification documents
    cnicFront: {
        type: String
    },
    cnicBack: {
        type: String
    },
    licenceFront: {
        type: String
    },
    licenceBack: {
        type: String
    }
});

export default mongoose.models.User || mongoose.model("User", userSchema);