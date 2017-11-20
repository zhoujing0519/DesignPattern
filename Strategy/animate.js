// 缓动算法
// 接受4个参数：
/*
	t => 动画已消耗的时间
	b => 小球原始位置
	c => 小球目标位置
	d => 动画持续的总时间
*/
var tween = {
	linear: function(t, b, c, d){
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d){
		return c * (t /= d) * t + b;
	},
	strongEaseIn: function(t, b, c, d){
		return c * (t /= d) * t * t * t * t + b;
	},
	strongEaseOut: function(t, b, c, d){
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	},
	sineaseIn: function(t, b, c, d){
		return c * (t /= d) * t * t + b;
	},
	sineaseOut: function(t, b, c, d){
		return c * ((t = t / d - 1) * t * t + 1) + b;
	},
};

// 动画
var Animate = function(dom){
	this.dom = dom;				// 进行运动的dom节点
	this.startTime = 0;			// 动画开始时间
	this.startPos = 0;			// 动画开始时，dom节点的位置，即dom的初始位置
	this.endPos = 0;			// 动画结束时，dom节点的位置，即dom的结束位置
	this.propertyName = null;	// dom节点需要被改变的css属性名
	this.easing = null;			// 使用的缓动算法
	this.duration = null;		// 缓动持续时间
};

// 启动动画
/*
	propertyName => 要改变的CSS属性名
	endPos => 小球运动的目标位置
	duration => 动画持续的时间
	easing => 缓动算法
*/
Animate.prototype.start = function(propertyName, endPos, duration, easing){
	this.startTime = +new Date;									// 动画启动时间
	this.startPos = this.dom.getBoundingClientRect()[propertyName];	// dom节点初始位置
	this.propertyName = propertyName;							// dom节点需要被改变的CSS属性名
	this.endPos = endPos;										// dom节点目标位置
	this.duration = duration;									// 动画持续时间
	this.easing = tween[easing];								// 缓动算法

	var self = this;
	var timeId = setInterval(function(){						// 启动定时器，开始执行动画
		if(self.step() === false){								// 如果动画已结束，则清除定时器
			clearInterval(timeId);
		}
	}, 19);
};

// 每一帧行为
Animate.prototype.step = function(){
	var t = +new Date;							// 取得当前时间
	if(t >= this.startTime + this.duration){	// 时间结束
		this.update(this.endPos);				// 更新小球最后的CSS属性值
		return false;
	}
	var pos = this.easing(						// 小球当前位置
		t - this.startTime,
		this.startPos,
		this.endPos - this.startPos,
		this.duration
	);
	this.update(pos);							// 更新小球最后的CSS属性值
};

// 更新属性
Animate.prototype.update = function(pos){
	this.dom.style[this.propertyName] = pos + 'px';
};

// 测试
var div = document.getElementById('div');
var animate = new Animate(div);

animate.start('left', 500, 8000, 'easeIn');