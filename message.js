var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    id: { type:String, index:1,required:true,unique:true },
    paragraph : String,
    command : String,
    linkExist: String, 
    url : String ,
    urlName : String 
}, {collection:'board_message'} );

var Message = mongoose.model('Message',userSchema);
module.exports = Message;