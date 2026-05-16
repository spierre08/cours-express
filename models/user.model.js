import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true, collection: 'users' });

const User = mongoose.model('User', UserSchema);

export default User;