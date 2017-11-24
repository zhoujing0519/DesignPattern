// 创建饮料
	var Beverage = function(){};

	Beverage.prototype.boilWater = function(){
		console.log('把水煮沸');
	};

	Beverage.prototype.brew = function(){
		throw new Error('子类必须重写brew方法');
	};

	Beverage.prototype.pourInCup = function(){
		throw new Error('子类必须重写pourInCup方法');
	};

	Beverage.prototype.addCondiments = function(){
		throw new Error('子类必须重写addCondiments方法');
	};

	// 钩子函数
	Beverage.prototype.customerWantsCondiments = function(){
		return true; // 默认需要调料
	};

	Beverage.prototype.init = function(){ // 模板方法
		this.boilWater();
		this.brew();
		this.pourInCup();
		if(this.customerWantsCondiments()) this.addCondiments();
	};

// 创建咖啡
	var Coffee = function(){};

	Coffee.prototype = new Beverage();

	Coffee.prototype.brew = function(){
		console.log('用沸水冲泡咖啡');
	};

	Coffee.prototype.pourInCup = function(){
		console.log('把咖啡倒进杯子');
	};

	Coffee.prototype.addCondiments = function(){
		console.log('加糖和牛奶');
	};

// 创建带钩子的咖啡
	var CoffeeWithHook = function(){};

	CoffeeWithHook.prototype = new Beverage();

	CoffeeWithHook.prototype.brew = function(){
		console.log('用沸水冲泡咖啡');
	};

	CoffeeWithHook.prototype.pourInCup = function(){
		console.log('把咖啡倒进杯子');
	};

	CoffeeWithHook.prototype.addCondiments = function(){
		console.log('加糖和牛奶');
	};

	CoffeeWithHook.prototype.customerWantsCondiments = function(){
		return window.confirm('请问需要调料吗？');
	};

// 创建茶
	var Tea = function(){};

	Tea.prototype = new Beverage();

	Tea.prototype.brew = function(){
		console.log('用沸水浸泡茶叶');
	};

	Tea.prototype.pourInCup = function(){
		console.log('把茶叶倒进杯子');
	};

	Tea.prototype.addCondiments = function(){
		console.log('加柠檬');
	};

// 创建实例
	var coffee = new Coffee();
		coffee.init();

	var tea = new Tea();
		tea.init();

	var coffeeWithHook = new CoffeeWithHook();
		coffeeWithHook.init();