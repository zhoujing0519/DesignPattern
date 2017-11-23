// 策略对象...................................................................................
	var strategies = {
		isNonEmpty: function(value, errorMsg){ // 验证是否为空
			if(value === '') return errorMsg;
		},
		minLength: function(value, length, errorMsg){ // 验证最小长度
			if(value.length < length) return errorMsg;
		},
		isMobile: function(value, errorMsg){ // 验证手机号码格式
			if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
		},
	};

// Validator类...............................................................................
	var Validator = function(){
		this.cache = []; // 验证列表
	};

	// 向验证列表添加校验规则
	Validator.prototype.add = function(dom, rules){
		var self = this;

		for(var i = 0, rule; rule = rules[i++]; ){
			(function(){
				var strategyAry = rule.strategy.split(':'); // 拆分策略字符串为数组
				var errorMsg = rule.errorMsg; // 错误提示

				self.cache.push(function(){
					var strategy = strategyAry.shift(); // 第一个元素是验证函数名

					strategyAry.unshift(dom.value); // 在数组前面插入所要验证的值
					strategyAry.push(errorMsg); // 在数组后面插入错误提示

					return strategies[strategy].apply(dom, strategyAry); // 返回的策略函数的执行结果
				});
			})(rule);
		}
	};

	// 执行验证列表中的校验函数
	Validator.prototype.start = function(){
		for(var i = 0, validatorFunc; validatorFunc = this.cache[i++]; ){ // 遍历验证列表
			var errorMsg = validatorFunc(); // 执行列表中的函数，返回消息
			if(errorMsg) return errorMsg; // 如果有错误消息，直接返回该消息
		}
	};

// 调用......................................................................................................
	var registerForm = document.getElementById('registerForm'); // 获取表单dom
	var validataFunc = function(){ // 表单验证所要执行的函数
		var validator = new Validator(); // 创建一个验证器

		// 对用户名添加规则
		validator.add(registerForm.userName, [
			{
				strategy: 'isNonEmpty',
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

		var errorMsg = validator.start(); // 验证器执行验证，并返回过程中返回的错误消息
		return errorMsg; // 返回错误消息
	};

	// 给表单绑定提交事件
	registerForm.onsubmit = function(e){
		e.preventDefault(); // 阻止默认事件
		var errorMsg = validataFunc(); // 获取校验函数的返回值（错误消息）

		if(errorMsg){ // 如果有错误消息
			alert(errorMsg); // 弹出错误消息
			return false;
		}
	};