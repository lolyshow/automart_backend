const express = require('express');

const AuthRoutes = require('./Routes/Auth');
const AppRoute = require('./Routes/AppRoutes');
const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/.env` });
const app = express();
const app2 = express();
mongoose.connect(process.env.CONNECTIONSTRING,(err,connected)=>{

    if(err){
        console.log("Error: "+err);
        return;
    }else{
        console.log("db Connected Successfully");
    }
    
});

app.use(express.urlencoded());

app.use("/api/auth",AuthRoutes);
app2.use("/api/app",AppRoute);
const listener = app.listen(process.env.PORT || 3000,() => {
    console.log('App is listening on port ' +listener.address().port);
})