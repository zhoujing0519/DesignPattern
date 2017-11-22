var Event = (function(){
	var eventList = {}, // 事件对象
		listen, // 监听器
		trigger, // 触发器
		remove; // 移除器

	// 创建监听器
	// key => 事件名
	// fn => 回调
	listen = function(key, fn){
		if(!eventList[key]) eventList[key] = []; // 如果该事件尚未注册，新建一个事件列表
		eventList[key].push(fn); // 将当前回调推入当前事件列表中
	};

	// 创建触发器
	// 第一个参数 => 事件名
	// 其余参数 => 传递的数据
	trigger = function(){
		var key = Array.prototype.shift.call(arguments), // 取出第一个参数，该参数为事件名
			fns = eventList[key]; // 获取当前事件列表中的所有回调函数

		if(!fns || fns.length === 0) return false; // 如果事件列表为空，返回false
		for(var i = 0, fn; fn = fns[i++]; ) fn.apply(this, arguments); // 遍历事件列表，执行每个回调函数
	};

	// 移除器
	// key => 所要移除的事件名
	// fn => 所要移除的回调
	remove = function(key, fn){
		var fns = eventList[key]; // 获取当前事件列表

		if(!fns) return false; // 如果事件列表为空
		if(!fn){ // 如果没有传递回调函数，清空所有回调
			fns && (fns.length = 0); // 并且事件列表存在，则清空该列表
		}else{ // 如果传递了回调函数
			for(var l = fns.length - 1; l >= 0; l--){ // 遍历事件列表，找出该回调
				var _fn = fns[l];
				if(_fn === fn) fns.splice(l, 1); // 将它移除
			}
		}
	};

	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	};
})();

Event.listen('squareMeter88', function(price){ // 订阅一个88平米房源的通知，收到'价格=price'的短信
	console.log('价格= ' + price);
});

Event.trigger('squareMeter88', 2000000); // 发布一个88平米房源的通知，房价为200W