// 气泡工厂
	var toolTipFactory = (function(){
		var toolTipPool = []; // toolTip对象池

		return {
			create: function(){
				if(toolTipPool.length === 0){
					var div = document.createElement('div');

					document.body.appendChild(div);
					return div;
				}else{
					return toolTipPool.shift();
				}
			},
			recover: function(toolTipDom){
				return toolTipPool.push(toolTipDom);
			}
		};
	})();

// 测试
	var arr = [];

	// 添加两个气泡
	for(var i = 0, str; str = ['A', 'B'][i++]; ){
		var toolTip = toolTipFactory.create();

		toolTip.innerHTML = str;
		arr.push(toolTip);
	}

	// 回收气泡
	for(var i = 0, toolTip; toolTip = arr[i++]; ){
		toolTipFactory.recover(toolTip);
	}

	// 再创建6个气泡
	for(var i = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'F'][i++]; ){
		var toolTip = toolTipFactory.create();

		toolTip.innerHTML = str;
		arr.push(toolTip);
	}