import User from "../models/User.js";

export async function getProfile(userId) {
    return User.findById(userId);
}

export async function updateProfile(email, username, userId) {
    const user = User.findByIdAndUpdate(userId, {username, email}, {returnDocument: 'after' });

    return user;
}

