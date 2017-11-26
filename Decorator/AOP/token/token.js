// 定义一个ajax函数
var ajax = function(type, url, param){

};

// 需要在HTTP请求中带上一个Token参数
	// 用于生成Token的函数
	var getToken = function(){
		return 'Token';
	};

	// 现在给每个ajax请求都添上Token参数
	var ajax = function(type, url, param){
		param = param || {};
		param.Token = getToken();
	};

// 以上代码带来的问题，假设以后不再需要token了，需要回头再来修改ajax函数
	// 为了解决这个问题, 首先还原ajax函数
	var ajax = function(type, url, param){

	};

	// 用于生成Token的函数
	var getToken = function(){
		return 'Token';
	};

	// 修改
	// AOP => before
	Function.prototype.before = function(beforeFn){
		var _self = this;

		return function(){
			beforeFn.apply(this, arguments);
			return _self.apply(this, arguments);
		};
	};

	// 然后把Token参数通过装饰者模式添加到param对象中去
	ajax = ajax.before(function(type, url, param){
		param.Token = getToken();
	});