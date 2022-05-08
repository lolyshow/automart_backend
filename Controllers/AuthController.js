let bcrypt = require('bcryptjs');
const User= require('../models/User');
const { Validator } = require('node-input-validator');
require("dotenv").config({ path: `../${__dirname}/.env` });
const jwt = require("jsonwebtoken");
const { AuthSuccessResponse, AuthFailureResponse } = require('../helper/helper');
const config = process.env.secret;

const Register =async(req,res)=>{

    const v = new Validator(req.body, {
        name:'required',
        email: 'required|email',
        password: 'required',
        location:'required'
    });
    let validationFailed = true;
    
    await v.check().then((matched) => {
      if (!matched) {
        validationFailed = true;
      }else{
        validationFailed = false;
      }
    });

    if(validationFailed === true){
      res.status(422).send({...v.errors, status:303});
    }
    else{

      try {
        const {email,password,location,name} = req.body;
        const oldUser = await User.findOne({email});
        if(!oldUser){
          let hashedPassword = bcrypt.hashSync(password, 8);
          const newUser = new User({
              name:name,
              email:email,
              password:hashedPassword,
              location:location,
          });

          try{
            const token = jwt.sign(
              { user_id: newUser._id, email },
              config,
              {
                expiresIn: "2h",
              }
            );
            await newUser.save();
              return res.status(200).json(AuthSuccessResponse(newUser,token));
            }
            catch(error) {
            return res.status(400).json({ message : error.message});
          }
        }else{
          return res.status(202).json({ message : "This email "+email+" already exists"});
        }
      }catch(error){
        // console.log(error)
        return res.status(400).json({ message : "Technical Error. Please try again later"});
      }
    }
}




const Login = async(req, res)=>{
  const v = new Validator(req.body, {
    email: 'required|email',
    password: 'required',
    
  });
  
  v.check().then((matched) => {
    if (!matched) {
      console.log("insideHererere");
      return res.status(422).send(v.errors);
    }
  });
  
  // login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.secret,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      
      // user
      res.status(200).json(AuthSuccessResponse(user,token));
    }else{
      res.status(300).json(AuthFailureResponse());
    }
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ message : "Technical Error. Please try again later"});  
  }
  // Our register logic ends here
}
module.exports={
    Register,
    Login
}

