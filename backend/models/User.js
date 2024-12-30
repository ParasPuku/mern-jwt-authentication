const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String,
        default: null, // Stores the token for resetting the password
    },
    resetPasswordExpires: {
        type: Date,
        default: null, // Stores the expiry time of the token
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const UserModel = mongoose.model("users", userSchema);
module.exports = {
    UserModel,
}