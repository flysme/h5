import {
	Toast
} from 'vant';

//对于表单的元素检查,是否符合规则
const services = {
	mailCheck(val) {
		const mailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g; //邮箱正则

		if (!val) {
			Toast({
				message: '邮箱不能为空~',
				duration: 1000
			});
			return false;
		}

		if (!mailReg.test(val)) {
			Toast({
				message: '邮箱格式错误~',
				duration: 1000
			});
			return false;
		}

		return true;
	},
	phoneCheck(val) {
		const phoneReg = /^1[34578]\d{9}$/g; //手机正则

		if (!val) {
			Toast({
				message: '手机号不能为空~',
				duration: 1000
			});
			return false;
		}

		if (!phoneReg.test(val)) {
			Toast({
				message: '手机格式错误~',
				duration: 1000
			});
			return false;
		}

		return true;
	}
}

export default services;