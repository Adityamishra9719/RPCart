import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors'; // Add this line
// import path from 'path';
import dotenv from 'dotenv';

import errorMiddleware from './middleware/error.js';

dotenv.config({ path: "backend/config/config.env" });

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

// Route Imports
import product from './routes/productRoute.js';
import user from './routes/UserRoute.js';
import order from './routes/orderRoute.js';
import payment from './routes/paymentRoute.js';

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
app.use(errorMiddleware);

export default app;