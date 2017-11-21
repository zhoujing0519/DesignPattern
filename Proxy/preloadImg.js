// 本体
// 功能：向body中添加一张图片，并传入图片路径
var myImage = (function(){
	var imgNode = document.createElement('img');

	document.body.appendChild(imgNode);

	return function(src){
		imgNode.src = src;
	};
})();

// 代理
/*
	功能：
		1.创建一个Image对象，并传入图片路径
		2.先将一张loading图片，占用本体的位置
		3.当Image对象加载完毕后，再将真正的路径传给本体
*/
var proxyImage = (function(){
	var img = new Image;

	img.onload = function(){
		myImage(this.src);
	};

	return function(src){
		myImage('file:///C:/Users/svenzeng/Desktop/loading.gif');
		img.src = src;
	};
})();

myImage('http://imgcache.qq.com/music//N/k/oooGGDysOyAONK.jpg');	// 直接使用本体添加图片
proxyImage('http://imgcache.qq.com/music//N/k/oooGGDysOyAONK.jpg');	// 使用代理为本体添加图片