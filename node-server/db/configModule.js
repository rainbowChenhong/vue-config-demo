/**
 * Created by issuser on 2017/8/22.
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    companyName : { type: String },
    address: {type: String},
    established: {type: String},
    subsidiary : { type: String} ,
    status:{type: Boolean},
    remark:{type: String},
    total:{type: String}
});
module.exports = mongoose.model('ConfigSchema',ConfigSchema);