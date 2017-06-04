var mongoose = require('mongoose');
var Device = require('./device');


//get user matcher details and the image url of the user system
exports.getDevices = function(req,res){
    
    Device.find({}).select(' -_id').
    exec(function(err,docs){
        console.log("docs: " + docs);
        res.json({data:docs});
    return;
    });  

};

exports.removeDevice = function(req,res){
    
    Device.findOneAndRemove({productNumber: req.body.productNumber}, function(err){
        if (err) return next(err);
        else{
            res.send("The Opreation Completed");
            return
        }

    });

};

//add new user to system and save is detaisl in mlab
exports.addDevice = function(req,res){
    console.log("inside addDevice");
    
    Device.find({'productNumber': req.body.productNumber }).select('productNumber').
    exec(function(err,result){
        if (err) return next(err);
        if(result == ""){
             console.log("device not exsit");
           //define new user for save it in mlab

            newDevice = new Device({
                 productNumber: req.body.productNumber,
                 productId: req.body.productId,
                 vendorId: req.body.vendorId,
                 productName : req.body.productName,
            });

            newDevice.save(function(err,doc){
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
