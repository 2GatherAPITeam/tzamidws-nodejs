var mongoose = require('mongoose');
var Library = require('./library');
var fs = require('fs');



exports.getStories = function(req,res){
    console.log("getStorys: " );
    Library.find({}).select(' -_id').
    exec(function(err,docs){
        console.log("docs: " + docs);
        res.json({data:docs});
    return;
    });  

}


//add new user to system and save is detaisl in mlab
exports.removeStory = function(req,res){

    Library.find({id: req.body.storyId}).select(' -_id').
    exec(function(err,docs){

      fs.unlink(docs[0].storyURL, function(err) {
           if (err) {
              return console.error(err);
            }
            console.log(" story File deleted successfully!");
      }); 
      fs.unlink(docs[0].imgURL, function(err) {
           if (err) {
              return console.error(err);
            }
            console.log("img File deleted successfully!");
      });           

    });  

    console.log("inside remoev story")
    Library.findOneAndRemove({id: req.body.storyId}, function(err){
        if (err) return next(err);
        else{
            res.send("The Opreation Completed");
            return
        }
    });

};