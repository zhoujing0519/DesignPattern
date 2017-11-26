var $ = function(id){ return document.getElementById(id); };

var username = $('username');
var password = $('password');
var submitBtn = $('submitBtn');

// 现在代码有了一些改进，我们把校验逻辑放到了validate函数当中，
// 但是formSubmit的内部还是要计算validate的返回值
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
	if(validate() === false) return; // 任然存在耦合，没有完全分离

	var param = {
		username: username.value,
		password: password.value
	};

	ajax('http://www.baidu.com', param);
};

submitBtn.onclick = formSubmit;