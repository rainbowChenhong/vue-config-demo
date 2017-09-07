/**
 * Created by issuser on 2017/8/24.
 */
var ConfigSchema = require("./configModule.js");
var utils=require('./utils');
function deleteCompany(req,res) {
    ConfigSchema.findByIdAndRemove = function (id, options, callback) {
        if (1 === arguments.length && 'function' == typeof id) {
            throw new TypeError('参数错误')
        }
        return this.findOneAndRemove({ _id: id }, options, callback);
    };
    ConfigSchema.findByIdAndRemove({_id:req.body.id},{},function (err, docs) {
        if (err) {
            var resData=utils.createSuccess(500,'成功');
            res.send(resData)
        }
        else {
            var resData=utils.createSuccess(200,'成功');
            res.send(resData)
        }
    })
}
module.exports = deleteCompany;