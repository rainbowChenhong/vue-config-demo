/**
 * Created by issuser on 2017/8/21.
 */
var mongoose = require('../node_modules/mongoose'),
    DB_URL = 'mongodb://localhost:27017/test';
//连接数据库
mongoose.connect(DB_URL,function(err){
    if(err){
        throw err;
    }else{
        console.log('数据库连接成功...');
    }
});
/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports=mongoose;