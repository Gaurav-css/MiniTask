import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const generateToken = (id: string) => {
    return jwt.sign({ id }, env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET);
};
