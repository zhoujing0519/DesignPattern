// 策略对象
var strategies = {
	isNonEmpry: function(value, errorMsg){
		if(value === '') return errorMsg;
	},
	minLength: function(value, length, errorMsg){
		if(value.length < length) return errorMsg;
	},
	isMobile: function(value, errorMsg){
		if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
	},
};

// Validator类
var Validator = function(){
	this.cache = [];
};

// 添加校验规则
Validator.prototype.add = function(dom, rules){
	var self = this;

	for(var i = 0, rule; rule = rules[i++]; ){
		(function(){
			var strategyAry = rule.strategy.split(':');
			var errorMsg = rule.errorMsg;

			self.cache.push(function(){
				var strategy = strategyAry.shift();

				strategyAry.unshift(dom.value);
				strategyAry.push(errorMsg);

				return strategies[strategy].apply(dom, strategyAry);
			});
		})(rule);
	}
};

// 执行校验
Validator.prototype.start = function(){
	for(var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ){
		var errorMsg = validatorFunc();
		if(errorMsg) return errorMsg;
	}
};

// 调用
var registerForm = document.getElementById('registerForm');
var validataFunc = function(){
	var validator = new Validator();

	// 对用户名添加规则
	validator.add(registerForm.userName, [
		{
			strategy: 'isNonEmpry',
			errorMsg: '用户名不能为空'
		},{
			strategy: 'minLength: 10',
			errorMsg: '用户名长度不能小于10位'
		}
	]);

	// 对密码添加规则
	validator.add(registerForm.password, [
		{
			strategy: 'minLength: 6',
			errorMsg: '密码长度不能小于6位'
		}
	]);

	// 对手机号码添加规则
	validator.add(registerForm.phoneNumber, [
		{
			strategy: 'isMobile',
			errorMsg: '手机号码格式不正确'
		}
	]);

	var errorMsg = validator.start();
	return errorMsg;
};

registerForm.onsubmit = function(e){
	e.preventDefault();
	var errorMsg = validataFunc();

	console.log(errorMsg);

	if(errorMsg){
		alert(errorMsg);
		return false;
	}
};