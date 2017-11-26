var $ = function(id){ return document.getElementById(id); };

var username = $('username');
var password = $('password');
var submitBtn = $('submitBtn');

// 改写before函数
Function.prototype.before = function(beforeFn){
	var _self = this;

	return function(){
		// beforeFn函数返回false的情况下，不在执行后面的原函数
		if(beforeFn.apply(this, arguments) === false) return;
		return _self.apply(this, arguments);
	};
};

var validate = function(){
	if(username.value === ''){
		alert('用户名不能为空');
		return false;
	}
	if(password.value === ''){
		alert('密码不能为空');
		return false;
	}
};

var formSubmit = function(){
	var param = {
		username: username.value,
		password: password.value
	};

	ajax('http://www.baidu.com', param);
};

// 给formSubmit装饰validate功能
formSubmit = formSubmit.before(validate);

submitBtn.onclick = formSubmit;