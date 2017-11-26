var Light = function(){
	this.currentState = FSM.off;
	this.button = null;
};

Light.prototype.init = function(){
	var button = document.createElement('button');
	var self = this;

	button.innerHTML = '开关';
	this.button = document.body.appendChild(button);
	this.button.onclick = function(){
		self.currentState.buttonWasPressed.call(self);
	};
};

var FSM = {
	off: {
		buttonWasPressed: function(){
			console.log('关灯');
			this.button.innerHTML = '下一次按我是开灯';
			this.currentState = FSM.on;
		}
	},
	on: {
		buttonWasPressed: function(){
			console.log('开灯');
			this.button.innerHTML = '下一按我是关灯';
			this.currentState = FSM.off;
		}
	}
};

var light = new Light();
	light.init();