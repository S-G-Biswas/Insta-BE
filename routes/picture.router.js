const express = require("express")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")
const pictureRouter = express.Router()
const {pictureModel} = require("../model/picture.model")
const {auth} = require("../middleware/auth")

//Addition picture

pictureRouter.post("/",auth,async(req,res)=>{
   
    try {
        const picture = new pictureModel(req.body)
        await picture.save()
        res.status(200).send({"msg": "Picture added successfully!"})
    } catch (error) {
         res.status(400).send({"Error":error})
    }
})

//Getting all pictures

pictureRouter.get("/",auth,async(req,res)=>{
    try {
        const picture = await pictureModel.find({userID:req.body.userID})
        res.status(200).send({picture})
    } catch (error) {
        res.status(400).send({"Error":error})
    }
})

//Updating pictures

pictureRouter.patch("/:pictureID",auth,async(req,res)=>{

    const {pictureID} = req.params
    try {
        const picture = await pictureModel.findOne({_id:pictureID})
         if(picture.userID === req.body.userID){
            await pictureModel.findByIdAndUpdate({_id:pictureID},req.body)
            res.status(200).send({"msg":"The picture is updated"})
         }
         else{
            res.status(400).send({"msg":"you are not authorised"})
         }
        
    } catch (error) {
        res.status(400).send({"Error":error})
    }
})


//Deleteing pictures
pictureRouter.delete("/:pictureID",auth,async(req,res)=>{

    const {pictureID} = req.params
    try {
        const picture = await pictureModel.findOne({_id:pictureID})
         if(picture.userID === req.body.userID){
            await pictureModel.findByIdAndDelete({_id:pictureID})
            res.status(200).send({"msg":"The picture is deleted"})
         }
         else{
            res.status(400).send({"msg":"you are not authorised"})
         }
        
    } catch (error) {
        res.status(400).send({"Error":error})
    }
})




module.exports={
    pictureRouter
}