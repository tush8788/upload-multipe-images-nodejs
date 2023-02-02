const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect("mongodb://localhost/multipleFileUpload");

const db = mongoose.connection;

db.on('error',function(){
    console.log("Error in connect with mongodb");
})

db.once('open',function(){
    console.log("Successfully connected with DB");
})

module.exports=db;