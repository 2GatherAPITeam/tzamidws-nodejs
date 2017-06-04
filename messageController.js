var mongoose = require('mongoose');
var Message = require('./message');


exports.formEvent = function(req,res){
    
    console.log("inside form event");
        res.send("ההרשמה בוצע בהצלחה!");
    return;
};  


//get user matcher details and the image url of the user system
exports.getMessage = function(req,res){
    
    Message.find({}).select(' -_id').
    exec(function(err,docs){
        console.log("docs: " + docs);
        res.json({data:docs});
    return;
    });  

}


exports.removeMessage = function(req,res){
    
    Message.findOneAndRemove({id: req.body.paragraphNumber}, function(err){
        if (err) return next(err);
        else{
            res.send("The Opreation Completed");
            return
        }

    });

};

//add new user to system and save is detaisl in mlab
exports.addMessage = function(req,res){
    console.log("inside add message: " + req.body.url);
    
    Message.find({'id': req.body.paragraphNumber }).select('id').
    exec(function(err,result){
        if (err) return next(err);
        if(result == ""){
             console.log("paragraph id not exist");
           //define new user for save it in mlab
            newMessage = new Message({
                 id: req.body.paragraphNumber,
                 paragraph: req.body.content,
                 command: req.body.commandVoice,
                 linkExist:  req.body.linkExist,
                 url: req.body.url,
                 urlName: req.body.linkName
           });

            newMessage.save(function(err,doc){
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
            res.send("paragraph id Exist enter Another No'");
        }
        
    });  
}