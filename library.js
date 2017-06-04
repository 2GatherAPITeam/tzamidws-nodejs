var mongoose = require('mongoose');
var schema = mongoose.Schema;

var librarySchema = new schema({
    id: { type:String, index:1,required:true,unique:true },
    header : String,
    imgURL : String,
    storyURL : String,
}, {collection:'library'} );

var Library = mongoose.model('Library',librarySchema);
module.exports = Library;