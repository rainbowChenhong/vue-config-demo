/**
 * Created by issuser on 2017/8/22.
 */
var ConfigSchema = require("./configModule.js");
var utils = require('./utils');
function queryList(req, res) {
    var wherestr = utils.createJson(req.body);
    delete wherestr.pageSize;
    delete wherestr.currentPage;
    var pageSize = req.body.pageSize;
    var currentPage = req.body.currentPage;
    var interfaceType = [];
    if (req.body.interfaceType) {
        if (req.body.interfaceType.indexOf(',') >= 0) {
            var interfaceTypeString = req.body.interfaceType.split(',');
            if (interfaceTypeString.length === 1) {
                interfaceType.push(interfaceTypeString)
            }
            for (var i = 0; i < interfaceTypeString.length; i++) {
                interfaceType.push(interfaceTypeString[i])
            }
            delete wherestr.interfaceType;
            ConfigSchema.count(wherestr).where('interfaceType').in(interfaceType).exec(
                function (err, count) {
                    if (err) {
                        return
                    }
                    ConfigSchema.find(wherestr)
                        .sort({'_id': -1})
                        .where('interfaceType').in(interfaceType)
                        .skip((currentPage - 1) * pageSize)
                        .limit(pageSize)
                        .exec(function (err, docs) {
                            if (err) {
                                var resData = utils.createSuccess(500, '成功');
                                res.send(resData);
                                return
                            }
                            var resData = utils.createSuccessList(200, '成功', count, currentPage, docs);
                            res.send(resData)

                        })
                }
            );
            return
        }
    }
    ConfigSchema.count(wherestr, function (err, count) {
        if (err) {
            return
        }
        ConfigSchema.find(wherestr)
            .sort({'_id': -1})
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize)
            .exec(function (err, docs) {
                if (err) {
                    var resData = utils.createSuccess(500, '成功');
                    res.send(resData);
                    return
                }
                var resData = utils.createSuccessList(200, '成功', count, currentPage, docs);
                res.send(resData)
            })
    });
}
module.exports = queryList;