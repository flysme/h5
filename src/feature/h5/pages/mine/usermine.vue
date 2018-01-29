<template>
    <div class="userinfo">
        <!-- 展示修改选项面板 -->
        <div class="" v-if="panelStatus">
          <div  v-for="(item,idx) in userItem" @click="Onclick(idx)">
              <div class="sys-flex list-item">
                <span>{{item.name}}</span>
                <img v-if="idx=='avatar'" :src="item.value||'https://static-public.ddapp.com/weixin/images/people@3x.png'" mode="aspectFill" class="imgsize"></image>
                <div v-else class="sys-flex sys-flex-center"  >{{item.value}}<span class="arrow"></span></div>
             </div>
          </div>
        </div>
         <!-- 修改表单 -->
         <div  v-else class="overflow">
              <div class="" v-if="usermine.showStatus=='nick_name'||usermine.showStatus=='signature'">
                <div  v-if="usermine.showStatus=='nick_name'">
                    <!--输入框-->
                  <textarea name="name" v-model="nick_name" ></textarea>
                  <!--按钮-->
                  <button class="login_btn" @click="requireMess(nick_name,usermine.showStatus)">保存</button>
                </div>
                <div  v-else>
                    <!--输入框-->
                  <textarea name="name" v-model="signature"></textarea>
                  <!--按钮-->
                  <button class="login_btn" @click="requireMess(signature,usermine.showStatus)">保存</button>
                </div>
              </div>
              <div v-else-if="usermine.showStatus=='passWord'">
                <div class="newpassword_0">
                  <input type="password"  placeholder="输入密码" v-model="password_0" maxlength=20 autocomplete="off"/>
                </div>
                <div class="newpassword_1">
                  <input type="password"  placeholder="输入新密码" v-model="password_1" maxlength=20 autocomplete="off"/>
                </div>
                <div class="newpassword_2">
                  <input type="password"  placeholder="确认密码" v-model="password_2" maxlength=20 autocomplete="off"/>
                </div>
                <!--按钮-->
                <button class="setpass_btn" @click="requireMess({password_0,password_1,password_2},usermine.showStatus)">提交</button>
              </div>
              <div v-else>
                <div class="newpassword_3">
                  <input type="text"  placeholder="请输入邮箱" v-model="email" autocomplete="off"/>
                </div>
                <!--按钮-->
                <button @click="requireMess(email,usermine.showStatus)">提交</button>
              </div>
         </div>
    </div>
</template>
<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import sessionStorage from "@h5/services/sessionStorage";
  import "@h5/style/common/uikit.scss";
  import "@h5/style/login/setpassword.scss"
  import { Loading } from 'vant';
  import "@h5/style/app.css";
  import "@h5/style/usermine/usermine.scss";
      export default{
          data(){
            return {
              nick_name:sessionStorage.getObject('userinfo')['nick_name']||'',
              signature:sessionStorage.getObject('userinfo')['signature']||'',
              password_0:'',
              password_1:'',
              password_2:'',
              email:sessionStorage.getObject('userinfo')['email']||'',
            }
          },
          mounted(){
            console.log('我是资料',this.panelStatus);
          },
          computed:{
              ...mapState('usermine',['userItem','panelStatus']),
              ...mapState({
                    usermine: state => state.usermine,
                }),
          },
          methods:{
            Onclick(idx){
                this.initPanel(idx,this.panelStatus,idx);
                if(idx=='avatar')this[idx]()
            },
            avatar(sta){
              console.log('dealIcon')
            },
            // 修改用户信息
            requireMess(defaultVal,type){
              let params = {
                  defaultVal:defaultVal,
                  type:type
              };
              this.$store.dispatch('usermine/requireMess',params)
            },
            initPanel(item = '',status,idx = 0,flog){
              let params = {'showStatus':item || '',panelStatus:status};
              if(idx!='avatar' || flog)this.$store.commit('usermine/PANEL_STATUS',params)
            },
          },
          beforeRouteLeave(to,from,next){
            let arr = ['',false,'',true];
            this.initPanel(...arr);
            next();
          }
      }
</script>
