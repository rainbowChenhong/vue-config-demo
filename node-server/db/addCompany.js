/**
 * Created by issuser on 2017/8/22.
 */
var ConfigSchema = require("./configModule.js");
var utils = require('./utils');
/**
 * 插入
 */
function addCompany(req, res) {
    var subsidiaryArray;
    var data = utils.createJson(req.body);
    var wherestr={
        companyName: req.body.companyName,
        established:req.body.established,
        address:req.body.address,
        subsidiary:req.body.subsidiary
}
    ConfigSchema.count(wherestr).exec(
        function (err, count) {
            if (err) {
                return
            }
            console.log(count);
            if(count){
                var resData = utils.createSuccess(500, '请勿重复填写');
                res.send(resData);
                return
            }else{
                var monInsert = new ConfigSchema(data);
                monInsert.save(function (error, docs) {
                    if (error) {
                        var resData = utils.createSuccess(500, '成功');
                        res.send(resData);
                        return
                    }
                    var resData = utils.createSuccess(200, '成功');
                    res.send(resData);
                });
            }
        }
    );
};


module.exports = addCompany;
