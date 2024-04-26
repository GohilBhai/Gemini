const mongoose = require("mongoose");
MONGODB_URL ="mongodb://127.0.0.1:27017/ChatGpt"

const ConnectionDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("DataBase Connection Success !!!".bgGreen.bold);
    } catch (error) {
        console.error("DataBase Connection Failed !!!".bgRed.bold, error);
    }
}

module.exports = ConnectionDB;
