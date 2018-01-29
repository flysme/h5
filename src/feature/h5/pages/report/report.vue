<template>
      <div class="report" >
        <span  class="title">举报{{comments.replyer['nick_name']}}内容</span>
        <div class="reportcontent">
            <input disabled :value="comments.comment"/>
        </div>
        <div class="veri-line"></div>
        <div class="radio">
          <van-radio-group v-model="radio">
            <label class="labels" v-for="item in items">
              <van-radio :name="item.name">{{item.value}}</van-radio>
            </label>
          </van-radio-group>
        </div>
        <div class="content">
            <textarea  placeholder="请详细填写" placeholder-class="textplace" v-model='content' show-confirm-bar/>
        </div>
        <button @click="setrecontent">举报</button>
    </div>
</template>
<script>
    import {mapState, mapActions, mapGetters } from 'vuex';
    import { Toast } from 'vant';
    import localStorage from '@h5/services/localStorage.js'
    import '@h5/style/report/report.scss';
    import '@h5/style/app.css';
    export default {
      data(){
        return {
          radio:'',
          content:'',
          comments:{}
        }
      },
      computed:{
        ...mapGetters({
              items:'items',
            }),
        ...mapState({
              // 拿到
              // comments: state => state.r
           })
      },
      created(){
        if(typeof(this.$route.params.comments) == "undefined"){
          this.comments = localStorage.getObject('reportmess');
        }else{
          this.comments=this.$route.params.comments;
          localStorage.setObject('reportmess',this.comments)
        }
      },
      methods:{
        setrecontent(){
          let params = {
             "verb": "report",
             "action_object": this.comments.id,
             "action_object_content_type": 'comment',
             "reason": this.radio,
             "content": this.content
            }
          this.$store.dispatch('sendreport',{'params':params,'route':this.$router});
        }
      },
      watch:{
        radio(val){
            console.log(val,'xxx');
        }
      },
      // 路由离开前移除localstorage储存的信息
      beforeRouteLeave(to,from,next){
        localStorage.remove('reportmess');
        next();
      }
    }
</script>
