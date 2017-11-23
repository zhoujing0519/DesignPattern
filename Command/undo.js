// 根据ID获取DOM元素
	function $$(id){
		return document.getElementById(id);
	}

// DOM元素
	var ball = $$('ball'),
		pos = $$('pos'),
		moveBtn = $$('moveBtn'),
		cancelBtn = $$('cancelBtn');

// 移动指令
	// 构造函数
	var MoveCommand = function(receiver, pos){
		this.receiver = receiver; // 指令的接收者
		this.pos = pos; // 目标位置
		this.oldPos = null; // 上一次的位置
	};

	// 执行
	MoveCommand.prototype.execute = function(){
		this.receiver.start('left', this.pos, 1000, 'strongEaseOut'); // 向左偏移
		this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]; // 保存移动前的位置
	};

	// 撤销
	MoveCommand.prototype.undo = function(){
		this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut'); // 向左偏移
	};

// 客户端调用
	var animate, moveCommand; // 实例变量

	// 点击移动按钮
	moveBtn.onclick = function(){
		// 实例化animate对象，ball为需要变化的dom元素
		animate = new Animate(ball);
		// 实例化移动指令，指令的接受者为animate，目标值为pos.value
		moveCommand = new MoveCommand(animate, pos.value); 
		moveCommand.execute(); // 执行指令
	};

	// 点击撤销按钮
	cancelBtn.onclick = function(){
		moveCommand.undo(); // 撤销指令
	};