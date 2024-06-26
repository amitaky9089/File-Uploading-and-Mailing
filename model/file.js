const mongoose=require("mongoose")
const nodemailer=require("nodemailer")

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

fileSchema.post('save',async function(doc){
    //here this doc is same as entry created in db
    try{
          console.log("document ",doc)
          //creating transporter (whom is sending and which protocol they are using)
          let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
          })
          //sending email (information what we are sending to whom sendiing and content)
          let info=await transporter.sendMail({
            from:"Amit",
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Hello jee</h2> <p>Uploaded successfully view here: <a href=${doc.imageUrl}>${doc.imageUrl}</a></p>`,
          })
          console.log("info details here ", info)
    }catch(error){
        console.log("Error ",error);
    }
})

const File=mongoose.model("File",fileSchema)
module.exports=File;