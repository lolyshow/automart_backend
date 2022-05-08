require("dotenv").config({ path: `${__dirname}/.env` });

const secretKey = process.env.secret;

const nameVal =()=>{

}

module.exports={
    secretKey,
    nameVal
}