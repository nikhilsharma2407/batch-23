const { verifyPasswordHash, generatePasswordHash } = require("../utils/passwordUtil");
const { responseCreator, errorCreator } = require("../utils/responseHandler");
const UserModel = require("../models/userModel");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const { generateQRcode, verifyOTP } = require("../utils/totpUtil");

const signup = async (req, res, next) => {
    try {
        const userData = req.body;
        userData.password = await generatePasswordHash(userData.password);
        const data = await UserModel.createUser(userData);
        if (data) {
            res.status(201);
            next();
            // res.send(`user ${userData.username} created successfully!!!`);
        }
    } catch (error) {
        next(error);
    }
};

const loginWithCredentials = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { password: pwdHash, ...userData } = await UserModel.getUser(username);
        if (await verifyPasswordHash(password, pwdHash)) {
            const token = generateToken(userData);
            console.log(token);
            res.cookie('token', token, { httpOnly: true, maxAge: 3600 * 1000 });
            res.status(200);
            res.send(responseCreator(`${username} logged in successfully`, userData));
        } else {
            errorCreator("Incorrect Password!!!", 401);
        }

    } catch (error) {
        next(error);
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const data = verifyToken(token);
        const { password, ...userData } = await UserModel.getUser(data.username);
        if (userData) {
            res.locals.userData = userData;
            next();
        }
    } catch (error) {
        next(error);
    }
};


const loginWithCookie = async (req, res, next) => {
    try {
        res.send(responseCreator("User authenticated with Cookie", res.locals.userData));
    } catch (error) {
        next(error);
    }
};

const addFriend = async (req, res, next) => {
    try {
        const { username } = res.locals.userData;
        console.log("username", "addFriend");
        const { id, name } = req.body;
        const data = await UserModel.updateFriend(username, id);
        if (data) {
            res.status(200);
            res.send(responseCreator(`You're now friends with ${name}`,data.friendList))
        }
    } catch (error) {
        next(error);
    }
};

const removeFriend = async (req, res, next) => {
    try {
        const { username } = res.locals.userData;
        const { id, name } = req.body;
        const data = await UserModel.updateFriend(username, id, false);
        if (data) {
            res.status(200);
            res.send(responseCreator(`You're no longer friends with ${name}`,data.friendList))
        }
    } catch (error) {
        next(error);
    }
};

const generateResetCode = async (req, res, next) => {
    try {
        const { data, secret } = await generateQRcode();
        const { username } = req.body;
        const userUpdated = await UserModel.updateUser(username, { secret });
        if (userUpdated) {
            res.send(`
            <h1>user ${username} created successfully!!!</h1>
            <h1>Two Factor authentication setup</h1>
            <h2>Please scan the QR code with Google Authenticator</h2>
            <img src="${data}"/>`);
        }
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { username, password:pwd, token } = req.body;
        const user = await UserModel.getUser(username);
        const { secret } = user;
        const isOTPvalid = verifyOTP(token, secret);
        if (isOTPvalid) {
            const password = await generatePasswordHash(pwd);
            const userUpdated = await UserModel.updateUser(username, { password});
            if (userUpdated) {
                res.send(responseCreator(`Password updated successfully for ${username}`));
            } else {
                errorCreator("Something Went wrong!!!");
            }
        } else {
            errorCreator('Invalid OTP', 403);
        }
    } catch (error) {
        next(error);
    }

}

const logout = async (req,res,next)=>{
    res.clearCookie('token');
    res.send(responseCreator("User logged out successfully!!!"))
}

module.exports = { login: loginWithCredentials, signup, addFriend, removeFriend, loginWithCookie, authMiddleware, generateResetCode, resetPassword,logout };