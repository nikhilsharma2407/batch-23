const express = require("express");
const { signup, login, addFriend, removeFriend, authMiddleware, loginWithCookie, generateResetCode, resetPassword, logout } = require("../controllers/userController");
const router = express.Router();



router.post('/signup',signup,generateResetCode);
router.post('/login',login);
router.patch('/addFriend',authMiddleware,addFriend);
router.patch('/removeFriend',authMiddleware,removeFriend);

router.get('/login',authMiddleware,loginWithCookie);
router.get('/logout',logout);
// router.patch('/generateQR',generateResetCode);
router.patch('/resetPassword',resetPassword);

router.all('/*',(req,res)=>{
    
    console.log(req.method,req.path);
    res.status(404);
    res.send("Invalid api endpoint");
})

module.exports = router;