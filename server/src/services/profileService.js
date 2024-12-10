import User from "../models/User.js";

// import User from "../models/User";

export async function getProfile(userId) {
    return User.findById(userId).populate("items").exec();
}

export async function updateProfile(email, username, userId) {
    const user = User.findByIdAndUpdate(userId, {username, email}, {returnDocument: 'after' });

    return user;
} 

export async function addItem(itemId, userId) {
    const user = await User.findById(userId); 
    
    user.items.push(itemId); 

    await user.save();
} 

export async function removeItem(itemId, userId) {
    const user = await User.findById(userId); 
    const index = user.items.indexOf(itemId);
    
    user.items.splice(index, 1); 
    await user.save();
}

