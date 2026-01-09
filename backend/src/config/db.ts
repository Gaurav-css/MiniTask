import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
    }
};
