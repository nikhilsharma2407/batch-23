const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type:String,
    required:[true,"name is mandatory!!!"]
  },
  username: {
    type:String,
    unique:true,
    required:[true,"username is mandatory!!!"]
  },
  password: {
    type:String,
    validate:{
        validator: (value)=>value.length>=8,
        message: (data)=>"Password should be atleast 8 characters!!!"
    }
  },
  friendList: {
    type:[String],
  }
});


userSchema.statics.signup = async (req,res,next)=>{
    try {
        const userData = req.body;
        const data = await UserModel.create(userData);
        console.log(data);
        if(data){
            res.status(201);
            res.send(`user ${userData.username} created successfully!!!`);
        }

    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({success:false,message:error.message});
    }
};

userSchema.statics.login = async (req,res,next)=>{
    try {
        const {username,password} = req.body;
        const userData = await UserModel.findOne({username},{_id:0,__v:0});
        if(userData){
          // user Exists, match pwd now
            if(password ===userData.password){
              res.status(200);
              res.send({success:true,message:`${username} logged in successfully`,data:userData});
            }else{
              const err = new Error("Incorrect Password!!!");
              err.status = 401;
              throw(err);
            }
        }else{
          const err = new Error("user does not exists!!!");
          err.status = 404;
          throw(err)
        }

    } catch (error) {
        console.log(error);
        res.status(error.status || 500);
        res.send({success:false,message:error.message});
    }
};

userSchema.statics.addFriend = async (req,res,next)=>{
    try {
        const {username,id,name} = req.body;
        const data = await UserModel.updateOne({username},{$addToSet:{friendList:id}});
        if(data.modifiedCount){
          res.status(200);
          res.send({success:true,message:`You're now friends with ${name}`})
        }else{
          const err = new Error("Something went wrong!!!");
          err.status = 500;
          throw(err)
        }

    } catch (error) {
        console.log(error);
        res.status(error.status || 500);
        res.send({success:false,message:error.message});
    }
};

userSchema.statics.removeFriend = async (req,res,next)=>{
    try {
        const {username,id,name} = req.body;
        const data = await UserModel.updateOne({username},{$pull:{friendList:id}});
        if(data.modifiedCount){
          res.status(200);
          res.send({success:true,message:`You're no longer friends with ${name}`})
        }else{
          const err = new Error("Something went wrong!!!");
          err.status = 500;
          throw(err)
        }

    } catch (error) {
        console.log(error);
        res.status(error.status || 500);
        res.send({success:false,message:error.message});
    }
};

const UserModel = mongoose.model('users',userSchema);
const handler = (req,res,next)=>{};


module.exports = {UserModel,handler};
