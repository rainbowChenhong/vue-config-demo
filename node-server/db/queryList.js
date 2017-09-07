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