<template>
      <div class="comment_style1">
         <textarea name="name"  class="cf_content" maxlength="200" placeholder="请输入评论内容..." v-model='content.comments'></textarea>
         <!-- 选择图片  start -->
       <!-- <div class="weui">
           <div class="weui-uploader">
               <div class="weui-uploader__files">
                 <div v-for="(image,idx) in imageList">
                   <div class="weui-uploader__file">
                     <div class="deleteicon" @click="deleteimg(idx)">
                         <div class="dels">
                             <div class="delleft"></div>
                             <div class="delright"></div>
                         </div>
                     </div>
                     <img class="weui-uploader__img" :src="image"  @click="previewImage(imageList)">
                   </div>
                 </div>
               </div>
               <div class="weui-uploader__input-box"  @click="trigger">
                 <div class="weui-uploader__input"></div>
                 <input type="file" @change="onFileChange" multiple style="display: none;" id="upload_file" accept="image/*">
               </div>
           </div>
       </div> -->
       <!-- 选择图片 end -->
       <!-- 发送评论。start -->
        <button class="pro_btn_success" @click="sendmess">发送</button>
        <!-- 发送评论。end -->
    </div>
</template>
<script>
    import { mapState , mapGetters} from 'vuex';
    import '@h5/style/comment_style/component/comment_style1.scss'
    export default{
       data(){
          return {
          }
        },
        props:{
          data:Object,
        },
        methods:{
          trigger(){
            document.getElementById('upload_file').click();
          },
          onFileChange(e){
            var files = e.target.files || e.dataTransfer.files,
                componentName = this.$route.query.componentName;
                this.$store.dispatch('uploadImage',{files,componentName});
          },
          deleteimg(index){
                this.$store.dispatch('deleteImg',index);
          },
          previewImage(list){
                this.$store.dispatch('previewImage',list);
          },
          sendmess(){
                this.$store.dispatch('sendmess',{content_id:this.data.contentId});
          }
        },
        computed:{
          ...mapState({
                content: state => state.commentStyle,
                content_id: state => state.pageStore.currentDetailContentID
            }),
            ...mapGetters({
                imageList:'imageList',
            })
        }
    }
</script>
