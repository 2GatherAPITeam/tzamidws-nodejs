var express = require('express');

var app = express();
var DAOusers = require('./userController.js');
var DAOmessage = require('./messageController.js');
var DAOlibrary = require('./libraryController.js');
var DAOdevice = require('./deviceController.js');

var bodyParser = require('body-parser');
var fs = require('fs');

var multer  = require('multer')
var upload = multer({ dest: 'C:/dev/2gatherapi-js/includes/new-library/' });
var mongoose = require('mongoose');
var Library = require('./library');

var port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set('port',port);
app.use('/',express.static('./public'));
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces',4);
    res.set("Content-Type", "application/json");
    next();
});

//insert json files to db
app.post('/tsamid/addNewUser',DAOusers.addNewUser);
app.post('/tsamid/removeUser',DAOusers.removeUser);
app.get('/tsamid/getUsers',DAOusers.getUsers);

app.get('/tsamid/getMessages',DAOmessage.getMessage);
app.post('/tsamid/addMessages',DAOmessage.addMessage);
app.post('/tsamid/removeMessages',DAOmessage.removeMessage);

app.post('/tsamid/formEvent',DAOmessage.formEvent);

app.get('/tsamid/getStories',DAOlibrary.getStories);
app.post('/tsamid/removeStory',DAOlibrary.removeStory);

app.get('/tsamid/getDevices',DAOdevice.getDevices);
app.post('/tsamid/addDevice',DAOdevice.addDevice);
app.post('/tsamid/removeDevice',DAOdevice.removeDevice);



var cpUpload = upload.fields([{ name: 'storyFile', maxCount: 1 }, { name: 'imgFile', maxCount: 1 }])
app.post('/tsamid/addStories', cpUpload, function (req, res) {

  console.log("inside addStories");

  Library.find({'id': req.body.storyId }).select('id').
    exec(function(err,result){
        if (err) return next(err);
        if(result == ""){
            console.log("storyId id not exist: " + req.body.storyId);
           
              //add story and story img to des that i defined 
              fs.rename('C:/dev/2gatherapi-js/includes/new-library/'+req.files["storyFile"][0].filename, 
                        'C:/dev/2gatherapi-js/includes/new-library/'+req.body.header+'.txt', function(err) {
                if ( err ) console.log('ERROR:1 ' + err);
              });

                fs.rename('C:/dev/2gatherapi-js/includes/new-library/'+req.files["imgFile"][0].filename, 
                        'C:/dev/2gatherapi-js/includes/new-library/'+req.body.header+'.png', function(err) {
                if ( err ) console.log('ERROR:1 ' + err);
              });

                newLibrary = new Library({
                 id: req.body.storyId,
                 header: req.body.header,
                 storyURL: 'includes/new-library/'+req.body.header+'.txt',
                 imgURL:  'includes/new-library/'+req.body.header+'.png'
                });

                newLibrary.save(function(err,doc){
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
            res.send("Story id Exist enter Another No'");
        }
    })

})

app.listen(port);
console.log("service is listeing on port: " + port);