const mongoose=require("mongoose")
require("dotenv").config();

exports.connect=()=>{
     mongoose.connect(process.env.MONGODB_URL)
     .then(console.log("Connection with database successfull"))
     .catch((error)=>{
        console.log("Connection with database is facing some issue.")
        console.log(error)
        process.exit(1)
     })
}