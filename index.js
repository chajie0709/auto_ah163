var request = require('request')
var t = require("./util")
var token_data = process.env.TOKEN_DATA


function getToken(a) {
	var s = JSON.parse(t.Decrypt(a))
	var i = JSON.parse(s.data)
	var h = i.token;
	return h
}

var a = {
	queryDate: t.formatTime(new Date()),
	phone: getToken(token_data)
}

var headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.14(0x18000e2c) NetType/4G Language/zh_CN',
    'Content-Type': 'application/json',
    'Referer': 'https://servicewechat.com/wxd4e4a53c00d1a511/0/page-frame.html',
    'Connection': 'keep-alive',
    'Host': 'llhb.ah163.net'
}

var body = '{"para":"'+t.Encrypt(JSON.stringify(a))+'"}'

var options = {
    url: 'https://llhb.ah163.net/ah_red_come/app/userSign',
    method: 'POST',
    headers: headers,
    body: body
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(t.Decrypt(body)))
    }
}

if(!token_data){
	return console.log('请设置TOKEN_DATA!')
}else{
	request(options, callback)
}

