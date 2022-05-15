const express = require('express');
const dotenv = require('dotenv');
const productRoute = require('./routers/productRoute');
const errorMiddleware = require('./middleware/error');

const app = express();

// added .env config file
dotenv.config({ path: 'backend/config/.env' });

// Middleware middleware
app.use(express.json());
app.use(errorMiddleware);

// Use Router
app.use('/api/v1', productRoute);

module.exports = app;
