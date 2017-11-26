var showLogin = function(){
	console.log('打开登录浮层');
	log(this.getAttribute('tag')); // showLogin与log耦合在一起
};

var log = function(tag){
	console.log('上报标签为：' + tag);
};

document.getElementById('button').onclick = showLogin;