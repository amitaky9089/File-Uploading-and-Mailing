const File=require("../model/file");
const cloudinary=require("cloudinary").v2;


//uploading file on server

exports.localFileUpload=async(req,res)=>{
    try{
        //fetching file (file is name of our file)
        const file=req.files.file;
        console.log("Here is our file ",file)
        //defining path to our server
        //files is a folder inside our controller so we have to make it
        //numeric value name of this Date.now is our file name
        //now we added extension to open our file `.${file.name.split('.')[1]}`
        //this is how we can store media inside server
        //create path where files needs to be stored on server
        //Date.now() give current time in milliseconds
        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`
        console.log("this is path ",path)
        //we use mv(move) function to upload our file on server path.
        file.mv(path,(err)=>{
            console.log(err)
        })
        res.json({
            success:true,
            message:"file uploaded successfully."
        })

    }catch(error){
        console.log(error)
    }
}

//uplaoding image 

//used to check whether img have supported type or not
function isFileTypeSupported(type,supportedTypes){
     return supportedTypes.includes(type);
}
//used to upload file on cloudinary
async function uploadFileToCloudinary(file,folder,quality){
    const options={folder}
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto"
    console.log("temp file path",file.tempFilePath)
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}
exports.imageUpload=async(req,res)=>{
    try{
       //fetching data
       const{name,tags,email}=req.body;
       console.log(name,tags,email)
       //fetching image file
       const file=req.files.imageFile
       console.log(file)
       //validation
       const supportedTypes=["jpg","jpeg","png"];
       const fileType=file.name.split('.')[1].toLowerCase();
       if(!isFileTypeSupported(fileType,supportedTypes)){
          return res.status(400).json({
            success:false,
            message:"File format not supported."
          })
       }
       // if format supported then
       const response= await uploadFileToCloudinary(file,"Codehelp")
       console.log(response);
       //in response in secure url our image is present.
       // we use this secure url in our db image url
       //creating entry in db
       const fileData=await File.create({
        name,imageUrl:response.secure_url,tags,email, 
       })
       
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image uploaded successfully to cloudinary"
        })
    }catch(error){
       console.error(error);
       res.status(400).json({
        success:false,
        message:"Something went wrong while uploading image"
       })
    }
}


// uploading videos

exports.videoUpload=async(req,res)=>{
    try{
        //fetching data from req
        const{name,tags,email}=req.body;
        console.log(name,tags,email);
        //fetching video file
        const file=req.files.videoFile;
        console.log(file);
        //validation of videofiel
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype ",fileType)
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                 success:false,
                 message:"Video format is not supported"
            })
        }
        //if supported then we have to upload it on cloudinary
        const response=await uploadFileToCloudinary(file,"Codehelp")
        console.log(response)
        //creating entry in db
        const fileData=await File.create({
            name,imageUrl:response.secure_url,tags,email,
        })
        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully"
        })
    }catch(error){
        console.error("error in video is",error)
        res.status(400).json({
            success:false,
            message:"Error while video uploading"
        })
    }
}


// image reducer 
// adding just quality parameter 

exports.imageSizeReducer=async(req,res)=>{
    try{
        //fetching data from req
        const{name,tags,email}=req.body;
        console.log(name,tags,email);
        //fetching video file
        const file=req.files.imageFile;
        console.log(file);
        //validation of videofiel
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype ",fileType)
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                 success:false,
                 message:"Video format is not supported"
            })
        }
        //if supported then we have to upload it on cloudinary
        const response=await uploadFileToCloudinary(file,"Codehelp",30)
        console.log(response)
        //creating entry in db
        const fileData=await File.create({
            name,imageUrl:response.secure_url,tags,email,
        })
        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Reduce image uploaded successfully"
        })
    }catch(error){
        console.error("error in video is",error)
        res.status(400).json({
            success:false,
            message:"Error while reduced image uploading"
        })
    }
}