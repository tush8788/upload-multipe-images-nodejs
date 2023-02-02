const express=require('express');
const router=express.Router();
const userController=require('../controller/user_controller');

router.post('/upload-images',userController.uploadFiles);

module.exports=router;