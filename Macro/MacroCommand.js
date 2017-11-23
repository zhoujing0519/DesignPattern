/*
	背景条件：
		万能遥控器，包含3条命令：
			打开空调，
			打开电视机和音响，
			关门，开电脑，登录QQ
*/
// 创建宏命令
	var MacroCommand = function(){
		return {
			commandList: [], // 命令堆栈
			add: function(command){ // 添加命令(只允许组合命令拥有add方法)
				this.commandList.push(command);
			},
			execute: function(){ // 执行所有命令
				for(var i = 0, command; command = this.commandList[i++]; ) command.execute();
			}
		};
	};

// 第一步: 打开空调
	var openAcCommand = {
		execute: function(){
			console.log('打开空调');
		},
		add: function(){
			throw new Error('叶对象不能添加子节点！'); // 防止误操作
		}
	};

// 第二步：打开电视和音响（这也是一个宏命令）
	var openTvCommand = {
		execute: function(){
			console.log('打开电视');
		},
		add: function(){
			throw new Error('叶对象不能添加子节点！');
		}
	};
	var openSoundCommand = {
		execute: function(){
			console.log('打开音响');
		},
		add: function(){
			throw new Error('叶对象不能添加子节点！');
		}
	};
	var macroCommand1 = MacroCommand();
		macroCommand1.add(openTvCommand);
		macroCommand1.add(openSoundCommand);

// 第三步：关门，开电脑和登录QQ（这也是一个宏命令）
	var closeDoorCommand = {
		execute: function(){
			console.log('关门');
		},
		add: function(){
			throw new Error('叶对象不能添加子节点！');
		}
	};
	var openPcCommand = {
		execute: function(){
			console.log('打开电脑');
		},
		add: function(){
			throw new Error('叶对象不能添加子节点！');
		}
	};
	var openQQCommand = {
		execute: function(){
			console.log('登录QQ');
		},
		add: function(){
			throw new Error('叶对象不能添加子节点！');
		}
	};
	var macroCommand2 = MacroCommand();
		macroCommand2.add(closeDoorCommand);
		macroCommand2.add(openPcCommand);
		macroCommand2.add(openQQCommand);

// 将这三步组合成一个超级命令
	var macroCommand = MacroCommand();
		macroCommand.add(openAcCommand);
		macroCommand.add(macroCommand1);
		macroCommand.add(macroCommand2);

// 最后，给遥控器绑定这个命令
	var setCommand = (function(command){
		document.getElementById('button').onclick = function(){
			command.execute();
		};
	})(macroCommand);