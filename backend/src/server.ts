import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const startServer = async () => {
    // Connect to Database
    await connectDB();

    // Start Server
    const PORT = env.PORT;
    app.listen(PORT, () => {
        console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
};

startServer();
