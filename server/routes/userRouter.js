const express = require("express");
const router = express.Router();

const {UserModel,handler} = require("../models/userModel");


router.post('/signup',UserModel.signup);
router.post('/login',UserModel.login);
router.post('/handler',handler);

router.all('/*',(req,res)=>{
    
    console.log(req.method,req.path);
    res.status(404);
    res.send("Invalid api endpoint");
})

module.exports = router;