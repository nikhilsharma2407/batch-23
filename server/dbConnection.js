const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(data=>{
    console.log("Connected to DB Successfully!!!");
}).catch(err=>{
    console.error(err);
})
