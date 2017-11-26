Function.prototype.before = function(beforeFn){
	var _self = this; // 保存原函数的引用

	return function(){ // 返回包含了原函数和新函数的代理函数
		beforeFn.apply(this, arguments); // 执行新函数，保证this不被劫持，
										 // 新函数接受的参数也会原封不动的传入原函数，
										 // 新函数在原函数之前执行

										 console.log(this);

		return _self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，
											 // 并且保证this不被劫持
	};
};

Function.prototype.after = function(afterFn){
	var _self = this; // 保存原函数的引用

	return function(){
		var ret = _self.apply(this, arguments);
		afterFn.apply(this, arguments);

		return ret;
	};
};