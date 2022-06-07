const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const productRoute = require('./routers/productRoute');
const errorMiddleware = require('./middleware/error');
const userRouter = require('./routers/userRoute');
const orderRouter = require('./routers/orderRoute');

const app = express();

// added .env config file
dotenv.config({ path: 'backend/config/.env' });

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use Router
app.use('/api/v1', productRoute);
app.use('/api/v1', userRouter);
app.use('/api/v1', orderRouter);

// Error Handler
app.use(errorMiddleware);

module.exports = app;
