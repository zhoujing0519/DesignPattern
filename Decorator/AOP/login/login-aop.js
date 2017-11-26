Function.prototype.after = function(afterFn){
	var _self = this;

	return function(){
		var ret;

		ret = _self.apply(this, arguments);
		afterFn.apply(this, arguments);

		return ret;
	};
};

var showLogin = function(){
	console.log('打开登录浮层');
};

var log = function(){
	console.log('上报标签为：' + this.getAttribute('tag'));
};

showLogin = showLogin.after(log); // 打开浮层之后上报数据

document.getElementById('button').onclick = showLogin;