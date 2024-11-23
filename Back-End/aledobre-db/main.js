const express = require('express');
const mongoose = require('mongoose');
const initDB = require('./dbConnection');
require('dotenv').config();

const PORT = 4012;

const server = express();

server.use(express.json());
initDB();

server.listen(PORT, ()=> console.log(`Server is up and running on PORT: ${PORT}`));


