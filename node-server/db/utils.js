/**
 * Created by issuser on 2017/8/22.
 */
var qs=require('./../node_modules/qs');
function createJson(data) {
    var jsonData={};
    for(var p in data){
        if(data[p]!==null && data[p]!==""){
            jsonData[p]=data[p];
        }
    }
    return jsonData
}
function createSuccess(code,mes,data) {
    var successData={};
    console.log(data)
    if(data!==undefined && data!=="" && data.length>0){
        successData.data=data;
    }
    successData.code=code;
    successData.mes=mes;
    return successData
}
function createSuccessList(code,mes,count,currentPage,data) {
    var successData={};
    if(data!==undefined && data!=="" && data.length>0){
        successData.data=data;
    }
    successData.code=code;
    successData.mes=mes;
    successData.count=count;
    successData.currentPage=currentPage;
    return successData
}
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(qs){
        str = qs.stringify(obj), //系列化对象
            newobj = qs.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
}
module.exports = {'createJson':createJson,'createSuccess':createSuccess,'cloneObj':cloneObj,'createSuccessList':createSuccessList};