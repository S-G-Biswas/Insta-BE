
const jwt =  require("jsonwebtoken")


const  auth =(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,'AccessToken')

        if(decoded){
            req.body.userID = decoded.userID
            req.body.name = decoded.name
            next()
        }
        else{
            res.send({"msg":"You are not authorised"})
        }
    }
    else{
        res.send({"msg":"You are not authorised"})
    }
}

module.exports={
    auth
}