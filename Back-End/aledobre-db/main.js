const express = require('express');
const initDB = require('./dbConnection');
require('dotenv').config();

const usersRoute = require('./routes/users');
const dishesRoute = require('./routes/dishes');

const PORT = 4012;

const server = express();

server.use(express.json());

server.use('/', usersRoute);
server.use('/', dishesRoute);
initDB();

server.listen(PORT, ()=> console.log(`Server is up and running on PORT: ${PORT}`));


