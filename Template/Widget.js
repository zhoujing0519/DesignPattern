var Widget = function(param){
	// 初始化一个div容器
	var create = function(){
		var wrap = document.createElement('div');
		document.body.appendChild(wrap);
	};

	// 通过ajax请求拉取相应的数据
	var getData = function(url){
		$.ajax.get(url, function(res){

		});
	};

	// 把数据渲染到div容器里面，完成组件的构造
	var render = function(){

	};

	// 通知用户，组件渲染完毕
	var complete = function(){

	};

	var F = function(){};

	F.prototype.init = function(){
		create();
		getData();
		render();
		complete();
	};
};