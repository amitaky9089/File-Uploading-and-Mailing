//npm install cloudinary
//to built connection with server we use .config() method of cloudinary
// and we have to pass api_key,api_secret,
//importing cloudinary with version
const cloudinary=require("cloudinary").v2
require("dotenv").config()
exports.cloudinaryConnect=()=>{
    try{
          cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
          })
    }
    catch(error){
         console.log(error)
         console.log("Error in cloudinary setup")
    }
}