const express = require("express")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")
const userRouter = express.Router()
const {UserModel} = require("../model/user.model")

//Addition of user

userRouter.post("/register",async(req,res)=>{
   
    const  {username,email,password,city,age,gender}= req.body;

    try {
        bcrypt.hash(password,8,async(err,hash)=>{
            if(err){
                res.status(400).send({"Error":err})
            }
            else{
                const user = new UserModel({username,email,password:hash,city,age,gender});
                await user.save();
                res.status(200).send({"msg":"New user has been added"})
            }
        })
    } catch (error) {
         res.status(400).send({"Error":error})
    }
})


//user Authentication
userRouter.post("/login", async(req,res)=>{
     const {email,password} = req.body
   
     try {
          const user = await UserModel.findOne({email})
          bcrypt.compare(password,user.password,(err,result)=>{
             if(result){
               const  accessToken = jwt.sign({userID:user._id,name:user.username},'AccessToken')
               res.status(200).send({"msg":"Login Successfull",accessToken})
             }
             else{
                res.status(400).send({"msg":"User Not Found.."})
             }
          });
     } catch (error) {
         res.status(400).send({"msg":error})
     }
    })


module.exports={
    userRouter
}