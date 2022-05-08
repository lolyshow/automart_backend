const express = require('express');
const router = express.Router();
const CarController = require('../Controllers/CarController');
const auth = require("../middleware/Auth");
// let upload = multer({
//     storage:storage,
// }).single("image");

router.post('/createCar',auth, CarController.CreateCar);
router.post('/getAllProducts',auth, CarController.FetchAllCars);
router.post('/filterProducts',auth, CarController.JoinProductsWithUser);
module.exports = router;