<template>
	<div class="login_wrap">
		<h2 class="login_title">登录</h2>
		<div class="login_form">
			<div class="form_wrap">
				<div class="username">
					<input type="text" placeholder="用户名/手机号/邮箱" v-model="username" v-focus="userfocus"/>
				</div>
				<div class="password">
					<input type="password" placeholder="密码" v-model="password" v-focus="passfocus"/>
					<p @click="forgotPassword">忘记密码</p>
				</div>
				<!--按钮-->
				<button class="login_btn" @click="login">登录</button>
			</div>
		</div>
		<div class="login_bottom">
			<p>还没有账号?<span @click="toRegister">立即注册</span></p>
		</div>
		<!--忘记密码的弹窗-->
		<van-popup v-model="showDialog">
			<p class="forgetMailTip" @click="findPassword('mail')">通过邮箱找回</p>
			<p class="forgetMailTip" @click="findPassword('phone')">通过手机找回</p>
		</van-popup>
	</div>
</template>

<script>
import "@h5/style/login/login.scss"
import API from "@h5/api/index"
import FORM_CHECK from  "@h5/services/formCheck"
import sessionStorage from "@h5/services/sessionStorage"

export default {
	data(){
		return {
			showDialog:false,
			username:'',
			password:'',
			passfocus:false,
			userfocus:false
		}
	},
	methods:{
		forgotPassword(){
			this.showDialog=true;
		},
		toRegister(){
			this.$router.push({name:"register"});
		},
		findPassword(type){
			this.$router.push({path:'/findpass',query:{form:type}})
		},
		login(){
			//判断用户名密码是否为空
			if(this.username==''){
				this.$toast({message:'用户名或不能为空~',duration:1000});
				this.userfocus=true;
				return;
			}
			if(this.password==''){
				this.$toast({message:'密码不能为空~',duration:1000});
				this.passfocus=true;
				return;
			}
			//还原focus操作
			this.userfocus=this.passfocus=false;

			//提交的参数
			let params={
			    "username": this.username,
			    "password": this.password,
			}
			//判断输入的数据是什么类型
			let isPhone=FORM_CHECK.phoneCheck(this.username),
				isMail=FORM_CHECK.mailCheck(this.username),
				isUser=true;//默认由用户名登陆

			//追加平台类型
			if(isPhone){
				params['platform']='mobile';
				isUser=false;
			} else if(isMail){
				params['platform']='email';
				isUser=false;
			}
			//根据平台实现登陆
			if(isPhone||isMail||isUser){
				//开始登陆操作
				this.$toast.loading({message:'正在登录...',duration:0, forbidClick: true});// 禁用背景点击
				API.login({data:params}).then((res)=>{
					let data=res.data.result,code=res.data.error_code,message=res.data.error_message;
					if(code==0){
						this.$toast.success({message:'登录成功~',duration:500});
						this.$store.commit('usermine/SET_USER_INFO',data);
						//返回到上个页面
						this.$router.go(-1);
					}else{
						this.$toast({message,duration:500});
					}
				}).catch((err)=>{
					this.$toast({message:'服务器出错,请重新登录~',duration:500});
				});
			}
		}
	}
}

</script>
