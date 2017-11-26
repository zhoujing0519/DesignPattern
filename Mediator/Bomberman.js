// 炸弹人游戏，最初只有两人对战.......................................................................

// 玩家
	var Player = function(name){
		this.name = name;
		this.enemy = null;
	};

	Player.prototype.win = function(){
		console.log(this.name + 'won!');
	};

	Player.prototype.lose = function(){
		console.log(this.name + 'lost!');
	};

	Player.prototype.die = function(){
		this.lose();
		this.enemy.win();
	};

	// 创建两个玩家
	var player1 = new Player('格里菲斯');
	var player2 = new Player('格斯');
	// 给玩家互相设置敌人
	player1.enemy = player2;
	player2.enemy = player1;
	// 格里菲斯死亡
	player1.die(); // => 格里菲斯lost!, 格斯won!

// 新增：队伍PK................................................................................................
	var players = []; // 所有玩家
	var Player = function(name, teamColor){
		this.name = name; // 姓名
		this.teamColor = teamColor; // 所属队伍颜色
		this.state = 'alive'; // 生存状态

		// 每个玩家都有队友和敌人属性，他们仅仅的耦合在一起
		this.partners = []; // 队友列表
		this.enemies = []; // 敌人列表
	};

	// 胜利
	Player.prototype.win = function(){
		console.log('Winner: ' + this.name);
	};

	// 失败
	Player.prototype.lose = function(){
		console.log('Loser: ' + this.name);
	};

	// 死亡
	Player.prototype.die = function(){
		var all_dead = true; // 默认全员阵亡

		this.state = 'dead'; // 玩家死亡
		for(var i = 0, partner; partner = this.partners[i++]; ){ // 遍历队友
			if(partner.state !== 'dead'){ // 如果还有队友存活，则退出循环
				all_dead = false;
				break;
			}
		}

		// 如果全员阵亡，通知所有玩家结果
		if(all_dead === true){
			this.lose(); // 输了
			// 通知队友，咱们输了
			for(var i = 0, partner; partner = this.partners[i++]; ){
				partner.lose();
			}
			// 通知敌人，他们赢了
			for(var i = 0, enemy; enemy = this.enemies[i++]; ){
				enemy.win();
			}
		}
	};

	// 定义一个工厂来创建玩家
	var playerFactory = function(name, teamColor){
		var newPlayer = new Player(name, teamColor);

		for(var i = 0, player; player = players[i++]; ){
			if(player.teamColor === newPlayer.teamColor){
				player.partners.push(newPlayer);
				newPlayer.partners.push(player);
			}else{
				player.enemies.push(newPlayer);
				newPlayer.enemies.push(player);
			}
		}

		players.push(newPlayer);
		return newPlayer;
	};

	// 测试: 创建10玩家，分为程序和美术
	var player1 = playerFactory('陈琦', '程序'),
		player2 = playerFactory('高见', '程序'),
		player3 = playerFactory('何晨', '程序'),
		player4 = playerFactory('万迪', '程序'),
		player5 = playerFactory('周晶', '程序');

	var player6 = playerFactory('刘明骅', '美术'),
		player7 = playerFactory('陈玲', '美术'),
		player8 = playerFactory('王娟娟', '美术'),
		player9 = playerFactory('姚瑶', '美术'),
		player10 = playerFactory('杨峥雷', '美术');

	var showTable = function(player){
		player.die();
		console.table(players);
	};

	player3.die();
	player9.die();
	player2.die();
	player7.die();
	player8.die();
	player1.die();
	player5.die();
	player6.die();
	player10.die();

// 使用中介者模式进行改造.................................................................................
	var Player = function(name, teamColor){
		this.name = name;
		this.teamColor = teamColor;
		this.state = 'alive';
	};

	Player.prototype.win = function(){
		console.log('Winner: ' + this.name);
	};

	Player.prototype.lose = function(){
		console.log('Loser: ' + this.name);
	};

	// 玩家死亡，只设置状态，逻辑交给中介者
	Player.prototype.die = function(){
		this.state = 'dead';
		playerDirector.ReceiveMessage('playerDead', this); // 给中介者发送消息，该玩家死亡
	};

	// 因掉线或者退出，从而移除玩家
	Player.prototype.remove = function(){
		playerDirector.ReceiveMessage('removePlayer', this); // 给中介者发送消息，该玩家退出
	};

	// 玩家换队（你们太菜啦）
	Player.prototype.changeTeam = function(color){
		playerDirector.ReceiveMessage('changeTeam', this, color); // 给中介者发送消息，玩家换队
	};

	// 改写工厂函数
	var playerFactory = function(name, teamColor){
		var newPlayer = new Player(name, teamColor);

		playerDirector.ReceiveMessage('addPlayer', newPlayer);

		return newPlayer;
	};

	// 实现中介者: playerDirector
	var playerDirector = (function(){
		var players = {}, // 保存所有玩家
			operations = {}; // 中介者可以执行的操作

		// 新增一个玩家
		operations.addPlayer = function(player){
			var teamColor = player.teamColor; // 获取玩家的队伍颜色

			players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍
			players[teamColor].push(player); // 添加玩家进入队伍
		};

		// 移除一个玩家
		operations.removePlayer = function(player){
			var teamColor = player.teamColor, // 获取玩家的队伍颜色
				teamPlayers = players[teamColor] || []; // 获取所在队伍

			// 遍历队伍，删除该玩家
			for(var l = teamPlayers.length - 1; l >= 0; l--){
				if(teamPlayers[l] === player){
					teamPlayers.splice(l, 1);
				}
			}
		};

		// 玩家换队
		operations.changeTeam = function(player, newTeamColor){
			operations.remove(player); // 原队伍除名
			player.teamColor = newTeamColor; // 更改队伍颜色
			operations.addPlayer(player); // 加入新队伍
		};

		// 玩家死亡
		operations.playerDead = function(player){
			var teamColor = player.teamColor,
				teamPlayers = players[teamColor];

			var all_dead = true;

			for(var i = 0, player; player = teamPlayers[i++]; ){
				if(player.state !== 'dead'){
					all_dead = false;
					break;
				}
			}

			if(all_dead === true){
				for(var i = 0, player; player = teamPlayers[i++]; ){
					player.lose();
				}

				for(var color in players){ // 枚举队伍颜色
					if(color !== teamColor){ // 非当前队伍
						var teamPlayers = players[color]; // 获取该队伍成员
						for(var i = 0, player; player = teamPlayers[i++]; ){ // 通知他们胜利
							player.win();
						}
					}
				}
			}
		};

		var ReceiveMessage = function(){
			var message = Array.prototype.shift.call(arguments); // 获取消息名称

			operations[message].apply(this, arguments); // 执行相应操作
		};

		return {
			ReceiveMessage: ReceiveMessage // 暴露接口
		};
	})();

	/*
		除了中介者本身，没有一个玩家知道其他任何玩家的存在，玩家与玩家之间的耦合已经完全解除。
		某个玩家的操作都不需要通知其他玩家，而只要给中介者发送消息，中介者处理完消息会把结果
		反馈给其他玩家。我们还可以继续给中介者扩展更多的功能，以适应需求的不断变化。
	*/