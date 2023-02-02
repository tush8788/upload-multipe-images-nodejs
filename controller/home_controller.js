const UserDB=require('../model/user');

module.exports.home=async function(req,res){
    try{
        let user = await UserDB.find({});

        return res.render('home',{
            title:"Home",
            userDATA:user
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
