/**
 * Created by issuser on 2017/8/21.
 */
var express=require('./node_modules/express');
var logger = require('./node_modules/morgan');
var addCompany=require('./db/addCompany.js');
var queryList=require('./db/queryList.js');
var updateCompany=require('./db/updateCompany.js');
var deleteCompany=require('./db/deleteCompany.js');
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
app.post('/company/query_company_list',function (req,res) {
    queryList(req,res)
});
app.post('/company/add_company',function (req,res) {
    addCompany(req,res);
});
app.post('/company/update_company',function (req,res) {
    updateCompany(req,res);
});
app.post('/company/delete_company',function (req,res) {
    deleteCompany(req,res);
});