const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/url_short')



connection.on('connected',()=>{
    console.log("DB connected");
})
module.exports = connection;