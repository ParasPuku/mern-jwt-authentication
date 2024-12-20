const express = require('express');
const app = express();
require('dotenv').config();

const connectDB = require('./dbconnections/db');

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from the backend');
})

app.listen(PORT, () => {
    console.log('Server is running on port 5000');
})