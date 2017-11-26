var $ = function(id){ return document.getElementById(id); };

var username = $('username');
var password = $('password');
var submitBtn = $('submitBtn');

/*
	formSubmit函数此处承担了两个职责
	除了提交ajax请求之外，还要验证用户输入的合法性。
	这种代码一来会造成函数臃肿，职责混乱，二来谈不上任何可复用性
*/
var formSubmit = function(){
	if(username.value === '') return alert('用户名不能为空');
	if(password.value === '') return alert('密码不能为空');

	var param = {
		username: username.value,
		password: password.value
	};

	ajax('http://www.baidu.com', param);
};

submitBtn.onclick = formSubmit;