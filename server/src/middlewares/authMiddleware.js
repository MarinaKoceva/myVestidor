import jwt from '../lib/jwt.js';
import { JWT_SECRET } from '../config/constans.js';
import InvaliToken from '../models/InvalidToken.js';

const authMiddleware = async (req, res, next) => {
    const token = req.header('X-Authorization');

    if (!token) {
        return next();
    };

    try {
        const invalidToken = await InvaliToken.findOne({ token });
        if (invalidToken) {
            return res.status(403);
        }

        const decodedToken = await jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        req.isAuthenticated = true;
        
        next();
    } catch (error) {
        res.status(401).end();
    };
    
};

export {
    authMiddleware
};