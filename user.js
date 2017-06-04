var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    nickName: { type:String, index:1,required:true,unique:true },
    password : Number,
    mail : String,
    lang : String,
    device : String,
    utils : String,
}, {collection:'users'} );

var User = mongoose.model('User',userSchema);
module.exports = User;