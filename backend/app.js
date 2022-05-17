const express = require('express');
const dotenv = require('dotenv');
const productRoute = require('./routers/productRoute');
const errorMiddleware = require('./middleware/error');

const app = express();

// added .env config file
dotenv.config({ path: 'backend/config/.env' });

// Middleware
app.use(express.json());

// Use Router
app.use('/api/v1', productRoute);

// Error Handler
app.use(errorMiddleware);

module.exports = app;
