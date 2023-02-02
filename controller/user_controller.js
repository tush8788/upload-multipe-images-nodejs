const UserDB=require('../model/user')

module.exports.uploadFiles= async function(req,res){
    try{
        UserDB.uploadImages(req,res,async function(err){
            if(err){
                console.log("eoorrrr:: "+err);
                return res.redirect('back');
            }

            //finding user in DB
            let user = await UserDB.findOne({email:req.body.email});
            //if user is not found then create new
            if(!user){
               user=await UserDB.create({email:req.body.email}); 
            }

            if(req.files){
                // console.log(req.files);
                for(data of req.files){
                    // console.log(data);
                    user.images.push(UserDB.IMAGES_PATH+'/'+data.filename);
                }
                user.save();
            }
            return res.redirect("back");
        })
        // console.log("validation :"+UserDB.fileFilter(req))
    }
    catch(err){
        console.log("Error in :: ",err);
        return res.redirect('back');
    }
}