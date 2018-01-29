<template>
    <div class="comments">
      <div class="comment_style3 comments">
        <van-pull-refresh v-model="isLoading">
                   <div class="listitem">
                      <div class="no_data" v-if="commentList.length<=0" >暂无评论</div>
                      <div class="items"   v-for="(items,currentindex) in commentList" >
                        <div class="sys-flex sys-one">
                              <div class="icon">
                                  <img  :src="img(items)"  mode="aspectFill">
                              </div>
                              <div class="mess">
                                  <div @click="actionSheetTap(items)" >
                                      <div class="mobile">{{items.replyer && items.replyer.nick_name || '匿名用户'}}</div>
                                      <div class="desc">{{items.comment}}</div>
                                  </div>
                                  <div class="imageslist">
                                      <div class="mainuiitem">
                                          <div :class="['wraps', {'onewraps':items.img.length < 1}]" v-for="(img,index) in items.img">
                                              <img :src="img"  @click='previewImage(items.img)' class="scale_to_fill">
                                              <!-- <image :src="img"  :data-id="index" data-data="items.img" bindtap="predivImage" mode="scaleToFill"></image> -->
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numcontent sys-flex">
                                      <span class="datetime">{{items.submit_date}}</span>
                                      <div class="slugs" @click="setthumb(items)">
                                          <img v-if="!items.is_like" src="https://static-public.ddapp.com/weixin/images/Fabulous_nor@3x.png">
                                          <img v-else src="https://static-public.ddapp.com/weixin/images/Fabulous_pre@3x.png">
                                          <span>{{items.like}}</span>
                                      </div>
                                  </div>
                              </div>
                           </div>
                           <div class="revicewrap" v-if='items.reply_comment'>
                               <div class="remess">
                                  <div @click="actionSheetTap(items.reply_comment)">
                                      <div class="mobile bules">{{items.reply_comment && items.reply_comment.replyer.nick_name}}</div>
                                      <div class="desc">{{items.reply_comment.comment}}</div>
                                  </div>
                                  <div class="imageslist">
                                      <div class="mainuiitem">
                                          <div :class="['wraps',{'onewraps':items.reply_comment.img.length < 1}]" v-for="(img,index) in items.reply_comment.img">
                                               <img :src="img"  @click='previewImage(items.reply_comment.img)' class="scale_to_fill">
                                             <!-- <image :src="img"  :data-id="index" :data-data="items.reply_comment.img" bindtap="predivImage" mode="scaleToFill"></image> -->
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numcontent sys-flex">
                                      <span class="datetime">{{items.reply_comment.submit_date}}</span>
                                      <div class="slugs"  @click="setthumb(items.reply_comment)">
                                          <img v-if="!items.reply_comment.is_like" src="https://static-public.ddapp.com/weixin/images/Fabulous_nor@3x.png">
                                          <img v-else src="https://static-public.ddapp.com/weixin/images/Fabulous_pre@3x.png">
                                          <span>{{items.reply_comment.like}}</span>
                                      </div>
                                  </div>
                               </div>
                           </div>
                      </div>
                   </div>
                 </van-pull-refresh>

                   <!-- 发送评论 start -->
                  <div class="forms sys-flex" @click='sendmess'>
                  <!-- <div class="forms sys-flex" bindtap="sendmess"> -->
                        <input placeholder="评论" v-focus='comments.focus' @blur="blurinput" :disabled='!comments.focus' @keyup.enter="submit(comments.content)" v-model='comments.content'/>
                        <!-- <input placeholder="评论" focus="{{!initialization}}"   confirm-type="done" disabled='{{initialization}}' bindconfirm="submit"   value="{{content}}"/> -->
                        <div>
                            <img src="https://static-public.ddapp.com/weixin/images/face@3x.png">
                        </div>
                  </div>
                  <!-- 发送评论 end -->
            <van-actionsheet v-model="show" :actions="actions" cancelText="取消" />
     </div>
    </div>
</template>
<style scoped>
  .scale_to_fill{
      object-fit: fill;
  }
</style>
<script>
  import {mapState, mapActions, mapGetters } from 'vuex';
  import { ImagePreview ,PullRefresh,Toast} from 'vant';
  import '@h5/style/commentList/comments.scss';
  import '@h5/style/app.css';
  export default {
      name:'comments',
      data() {
        return {
          show: false,
          dataset:{},
          isLoading: false,
           actions: [
             {
               id:0,
               name: '回复',
               callback: this.onClick
             },
             {
               id:1,
               name: '复制',
               callback: this.onClick
             },
             {
               id:2,
               name: '举报',
               callback: this.onClick
             }
           ]
        }
      },
      mounted(){
          this.$store.dispatch('getcommentlist',this.contentIds);
      },
      computed: {
    		...mapGetters({
              commentList:'getcommentList',
            }),
        ...mapState({
              // comments
              comments: state => state.comments,
              contentIds: state => state.pageStore.currentDetailContentID
           })
    	},
      methods:{
        img(items){
          if(items.replyer && items.replyer.avatar){
            return items.replyer.avatar
          }
          return 'https://static-public.ddapp.com/weixin/images/people@3x.png'
        },
        // 调出actionSheetTap
        actionSheetTap(item) {
          console.log(item,'item');
          // 获取当前评论所有信息
            this.dataset = item;
            this.show = true;
          },
          // action 回调方法
        onClick(item) {
              this.$store.dispatch('focus',{'item':item,'type':false,'router':this.$router,'comments':this.dataset});
              this.show = !this.show;
         },
        // 回复单条评论
         submit(comment){
           console.log(comment,'comment',this.dataset.id,'this.dataset');
          // this.data.getparams   拿到详情页面id  -----content_id
           this.$store.dispatch('sendcommentList',{'content_id':this.contentIds,'comment_id':this.dataset.id,'comment':comment});
         },
        //  失去焦点
         blurinput(){
           console.log('失去焦点')
           this.$store.dispatch('focus',{'type':true});
         },
        //预览图片
         previewImage(imagelist){
           ImagePreview(imagelist);
         },
        //  发送评论
         sendmess(){
          //  跳转去评论样式1
            this.$router.push({ path: '/comment_style',query: {componentName: 'comment_style1',content_id:this.contentIds}})
         },
        //  点赞
         setthumb(data){
           console.log(data,'data');
           let comment_id = data.id,
              verb = 'like',
              like = data.is_like,
              _this = this;
           this.$store.dispatch('setthumb',{comment_id,like,verb}).then((state)=>{
               if(state){
                 _this.$store.dispatch('getcommentlist',_this.contentIds);
               }
           });
         }
      },
      watch: {
         isLoading() {
           if (this.isLoading) {
             Toast('刷新成功');
             this.$store.dispatch('getcommentlist',this.contentIds);
             setTimeout(() => {
               this.isLoading = false;
               console.log('刷新成功')
             }, 500);
           }
         }
      }
  }
</script>
