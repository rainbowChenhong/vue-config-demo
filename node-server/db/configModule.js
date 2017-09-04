/**
 * Created by issuser on 2017/8/22.
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    interfaceType : { type: String },
    companyId: {type: String},
    monitoringIndex: {type: String},
    warnLevel : { type: String} ,
    maxThresholdRange:{type: String},
    minThresholdRange:{type: String},
    period: {type: Number},
    status:{type: Number},
    remark: {type: String},
    external:{type: String},
    absoluteValue:{type: String},
});
module.exports = mongoose.model('ConfigSchema',ConfigSchema);