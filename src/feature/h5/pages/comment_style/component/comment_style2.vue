<template>
    <div class="comment_style2">
        <!-- 获取详情的商品图片，标题，描述信息  start -->
           <!-- <div class="sys-flex list_wrap" wx:if="{{ PAGE.details._widget.indexpic &&  PAGE.details._widget.title && PAGE.details.sub_title}}">
             <div>
                <img src="{{PAGE.details._widget.indexpic}}" mode="aspectFill" class="shop_icon">
            </div>
            <div class="sys-flex sys-vertical">
                 <div class="title"> <span>{{PAGE.details._widget.title}}</span></div>
                 <div class="desc"><span>{{PAGE.details.sub_title}}</span></div>
            </div>
          </div> -->
        <!-- end -->
        <!-- 评论展示 start -->
          <div class="list-item" v-for="(item,index) in commentList">
              <div class="sys-flex">
                  <div>
                     <img class="user_icon"  :src="item.replyer.avatar ? item.replyer.avatar : 'https://static-public.ddapp.com/weixin/images/people@3x.png'">
                 </div>
                  <div class="sys-flex sys-vertical wrap-list">
                    <div class="sys-flex flex-between">
                        <div class="nick_name"> <span>{{item.replyer['nick_name']}}</span></div>
                        <div class="date_time"><span>{{item['submit_date']}}</span></div>
                        <div class="times"><span>{{item.like}}</span></div>
                    </div>
                      <div class="remark"><span>{{item.comment}}</span></div>
                  </div>
              </div>
          </div>
          <!-- 评论展示 end -->
          <!-- 发送评论 start -->
           <div class="forms sys-flex">
                    <input placeholder="评论" @keyup.enter="sendmess"   v-model='content.comments'/>
                    <div class="selicon">
                        <img src="https://static-public.ddapp.com/weixin/images/face@3x.png">
                    </div>
           </div>
          <!-- 发送评论 end -->
        </div>
</template>
<script>
    import { mapGetters ,mapState } from 'vuex'
    import '@h5/style/comment_style/component/comment_style2.scss'
    import '@h5/style/app.css';
    export default{
        data(){
            return {

            }
        },
        props:{
          data:Object,
        },
        created(){
            this.$store.dispatch('commentStyle',this.data.contentId)
        },
        computed:{
          ...mapState({
                content: state => state.commentStyle
            }),
          ...mapGetters({
                commentList:'CommentStyle',
              }),
        },
        methods:{
          sendmess(){
                this.$store.dispatch('sendmess',{content_id:this.data.contentId});
          }
        }
    }
</script>
