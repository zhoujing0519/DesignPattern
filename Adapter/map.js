var googleMap = {
	show: function(){
		console.log('开始渲染谷歌地图');
	}
};

var baiduMap = {
	show: function(){
		console.log('开始渲染百度地图');
	}
};

var renderMap = function(map){
	if(map.show instanceof Function) map.show();
};

renderMap(googleMap);
renderMap(baiduMap);

// 新增腾讯地图，API不一样
var tencentMap = {
	display: function(){
		console.log('开始渲染腾讯地图');
	}
};

// 添加一个腾讯地图适配器，提供相同的API
var tencentAdapter = {
	show: function(){
		tencentMap.display();
	}
};

renderMap(tencentAdapter);