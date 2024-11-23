const mongoose = require('mongoose');
require('dotenv').config();

const initDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = initDB;