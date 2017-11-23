// 故事背景
/*
	A程序员，负责绘制按钮，预留安装命令的接口
	B程序员，负责具体按钮点击之后触发的回调函数
*/

// A程序员
	// 绘制的button
	var button = document.getElementById('button'); 
	// 设置命令的接口
	var setCommand = function(button, command){ 
		button.onclick = function(){ // 点击按钮，执行命令
			command.execute();
		};
	};

// B程序员
	// 刷新菜单的功能
	var MenuBar = { 
		refresh: function(){
			console.log('刷新菜单界面！');
		}
	};
	// 封装一个命令类
	var RefreshMenuBarCommand = function(receiver){ 
		return {
			execute: function(){ // 执行命令
				receiver.refresh(); // 刷新
			}
		};
	};
	// 将命令接收者传入到command对象中
	var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar); 
	// 将刷新菜单的命令安装到button上
	setCommand(button, refreshMenuBarCommand);