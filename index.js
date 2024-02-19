
const express = require("express");
require("dotenv").config();
const {connection} = require("./config/db") 
const {userRouter} = require("./routes/user.route")
const {pictureRouter} = require("./routes/picture.router")

const  app = express();
app.use(express.json());
app.use("/users",userRouter)
app.use("/pictures",pictureRouter)

app.get("/", (req,res)=>{
   res.send({"msg":"This is Home Route"})
})


//Database connection

app.listen(process.env.PORT, async() => {
    try {
          await connection
          console.log("Connected to DB");
          console.log(`Server is running at port ${process.env.PORT}`);
    } catch (error) {
        console.log("Error",error);
    }
})