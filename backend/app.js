const express = require('express');
const dotenv = require('dotenv');
const productRoute = require('./routers/productRoute');

const app = express();

// added .env config file
dotenv.config({ path: 'backend/config/.env' });

// Middleware
app.use(express.json());

// Use Router
app.use('/api/v1', productRoute);

module.exports = app;
