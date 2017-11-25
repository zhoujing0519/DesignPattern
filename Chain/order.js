/*
	大前提：
		假设我们负责一个售卖手机的网站，进过分别缴纳500元和200元定金的两轮预定后（订单已在此时生成），
		现在已经到了购买阶段。
		公司针对支付过定金的用户有一定的优惠政策。
		在正式购买后，已经支付过500元定金的用户会收到100元的商城优惠券，
		200元定金的用户会收到50元的优惠券，
		而之前没有支付定金的用户只能进入普通购买模式，也就是没有优惠券，且在库存有限的情况下不一定能保证买到。

		@param: orderType => 表示订单类型
				1 => 500元定金用户
				2 => 200元定金用户
				3 => 普通用户
		@param: pay => 是否支付过定金，true or false
		@param: stock => 库存，定金用户不受限制
*/

// 流程代码（十分丑陋！）
	var order = function(orderType, pay, stock){
		if(orderType === 1){
			if(pay == true){
				console.log('500元定金预购，得到100元优惠券');
			}else{
				if(stock > 0){
					console.log('普通购买，没有优惠');
				}else{
					console.log('手机库存不足');
				}
			}
		}else if(orderType === 2){
			if(pay == true){
				console.log('200元定金预购，得到50元优惠券');
			}else{
				if(stock > 0){
					console.log('普通购买，没有优惠');
				}else{
					console.log('手机库存不足');
				}
			}
		}else if(orderType === 3){
			if(stock > 0){
				console.log('普通购买，没有优惠');
			}else{
				console.log('手机库存不足');
			}
		}
	};

	// 测试:
	order(1, true, 100); // => 500元定金预购，得到100元优惠券

// 采用职责链模式重构代码（清晰多了！）
	var order500 = function(orderType, pay, stock){
		if(orderType === 1 && pay === true){
			console.log('500元定金预购，得到100元优惠券');
		}else{
			order200(orderType, pay, stock); // order500和order200耦合在一起
		}
	};

	var order200 = function(orderType, pay, stock){
		if(orderType === 2 && pay === true){
			console.log('200元定金预购，得到50元优惠券');
		}else{
			orderNormal(stock); // order200和orderNormal耦合在一起
		}
	};

	var orderNormal = function(stock){
		if(stock > 0){
			console.log('普通购买，没有优惠');
		}else{
			console.log('手机库存不足');
		}
	};

	// 测试
	order500(1, true, 100); // => 500元定金预购，得到100元优惠券
	order200(2, false, 100); // => 普通购买，没有优惠

// 灵活可拆分的职责链节点
	var order500 = function(orderType, pay, stock){
		if(orderType === 1 && pay === true){
			console.log('500元定金预购，得到100元优惠券');
		}else{
			return 'nextSuccessor'; // 不需要知道下一个节点是谁，只管往后传递
		}
	};

	var order200 = function(orderType, pay, stock){
		if(orderType === 1 && pay === true){
			console.log('200元定金预购，得到50元优惠券');
		}else{
			return 'nextSuccessor'; // 不需要知道下一个节点是谁，只管往后传递
		}
	};

	var orderNormal = function(stock){
		if(stock > 0){
			console.log('普通购买，没有优惠');
		}else{
			console.log('手机库存不足');
		}
	};

	// 职责链构造函数
	var Chain = function(fn){
		this.fn = fn; // 当前节点
		this.successor = null; // 下一个节点
	};

	// 设置下一个节点
	Chain.prototype.setNextSuccessor = function(successor){
		return this.successor = successor;
	};

	// 传递请求
	Chain.prototype.passRequest = function(){
		var ret = this.fn.apply(this, arguments); // 返回请求结果

		if(ret === 'nextSuccessor'){ // 如果需要传递给下一个节点
			// 返回下一个节点执行的结果
			return this.successor && this.successor.passRequest.apply(this.successor, arguments);
		}

		return ret; // 返回请求完成的结果
	};

	// 将三个订单函数包装成职责链节点
	var chainOrder500 = new Chain(order500);
	var chainOrder200 = new Chain(order200);
	var chainOrderNormal = new Chain(orderNormal);
	// 指定职责链中的顺序
	chainOrder500.setNextSuccessor(chainOrder200);
	chainOrder200.setNextSuccessor(chainOrderNormal);

	// 测试
	chainOrder500.passRequest(1, true, 100); // => 500元定金预购，得到100元优惠券
	chainOrder500.passRequest(2, true, 100); // => 200元定金预购，得到50元优惠券
	chainOrder500.passRequest(1, false, 100); // => 普通购买，没有优惠
	chainOrder500.passRequest(1, false, 0); // => 手机库存不足

	// 新增
	var order300 = function(){
		// ...
	}

	var chainOrder300 = new Chain(order300);
	chainOrder500.setNextSuccessor(chainOrder300); // 只需修改这两处
	chainOrder300.setNextSuccessor(chainOrder200); // 只需修改这两处
	chainOrder200.setNextSuccessor(chainOrderNormal);

	// 异步的职责链
	// 提供一个next方法，来主动触发传递
	Chain.prototype.next = function(){
		return this.successor && this.successor.passRequest.apply(this.successor, arguments);
	};