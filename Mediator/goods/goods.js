// ID选择器
	var $ = function(id){ return document.getElementById(id); };

// DOM元素
	var colorSelect = $('colorSelect'),
		numberInput = $('numberInput'),
		colorInfo = $('colorInfo'),
		numberInfo = $('numberInfo'),
		nextBtn = $('nextBtn');

// 手机库存
	var goods = {
		red: 3,
		blue: 6
	};

// 给颜色选择器添加事件
	colorSelect.onchange = function(){
		var color = this.value, // 选择的颜色
			number = numberInput.value, // 选择的数量
			stock = goods[color]; // 该颜色的库存

		colorInfo.innerHTML = color;

		// 请选择
		if(!color){
			nextBtn.disabled = true;
			nextBtn.innerHTML = '请选择手机颜色';
			return;
		}

		// 用户输入的数量是否为正整数
		if(!Number.isInteger(number - 0) || number <= 0){
			nextBtn.disabled = true;
			nextBtn.innerHTML = '请输入正确的购买数量';
			return;
		}

		// 当前选择数量超过库存
		if(number > stock){
			nextBtn.disabled = true;
			nextBtn.innerHTML = '库存不足';
			return;
		}

		nextBtn.disabled = false;
		nextBtn.innerHTML = '加入购物车'
	};

// 给数量输入框添加事件
	numberInput.oninput = function(){
		var color = colorSelect.value, // 选择的颜色
			number = this.value, // 选择的数量
			stock = goods[color]; // 该颜色的库存

		numberInfo.innerHTML = number;

		// 请选择
		if(!color){
			nextBtn.disabled = true;
			nextBtn.innerHTML = '请选择手机颜色';
			return;
		}

		// 用户输入的数量是否为正整数
		if(!Number.isInteger(number - 0) || number <= 0){
			nextBtn.disabled = true;
			nextBtn.innerHTML = '请输入正确的购买数量';
			return;
		}

		// 当前选择数量超过库存
		if(number > stock){
			nextBtn.disabled = true;
			nextBtn.innerHTML = '库存不足';
			return;
		}

		nextBtn.disabled = false;
		nextBtn.innerHTML = '加入购物车'
	};
