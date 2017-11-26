// 定义状态类（模板模式）
	var State = function(){};

	State.prototype.buttonWasPressed = function(){
		throw new Error('父类的buttonWasPressed方法必须被重写！');
	};

	// 关灯状态
		var OffLightState = function(light){
			this.light = light;
		};

		OffLightState.prototype = new State(); // 继承抽象父类

		OffLightState.prototype.buttonWasPressed = function(){ // 重写父类的方法
			console.log('弱光'); // OffLightState对应的行为
			this.light.setState(this.light.weakLightState); // 切换到weakLightState
		};

	// 弱光状态
		var WeakLightState = function(light){
			this.light = light;
		};

		WeakLightState.prototype = new State();

		WeakLightState.prototype.buttonWasPressed = function(){
			console.log('强光');
			this.light.setState(this.light.strongLightState); // 切换到strongLightState
		};

	// 强光状态
		var StrongLightState = function(light){
			this.light = light;
		};

		StrongLightState.prototype = new State();

		StrongLightState.prototype.buttonWasPressed = function(){
			console.log('关灯');
			this.light.setState(this.light.offLightState); // 切换到offLightState
		};

// 定义电灯类
	var Light = function(){
		// 明显的看到电灯的状态种类
		this.offLightState = new OffLightState(this);
		this.weakLightState = new WeakLightState(this);
		this.strongLightState = new StrongLightState(this);
		this.button = null;
	};

	Light.prototype.init = function(){
		var button = document.createElement('button');
		var self = this;

		this.currentState = this.offLightState; // 设置当前状态
		this.button = document.body.appendChild(button);
		this.button.innerHTML = '开关';
		this.button.onclick = function(){
			self.currentState.buttonWasPressed(); // 执行当前状态的行为
		};
	};

	// 切换light的状态
	// 因为状态的切换规律事先已经定义在状态类中，
	// 所以此处再也找不到跟状态切换相关的条件分支语句
	Light.prototype.setState = function(newState){
		this.currentState = newState;
	}

/*
	好处：
		1.它可以使每一种状态和它对应的行为之间的关系局部化，
		这些行为被分散和封装在各自对应的状态类中，便于阅读和理解。
		2.状态之间的切换都被分布在状态类内部，
		使得我们无须编写过多的if、else条件分支语句来控制状态之间的切换
		3.当我们需要给light对象增加一种新的状态时，
		只需要增加一个新的状态类，再稍微改变一下现有代码即可
*/

// 新增：超强光状态
	var SuperStrongLightState = function(light){
		this.light = light;
	};

	SuperStrongLightState.prototype = new State();

	SuperStrongLightState.prototype.buttonWasPressed = function(){
		console.log('关灯');
		this.light.setState(this.light.offLightState);
	};

	// 然后在Light构造器中，添加超强光状态
	var Light = function(){
		// ...
		this.superStrongLightState = new SuperStrongLightState(this);
		// ...
	};

	// 最后，修改强光状态类的buttonWasPressed方法
	StrongLightState.prototype.buttonWasPressed = function(){
		console.log('超强光');
		this.light.setState(this.light.superStrongLightState); // 切换到superStrongLightState
	};