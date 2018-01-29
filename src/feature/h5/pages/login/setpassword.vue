<template>
	<div class="setpass_wrap">
		<h2 class="setpass_title">设置密码</h2>
		<div class="setpass_form">
			<div class="form_wrap">
				<div class="tipinfo">
					<span>已向手机 {{phone}} 发送验证码</span>
				</div>
				<div class="verifynumber">
					<input type="number" placeholder="请输入验证码" v-model="verifycode"/>
					<p @click="sendVerify(false)">重新发送<span v-show="showTime">({{count}}s)</span></p>
				</div>
				<div class="newpassword_0">
					<input type="password" placeholder="输入密码" v-model="password_0" />
				</div>
				<div class="newpassword_1">
					<input type="password" placeholder="确认密码" v-model="password_1" />
				</div>
				<!--按钮-->
				<button class="setpass_btn" @click="registerUser">提交</button>
			</div>
		</div>

	</div>
</template>

<script>
import "@h5/style/login/setpassword.scss"
import API from "@h5/api/index"
import sessionStorage from "@h5/services/sessionStorage"

export default {
	data(){
		return {
			showTime:false,
			count:60,
			verifycode:'',
			password_0:'',
			password_1:''
		}
	},
	props:{
		phone:Number,
		optiontype:String
	},
	beforeRouteEnter (to, from, next) {
		//不包含就让它直接调回login界面
		if(!to.query.phone) next({name:'login'});
		else next();
	},
	created(){
		//第一次打开的时候自动发送验证码
		this.sendVerify(true);
	},
	methods:{
		computedTime(){
			this.timer=setInterval(()=>{
				if(this.count ==0){
					clearInterval(this.timer);
					this.showTime=false;
					this.count=60;
				}
				this.count--;
			},1000);
		},
		sendVerify(isInit){
			let _this=this;
			//判断是否在倒计时的时候点击
			if(_this.showTime){
				_this.$toast({message:'验证码已发送~',duration:1000});
				return;
			}
			//启动倒计时 第一次自动发送
			if(!isInit){
				_this.showTime=true;
				_this.computedTime();
			}
			//发送验证码
			API.sendVerifyCode({data:{
				"type": _this.optiontype,
				"mobile": _this.phone.toString()
			}}).then((result)=>{
				console.log("xxxx 发送验证码返回的结果",result);
				let code=result.data.error_code;
				if(code==0){
					_this.$toast({message:'验证码发送成功~',duration:1500});
				}else{
					_this.$toast({message:'验证码发送失败,请重新发送~',duration:1500});
				}
			});
		},
		reqRegister(){
			//开始注册
			let params={
			    "register_type": "mobile",
			    "username": this.phone,
			    "password": this.password_1,
			    "nick_name": "暂无用户名",
			    "verify_code":this.verifycode
			}

			this.$toast.loading({message:'正在注册...',duration:0, forbidClick: true});// 禁用背景点击
			API.register({data:params}).then((res)=>{
				let data=res.data.result,code=res.data.error_code,message=res.data.error_message;
				if(code==0){
					this.$toast.success({message:'注册成功~',duration:500});
					this.$store.commit('usermine/SET_USER_INFO',data);
					//注册完毕后-->index
					this.$router.replace({path:'/login'});
				}else{
					this.$toast({message,duration:500});
				}
			}).catch((err)=>{
				this.$toast({message:'服务器出错,请重新注册~',duration:500});
			});
		},
		resetPassword(){
			//找回密码
			let params={
			    "password": this.password_1,
			    "verify_code":this.verifycode,
			    "mobile": this.phone
			}

			this.$toast.loading({message:'正在重置...',duration:0, forbidClick: true});// 禁用背景点击
			API.getPassFromPhone({data:params}).then((res)=>{
				let code=res.data.error_code,message=res.data.error_message;
				if(code==0){
					this.$toast.success({message:'重置成功~',duration:500});
					sessionStorage.remove('userinfo');
					//重置后-->login
					this.$router.replace({path:'/login'});
				}else{
					this.$toast({message,duration:500});
				}
			}).catch((err)=>{
				this.$toast({message:'服务器出错~',duration:500});
			});
		},
		registerUser(){
			//判断是否为空
			if(!this.verifycode) this.$toast('请填写验证码~');
			else if(!this.password_0) this.$toast('请填写密码~');
			else if(!this.password_1) this.$toast('请填写确认密码~');
			else{
				//比较密码
				if(this.password_0!==this.password_1){
					this.$toast('密码输入不一致~');
					return;
				}
				//区分注册还是找回密码
				if(this.optiontype==='register') this.reqRegister();
				else this.resetPassword();
			}
		}
	}
}

</script>
