// 对象池通用工厂
	var objectPoolFactory = function(createObjFn){
		var objectPool = [];

		return {
			create: function(){
				var obj = objectPool.length === 0 ?
						  createObjFn.apply(this, arguments) :
						  objectPool.shift();

				return obj;
			},
			recover: function(obj){
				objectPool.push(obj);
			},
		};
	};

// 利用工厂来创建一个装载一些iframe的对象池
	var iframeFactory = objectPoolFactory(function(){
		var iframe = document.createElement('iframe');

		document.body.appendChild(iframe);

		iframe.onload = function(){
			iframe.onload = null; // 防止iframe重复加载的bug
			iframeFactory.recover(iframe); // iframe加载完成后回收节点
		};

		return iframe;
	});

// 测试
	var iframe1 = iframeFactory.create();
		iframe1.src = 'http://baidu.com';

	var iframe2 = iframeFactory.create();
		iframe2.src = 'http://QQ.com';