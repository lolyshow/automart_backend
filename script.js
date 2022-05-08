const mogoose = require("mongoose");
const dotenv = require("dotenv").config({ path: `${__dirname}/.env` });
mogoose.connect(process.env.CONNECTIONSTRING, ()=>{
    console.log("connected!!");
})