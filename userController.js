var mongoose = require('mongoose');
var User = require('./user');

//get user matcher details and the image url of the user system
exports.getUsers = function(req,res){
    
    User.find({}).select(' -_id').
    exec(function(err,docs){
        console.log("docs: " + docs);
        res.json({data:docs});
    return;
    });  

};

exports.removeUser = function(req,res){
    
    User.findOneAndRemove({nickName: req.body.nickName}, function(err){
        if (err) return next(err);
        else{
            res.send("The Opreation Completed");
            return
        }

    });

};


//add new user to system and save is detaisl in mlab
exports.addNewUser = function(req,res){
    console.log("inside add user");
    console.log("nickName: " + req.body.device);
    
    User.find({'nickName': req.body.nickName }).select('nickName').
    exec(function(err,result){
        if (err) return next(err);
        if(result == ""){
             console.log("user not exsit");
           //define new user for save it in mlab
            newUser = new User({
                 nickName: req.body.nickName,
                 password: req.body.password,
                 lang: req.body.lang,
                 mail : req.body.mail,
                 device: req.body.device,
                 utils : req.body.utils,
            });

            newUser.save(function(err,doc){
                if(err)
                    console.log(err);
                 else{
                    console.log("\n saved doc: " + doc);
                    //if the user register to the system we direct him to index page
                    // res.redirect('http://shenkar.html5-book.co.il/2015-2016/ws1/dev_185/timeLine.html?uuid='+doc._id);
                    res.send("The Opreation Completed");
                    return;
                 }
            });
        }
        else{
            console.log("user exsit");
            res.send("User Exist Fine Another NickName");
        }
        
    });  
}

