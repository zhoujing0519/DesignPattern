var reverseEach = function(ary, callback){
	for(var l = ary.length - 1; l >= 0; l--){
		callback.call(ary[l], l, ary[l]); // 把下标和元素当作参数传递给callback函数，此时的上下文就是元素自身
	}
};

reverseEach([1, 2, 3], function(index, item){
	console.log(index+' : '+item);
	console.log(this.toString());
});