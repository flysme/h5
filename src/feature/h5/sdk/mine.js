import Api from '@h5/api/index';
import sessionStorage from "@h5/services/sessionStorage";
import router from '@/router';
import { Toast } from 'vant';
const sdk = {
  // 修改用户信息
  dealUserInfo(data,cb){
      Api.dealUserInfo(data).then(res=>{
         cb&&cb(res)
      })
  },
  // 修改密码
  dealUserPwd(data,cb){
      Api.dealUserPwd(data).then(res=>{
         cb&&cb(res)
      })
  },
  // 获取用户信息
  getUserInfo(cb){
      Api.getUserInfo().then(res=>{
         cb&&cb(res)
      })
  },
  bindEmail(data,cb){
    Api.bindEmail(data).then(res=>{
       cb&&cb(res)
    })
  },
  /*当前用户登录状态*/
  dealLoginStatus(){
    let date = new Date(), //当前时间
        efficaTime =300000,  //有效时间
        nowTimes = Date.parse(date), // 当前时间蹉moveut
        userInfo = sessionStorage.getObject('userinfo'), //用户信息
        moveut =null;
        if(!userInfo)return;   //未登录情况下

      if(sessionStorage.get("moveut")){
        let oldTimes=sessionStorage.get("moveut");
            moveut = Number(nowTimes) - Number(oldTimes);   //上一次时间和当前时间差
            if(moveut>efficaTime){
              this.loginOut()  //注销登录
              let arr = ['moveut','userinfo']; //清除记录时差   清除用户信息
              sessionStorage.remove(...arr);
              router.push({path:`/login`});   //跳转登录
              return;
            };
      }
      sessionStorage.set('moveut',nowTimes)  //记录当前时间
  },
  loginOut(){
    Api.logout().then((res)=>{}).catch((err)=>{
        Toast({message:'服务器出错~',duration:500});
    });
  }

}

export default sdk
