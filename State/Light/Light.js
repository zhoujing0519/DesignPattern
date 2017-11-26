// 首先给出不用状态模式的电灯程序实现
	var Light = function(){
		this.state = 'off'; // 给电灯设置初始状态
		this.button = null; // 电灯开关按钮
	};

	Light.prototype.init = function(){
		var button = document.createElement('button');
		var self = this;

		button.innerHTML = '开关';
		this.button = document.body.appendChild(button);
		this.button.onclick = function(){
			self.buttonWasPressed();
		};
	};

	Light.prototype.buttonWasPressed = function(){
		if(this.state === 'off'){
			console.log('开灯');
			this.state = 'on';
		}else{
			console.log('关灯');
			this.state = 'off';			
		}
	};

	var light = new Light();
		light.init();

// 新增需求：
	// 第一次按下：弱光
	// 第二次按下：强光
	// 第三次按下：关灯
	Light.prototype.buttonWasPressed = function(){
		if(this.state === 'off'){
			console.log('弱光');
			this.state = 'weak';
		}else if(this.state === 'weak'){
			console.log('强光');
			this.state = 'strong';			
		}else if(this.state === 'strong'){
			console.log('关灯');
			this.state = 'off';
		}
	};

// 新增需求：5档...

/*
	缺点：
		1.buttonWasPressed方法违反开放-封闭原则，
		每次修改light的状态，都需要改动其中的代码，
		使得buttonWasPressed成为一个非常不稳定的方法。

		2.所有跟状态有关的行为都被封装在buttonWasPressed方法中，
		此处只是修改state的值，真实情况远远复杂的多，
		当增加到4档、5档、6档，将无法预计这个方法会膨胀到何种程度。

		3.状态切换非常不明显，只有state的赋值变化。
		同时，无法一目了然电灯一共有多少种状态。
		
		4.状态之间的切换关系，不过是往buttonWasPressed方法中堆砌if、else语句
		增加或者修改一个状态可能需要改变若干个操作，这使得函数难以阅读与维护
*/