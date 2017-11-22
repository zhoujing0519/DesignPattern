// 示例代码
// 登录成功后
$.ajax('http://xxx.com?login', function(data){
	login.trigger('loginSuccess', data); // 登陆模块触发loginSuccess事件，并传递data数据
});

// 各模块监听登陆成功的消息
// header模块，添加头像
var header = (function(){
	login.listen('loginSuccess', function(data){
		header.setAvatar(data.avatar);
	});

	return {
		setAvatar: function(avatar){
			console.log('开始设置header模块的头像...');
		}
	};
})();

// address模块，刷新收货地址列表
var address = (function(){
	login.listen('loginSuccess', function(data){
		address.refresh(data.list);
	});

	return {
		refresh: function(list){
			console.log('开始刷新address模块的列表...');
		}
	};
})();