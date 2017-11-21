// 本体
// 功能：同步文件
var synchronousFile = function(id){
	console.log('开始同步文件，id为：' + id);
};

// 代理
// 功能：将两秒内需要同步的ID放进一个集合，统一操作
var proxySynchronousFile = (function(){
	var cahce = [], // 保存一段时间内需要同步的ID
		timer; // 定时器

	return function(id){
		cahce.push(id);
		
		if(timer) return; // 保证不会覆盖已经启动的定时器
		timer = setTimeout(function(){
			synchronousFile(cahce.join(',')); // 两秒后向本体发送需要同步的ID集合
			clearTimeout(timer); // 清空定时器
			timer = null;
			cache.length = 0; // 清空ID集合
		}, 2000);
	};
})();

// 测试
var checkboxs = document.getElementsByTagName('input'); // 获取所有的checkbox

for(var i = 0, c; c = checkboxs[i++]; ){ // 遍历checkboxs，这种写法，类似forEach
	c.onclick = function(){
		if(this.checked = true) proxySynchronousFile(this.id);
	};
}
