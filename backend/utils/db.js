const mongoose = require('mongoose');

const DB_URI = "mongodb://127.0.0.1:27017/my_database";

const option = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};

mongoose.connect(DB_URI, option);

module.exports = mongoose;