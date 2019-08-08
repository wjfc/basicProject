"use strict";
const express = require('express');
const path = require('path');
const app = express();
const request = require('request');

// 配置静态文件服务中间件
let serverUrl = 'http://122.193.10.171:8082/'; //server地址
app.use(express.static(path.join(__dirname, './'))); //静态资源index.html和node代码在一个目录下
//allow custom header and CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use('/', function(req, res) {
    console.log(req)
    let url = serverUrl + req.url;
    req.pipe(request(url)).pipe(res);
});


app.listen(3000, '127.0.0.1', function() { //前端ajax地址写 http://127.0.0.1:3000/
    console.log('server is running at port 3000');
});