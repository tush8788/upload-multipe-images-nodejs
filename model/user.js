const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');

const IMAGES_PATH=path.join('/upload/images');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    images:[{
        type:String
    }]
},{
    timestamps:true
});

//storage engine 
let storeage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,"..",IMAGES_PATH));
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+"-"+Date.now());
    }
})

// file filter
let fileFilter=(req,file,callback)=>{
    // Reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        callback(null, true);
    }else{
        callback(null,false);
        // callback(new Error('File type not supported'));
    }
}

//static functions 
userSchema.statics.uploadImages=multer({
    storage:storeage,
    limits:{
        fileSize:1000000  // its take value in bytes  ---> its around 1mb 
    },
    fileFilter:fileFilter //finding correct file uploading or not 
}).array("allImages",8); //allImages is html name attribute name and 8 is how many files are upload max

userSchema.statics.IMAGES_PATH=IMAGES_PATH;

const User=mongoose.model('User',userSchema);

module.exports=User;
