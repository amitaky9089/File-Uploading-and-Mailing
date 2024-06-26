//app creation
const express=require("express");
const app=express();

//port
require("dotenv").config();
PORT=process.env.PORT

//middleware
app.use(express.json());
//npm install express-fileupload
const fileupload=require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));
//by using this middleware we upload our files

//db connection
const db=require("./config/database");
db.connect();

//cloudinary connection
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//routes
const Upload=require("./routes/fileUpload")
app.use("/api/v1/upload",Upload)

//app listen
app.listen(PORT,()=>{
    console.log(`Sever is running successfully at ${PORT} PORT.`)
})