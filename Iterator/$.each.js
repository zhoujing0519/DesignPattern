$.each = function(obj, callback){
	var value,
		i = 0,
		length = obj.length,
		isArray = isArraylike(obj);

		if(isArray){ // 迭代类数组
			for( ; i < length; i++){
				value = callback.call(obj[i], i, obj[i]);

				if(value === false) break; // 如果回调函数返回false，终止迭代器
			}
		}else{ // 迭代object对象
			for(i in obj){
				value = callback.call(obj[i], i, obj[i]);

				if(value === false) break;
			}
		}

	return obj;
};