import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
    PORT: number;
    MONGODB_URI: string;
    JWT_SECRET: string;
    NODE_ENV: string;
}

const getEnv = (): EnvConfig => {
    return {
        PORT: Number(process.env.PORT) || 5000,
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/minitask',
        JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
        NODE_ENV: process.env.NODE_ENV || 'development',
    };
};

export const env = getEnv();
