/**
 * Created by issuser on 2017/8/22.
 */
var ConfigSchema = require("./configModule.js");
var utils=require('./utils');
function updateCompany(req,res) {
    var id=req.body.id;
    var updatestr=utils.createJson(req.body);
     delete updatestr.id;
    if(Object.keys(updatestr).length !== 0){
        ConfigSchema.findByIdAndUpdate(id, updatestr, function (err, docs) {
            if (err) {
                var resData=utils.createSuccess(500,'成功');
                res.send(resData)
            }
            else {
                var resData=utils.createSuccess(200,'成功');
                res.send(resData)
            }
        });
    }else{
        var resData=utils.createSuccess(201,'参数有误');
        res.send(resData)
    }

};
module.exports = updateCompany;