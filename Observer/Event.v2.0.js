var Event = (function(){
	var _global = this, // *没有用到
		_default = 'default', // 默认的命名空间
		Event; // 真正返回出去的发布订阅模型

	// 重写发布订阅模型
	Event = (function(){
		var _listen, // 私有监听器
			_trigger, // 私有触发器
			_remove, // 私有移除器
			_slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype.unshift,
			namespaceCache = {}, // 命名空间缓存
			_create, // 私有创建模型
			find, // *没有用到
			each = function(arr, fn){ // 自定义迭代器: each函数
				var ret; // 返回值
				for(var i = 0, n; n = arr[i++]; ) ret = fn.call(n, i, n);
				return ret; // 返回最后一个回调的返回值
			};

		// 创建私有监听器
		// key => 事件名
		// fn => 回调函数
		// cache => 缓存
		_listen = function(key, fn, cache){
			if(!cache[key]) cache[key] = []; // 如果缓存中没有该事件列表，新建一个
			cache[key].push(fn); // 将该回调推入该事件列表
		};

		// 创建私有移除器
		// key => 事件名
		// cache => 缓存
		// fn => 回调函数
		_remove = function(key, cache, fn){
			if(cache[key]){ // 如果事件列表存在
				if(fn){ // 如果传了回调函数，则清除对应的回调
					for(var l = cache[key].length - 1; l >= 0; l--){
						if(cache[key][l] === fn) cache[key].splice(l, 1);
					}
				}else{ // 否则，清空整个事件列表
					cache[key] = [];
				}
			}
		};

		// 创建私有触发器
		_trigger = function(){
			var cache = _shift.call(arguments), // 第一个参数为：缓存
				key = _shift.call(arguments), // 第二个参数为：事件名
				args = arguments, // 剩余参数
				_self = this, // 保存this
				stack = cache[key], // 当前事件的堆栈
				ret; // 返回值，没有用到


			if(!stack || !stack.length) return; // 如果当前事件堆栈不存在，直接返回
			return each(stack, function(){ // 遍历这个堆栈
				return this.apply(_self, args); // 让回调函数中的this指向Event
			});
		};

		// 创建私有模型
		// namespace => 命名空间
		_create = function(namespace){
			var namespace = namespace || _default; // 设置命名空间
			var cache = {}, // 初始化缓存
				offlineStack = [], // 初始化离线堆栈（事件回调列表）
				ret = { // 返回一个对象
					// 监听器
					// key => 事件名
					// fn => 回调
					// last => 判断是否执行离线堆栈中的最后一个回调
					listen: function(key, fn, last){
						_listen(key, fn, cache); // 监听事件
						if(offlineStack === null) return; // 如果离线堆栈为null，直接返回
						if(last === 'last'){ // 如果指定最后一个
							offlineStack.length && offlineStack.pop()(); // 当离线堆栈有内容时，执行最后一个回调
						}else{ // 不指定
							each(offlineStack, function(){ // 遍历离线堆栈
								this(); // 执行每个回调
							});
						}
						offlineStack = null; // 最后将离线堆栈置为null
					},

					// 监听一次
					one: function(key, fn, last){
						_remove(key, cache); // 清空该事件堆栈
						this.listen(key, fn, last); // 监听这个事件，并等待执行最后一个回调
					},

					// 移除器
					remove: function(key, fn){
						_remove(key, cache, fn); // 移除缓存中的fn
					},

					// 触发器
					trigger: function(){
						var fn, // 回调
							args, // 参数
							_self = this; // 保存this

						_unshift.call(arguments, cache); // 在arguments前面插入缓存
						args = arguments; // 更新参数
						fn = function(){ // 触发所有回调
							return _trigger.apply(_self, args);
						};

						if(offlineStack) return offlineStack.push(fn); // 如果有离线堆栈，将回调存入离线堆栈
						return fn(); // 否则，立即触发所有回调
					}
				};

			// 触发器返回：
				// 如果有命名空间
					// 如果命名空间缓存中有这个值，返回这个值
					// 否则，将新创建的模型存入缓存中，并返回它
				// 如果没有命名空间，则直接返回新创建的模型
			return namespace ? 
				   (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) :
				   ret;
		};

		// Event对象的方法
		return {
			// 创建模型
			create: _create, 
			// 监听一次
			one: function(key, fn, last){
				var event = this.create();
					event.one(key, fn, last);
			},
			// 移除器
			remove: function(key, fn){
				var event = this.create();
					event.remove(key, fn);
			},
			// 监听器
			listen: function(key, fn, last){
				var event = this.create();
					event.listen(key, fn, last);
			},
			// 触发器
			trigger: function(){
				var event = this.create();
					event.trigger.apply(this, arguments);
			}
		};
	})();

	return Event;
})();

Event.create('login').listen('success', function(data){
	var list = data.list;
	for(var i = 0, item; item = list[i++]; ) console.log(item);
});

Event.create('login').trigger('success', {
	avatar: './images/avatar.jpg',
	list: [
		'天宁区',
		'钟楼区',
		'武进区',
		'新北区'
	]
});