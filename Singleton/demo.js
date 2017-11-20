// 创建单例
var getSingle = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this, arguments));
	}
};

// 创建登陆浮窗
var createLoginLayer = function(){
	var div = document.createElement('div');

	div.innerHTML = '我是登陆浮窗';
	div.style.display = 'none';
	document.body.appendChild(div);
	return div;
};

// 创建登陆浮窗单例
var createSingleLoginLayer = getSingle(createLoginLayer);

// 登陆按钮点击，显示漂浮窗
document.getElementById('loginBtn').addEventListener('click', function(){
	var loginLayer = createSingleLoginLayer();
	loginLayer.style.display = 'block';
});

// 创建唯一的iframe用于动态加载第三方页面
var createSingleIframe = getSingle(function(){
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	return iframe;
});

document.getElementById('loginBtn').addEventListener('click', function(){
	var loginLayer = createSingleIframe();
	loginLayer.src = 'http://www.baidu.com';
});