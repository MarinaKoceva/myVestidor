import bcrypt from 'bcrypt';
import jwt from '../lib/jwt.js';
import User from "../models/User.js";
import InvalidToken from '../models/InvalidToken.js';
import { JWT_SECRET } from '../config/constans.js';


const register = async (username, email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new Error("This email already registered!");
    }

    const createdUser = await User.create({ username, email, password });

    return createAccessToken(createdUser);
}

const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User does not exist!');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Password does not match!');
    };

    return createAccessToken(user);
};

const logout = async (token) => {
    try {
        await InvalidToken.create({ token }); 
    } catch (error) {
        throw new Error('Action failed!');
    }
};

async function createAccessToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '2h'});

    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        accessToken: token,
    };
};

export default {
    register,
    login,
    logout
};