import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import notesRouter from './routes/notesRoutes.js'
import authRouter from './routes/authRoutes.js';

const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());

app.use(cookieParser());

// health check
app.get("/health", (req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;

    res.status(dbConnected ? 200 : 503).json({
        status: dbConnected ? "OK" : "ERROR",
        database: dbConnected ? "Connected" : "Disconnected",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// routes
app.use('/api/notes',notesRouter);
app.use('/api/auth',authRouter);

export default app;