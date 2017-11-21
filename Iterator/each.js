var each = function(ary, callback){
	for(var i = 0, l = ary.length; i < l; i++){
		// 把下标和元素当作参数传递给callback函数，此时的上下文就是元素自身
		if(callback.call(ary[i], i, ary[i]) === false) break; // callback的执行结果返回false，提前终止迭代
	}
};

each([1, 2, 3], function(index, item){
	console.log(index+' : '+item);
	console.log(this.toString());
});