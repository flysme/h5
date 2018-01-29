<template>
   <div class="comment_style3">
          <!-- 评论展示   start -->
            <div class="listitem">
              <div class="itemline sys-flex sys-one"  v-for="(items,currentindex) in commentList">
                    <div class="icon">
                         <img  :src="items.replyer.avatar ? items.replyer.avatar : 'https://static-public.ddapp.com/weixin/images/people@3x.png'">
                    </div>
                    <div class="mess">
                        <div catchtap="actionSheetTap">
                            <div class="mobile">{{items.replyer.nick_name}}</div>
                            <div class="desc">{{items.comment}}</div>
                        </div>
                        <div class="imageslist">
                            <div class="mainuiitem">
                                <div :class="[wraps, {'onewraps':items.img.length < 1}]" v-for="(img,index) in items.img">
                                     <img :src="img"  bindtap="predivImage(items.img)">
                                </div>
                            </div>
                        </div>
                        <div class="numcontent sys-flex">
                            <span class="datetime">{{items.submit_date}}</span>
                        </div>
                    </div>
              </div>
            </div>
          <!-- 评论展示   end -->
          <!-- 发表评论  start-->
                <div class="forms">
                    <div class="selicon sys-flex">
                        <div class="tips sys-flex" v-if='imageList.length>0'>
                            <div class="wrapimg" v-for="(image,idx) in imageList">
                                  <img :src="image">
                                  <div class="deleteicon" @click="deleteimg(idx)">
                                      <div class="dels">
                                          <div class="delleft"></div>
                                          <div class="delright"></div>
                                      </div>
                                  </div>
                            </div>
                        </div>
                        <div class="triangle-down" v-if="imageList.length>0"></div>
                        <img src="https://static-public.ddapp.com/weixin/images/pic@3x.png" @click="trigger">
                        <img src="https://static-public.ddapp.com/weixin/images/face@3x.png">
                        <input type="file" @change="onFileChange" multiple style="display: none;" id="upload_file" accept="image/*">
                    </div>
                    <input placeholder="评论"   @keyup.enter="sendmess" v-model='content.comments'/>
                </div>
          <!-- 发表评论   end-->
   </div>
</template>
<script>
    import { mapGetters ,mapState } from 'vuex'
    import '@h5/style/comment_style/component/comment_style3.scss'
    import '@h5/style/app.css';
    export default{
        data(){
            return {

            }
        },
        created(){
            this.$store.dispatch('commentStyle',this.data.contentId)
        },
        props:{
          data:Object,
        },
        computed:{
          ...mapState({
                content: state => state.commentStyle
            }),
          ...mapGetters({
                commentList:'CommentStyle',
                imageList:'imageList',
              }),
        },
        methods:{
          trigger(){
            document.getElementById('upload_file').click();
          },
          onFileChange(e){
            var files = e.target.files || e.dataTransfer.files;
                this.$store.dispatch('uploadImage',{files});
          },
          deleteimg(index){
                this.$store.dispatch('deleteImg',index);
          },
          sendmess(){
                this.$store.dispatch('sendmess',{content_id:this.data.contentId});
          }
        }
    }
</script>
