// 手机库存
	var goods = {
		"red|32G": 3,
		"red|16G": 0,
		"blue|32G": 1,
		"blue|16G": 6,
	};

// ID选择器
	var $ = function(id){ return document.getElementById(id); };

// DOM对象
	var colorSelect = $('colorSelect'),
		memorySelect = $('memorySelect'),
		numberInput = $('numberInput'),
		colorInfo = $('colorInfo'),
		memoryInfo = $('memoryInfo'),
		numberInfo = $('numberInfo'),
		nextBtn = $('nextBtn');

// 绑定事件
	colorSelect.onchange = function(){
		mediator.changed(this);
	};
	memorySelect.onchange = function(){
		mediator.changed(this);
	};
	numberInput.oninput = function(){
		mediator.changed(this);
	};

// 中介者
	var mediator = (function(){
		return {
			changed: function(obj){
				var color = colorSelect.value,
					memory = memorySelect.value,
					number = numberInput.value,
					stock = goods[color + '|' + memory];

				// 显示数据变化
				if(obj === colorSelect){
					colorInfo.innerHTML = color;
				}else if(obj === memorySelect){
					memoryInfo.innerHTML = memory;
				}else if(obj === numberInput){
					numberInfo.innerHTML = number;
				}

				// 修改按钮状态
				// 请选择
				if(!color){
					nextBtn.disabled = true;
					nextBtn.innerHTML = '请选择手机颜色';
					return;
				}

				// 请选择
				if(!memory){
					nextBtn.disabled = true;
					nextBtn.innerHTML = '请选择内存大小';
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
			}
		};
	})();