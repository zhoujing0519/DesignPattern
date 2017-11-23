// 利用Proxy重构表单验证...............................................................
// 利用proxy拦截不符合要求的数据
	function validator(target, validator, errorMsg){
		return new Proxy(target, {
			_validator: validator,
			set(target, key, value, proxy){
				let errMsg = errorMsg;
				if(value === ''){
					alert(`${errMsg[key]}不能为空！`);
					return target[key] = false;
				}

				let va = this._validator[key];
				if(!!va(value)){
					return Reflect.set(target, key, value, proxy);
				}else{
					alert(`${errMsg[key]}格式不正确`);
					return target[key] = false;
				}
			},
		});
	}

// 负责校验逻辑的代码
	const validators = {
		name(value){
			return value.length > 6;
		},
		passwd(value){
			return value.length > 6;
		},
		mobile(value){
			return /^1(3|5|7|8|9)[0-9]{9}$/.test(value);
		},
		email(value){
			return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		},
	};

// 客户端调用代码
	const errorMsg = {
		name: '用户名',
		passwd: '密码',
		mobile: '手机号码',
		email: '邮箱地址',
	};
	const vali = validator({}, validators, errorMsg);
	let registerForm = document.querySelector('#registerForm');

	registerForm.addEventListener('submit', function(e){
		e.preventDefault();
		let validatorNext = function*(){
			yield vali.name = registerForm.userName.value;
			yield vali.passwd = registerForm.password.value;
			yield vali.mobile = registerForm.phoneNumber.value;
			yield vali.email = registerForm.emailAddress.value;
		};
		let validator = validatorNext();

		validator.next();
		!vali.name || validator.next(); // 上一步的校验通过才执行下一步
		!vali.passwd || validator.next();
		!vali.mobile || validator.next();
	});