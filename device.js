var mongoose = require('mongoose');
var schema = mongoose.Schema;

var deviceSchema = new schema({
    productNumber: { type:String, index:1,required:true,unique:true },
    productId : String,
    vendorId : String,
    productName : String,
}, {collection:'devices'} );

var Device = mongoose.model('Device',deviceSchema);
module.exports = Device;