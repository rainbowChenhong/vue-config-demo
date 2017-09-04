/**
 * Created by issuser on 2017/8/21.
 */
var express=require('./node_modules/express');
var logger = require('./node_modules/morgan');
var addConfig=require('./db/addConfig.js');
var queryList=require('./db/queryList.js');
var updateConfig=require('./db/updateConfig.js');
var deleteConfig=require('./db/deleteConfig.js');
var bodyParser = require('./node_modules/body-parser');
var env = process.env.NODE_ENV || 'production';
var app=express();
app.use(express.static(__dirname+"./../static"));
app.use(logger('dev'));
app.listen("8088",function(){
    console.log("服务器启动，端口号为8088")
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/config/query_config_list',function (req,res) {
    queryList(req,res)
});
app.post('/config/add_config',function (req,res) {
    addConfig(req,res);
});
app.post('/config/update_config',function (req,res) {
    updateConfig(req,res);
});
app.post('/config/delete_config',function (req,res) {
    deleteConfig(req,res);
});