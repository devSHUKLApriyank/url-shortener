import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";
import { findUserByEmail, createUser } from "../config/dao/user.dao.js";
import { AppError, ConflictError, UnauthorizedError } from "../utils/AppError.js";

const signToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    if (user) {
        throw new ConflictError('User already exists');
    }
    const newUser = await createUser(name, email, password);
    const token = signToken({ id: newUser._id });  // no await needed, jwt.sign is sync
    return token;
};

export const loginUser = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
        console.log('User found:', user ? 'yes' : 'no')
        if (!user) throw new UnauthorizedError('Invalid Credentials');

        const isMatch = await user.comparePassword(password);
        console.log('Password match:', isMatch)
        if (!isMatch) throw new UnauthorizedError('Invalid Credentials');

        const token = signToken({ id: user._id });
        console.log('Token generated:', token ? 'yes' : 'no')
        return token;
    } catch (err) {
        console.log('Service error:', err.message)
        throw err
    }
};