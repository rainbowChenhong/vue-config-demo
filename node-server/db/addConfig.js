/**
 * Created by issuser on 2017/8/22.
 */
var ConfigSchema = require("./configModule.js");
var utils = require('./utils');
/**
 * 插入
 */
function addConfig(req, res) {
    var data = req.body;
    var interfaceTypeArray;
    var dataArray = [];
    var wherestr={
        companyId: req.body.companyId,
        monitoringIndex:req.body.monitoringIndex,
        warnLevel:req.body.warnLevel
}
    interfaceTypeArray = data.interfaceType.split(",");
    for (var i = 0; i < interfaceTypeArray.length; i++) {
        if (interfaceTypeArray[i]) {
            var item = utils.cloneObj(data);
            item.interfaceType = interfaceTypeArray[i];
            dataArray.push(item);
        }
    }
    ConfigSchema.count(wherestr).where('interfaceType').in(interfaceTypeArray).exec(
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
                ConfigSchema.insertMany(dataArray, function (error, docs) {
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


module.exports = addConfig;
