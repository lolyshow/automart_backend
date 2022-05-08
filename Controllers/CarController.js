const { Validator } = require('node-input-validator');
const Car = require('../models/Car');
const multer = require("multer");
const {ResponsePayload } = require('../helper/helper');




const CreateCar =async(req,res)=>{
    console.log(req.body);
    const v = new Validator(req.body, {
        name:'required',
        quantity: 'required',
        description: 'required',
        photo:'required'
    });
    let validationFailed = true;
    console.log(req.user.user_id)
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
        const {name,quantity,amount,description} = req.body;
        const car = new Car({
            name:name,
            quantity: quantity,
            amount: amount,
            description,
            photo: req.file.filename
            // createdBy:req.user.user_id
        });
        try{
            await car.save((error)=>{
                if(!error){
                    let storage = multer.diskStorage({
                        destination: function(req, file, callback){
                            callback(null,"../public/storage/cars");
                        },
                        filename: function(req,file,callback){
                            callback(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
                        }
                    })
                    let upload = multer({
                        storage:storage,
                    }).single("image");

                    upload(req, res, function (err) {
                        if (err) {
                            console.log(err);
                            return res.end("Error uploading file.");
                        } else {
                            res.end("File has been uploaded");
                        }
                    });
                    let result = error.OK
                    logger.info(result);
                    return res.status(200).send(result)
                }else{
                    return res.status(400).json(ResponsePayload());
                }
            });
            return res.status(200).json(ResponsePayload(200,"Car Saved"));
        }
        catch(error)
        {
            console.log(error)
            return res.status(400).json(ResponsePayload());
        }
        
      }catch(error){
        // console.log(error)
        return res.status(400).json({ message : "Technical Error. Please try again later"});
      }
    }
}


const FetchAllCars =async(req,res)=>{

    try{
        let {size,page} = req.body;
        if(!page){
            page = 1;
        }

        if(!size){
            size=8;
        }

        const limit  = parseInt(size);
        const skip = (page -1) * limit;
        
         try{
             const cars = await Car.find().limit(limit).skip(skip)//get paginated Products
             res.status(200).json(ResponsePayload(200,"Success",cars))  
         }
         catch(error){
            
             console.log(error)
            res.status.json(ResponsePayload())
         }
    }
    catch(error){
        console.log(error)
    }
    
}


const JoinProductsWithUser =async(req,res)=>{

    try{
        Product.find({},(error,result)=>{
            if(error){
                console.log(error)
                res.status.json(ResponsePayload())
            }else{
                res.status(200).json(ResponsePayload(200,"Success",result))
            }
        })
        .populate({path:"createdBy",select:["name","email"]}) //returns only the selected columns
        // .populate("createdBy"); //this returns every thing 
    }
    catch(error){
        console.log(error)
    }
    
}

module.exports={
    CreateCar,
    FetchAllCars,
    JoinProductsWithUser
}

