// 计算乘积
var mult = function(){
	var a = 1;

	for(var i = 0, l = arguments.length; i < l; i++){
		a *= arguments[i];
	}

	return a;
};

// 计算加和
var sum = function(){
	var a = 0;

	for(var i = 0, l = arguments.length; i < l; i++){
		a += arguments[i];
	}

	return a;
};

// 创建缓存代理工厂
var createProxyFactory = function(fn){
	var cache = {};

	return function(){
		var args = Array.prototype.join.call(arguments, ',');

		if(args in cache) return cache[args];
		return cache[args] = fn.apply(this, arguments);
	};
};