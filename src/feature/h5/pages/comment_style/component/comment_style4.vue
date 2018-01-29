<template>
   <div class="comment_style4">
      <!-- 头部星级评论 start -->
          <div class="headtitle sys-flex">
                <span>服务态度</span>
                <div class="star">
                      <img :src="content.starLists.star<index+1 ? 'https://static-public.ddapp.com/weixin/images/starh@3x.png' : 'https://static-public.ddapp.com/weixin/images/star@3x.png'" v-for="(starItem,index) in content.starLists.starList"  @click="selstar(index+1)">
                      <div class="textnum" v-if="content.starLists.star==''">0分</div>
                      <div class="textnum" v-else>{{content.starLists.star}}分</div>
                </div>
          </div>
      <!-- 头部星级评论 end -->
          <textarea class="cf-content" maxlength="200"  auto-height v-model="content.comments" placeholder="请输入评论内容..." />
          <!-- 上传图片 start -->
          <!-- <div class="weui">
              <div class="weui-uploader">
                  <div class="weui-uploader__files">
                    <div v-for="(image,idx) in imageList">
                      <div class="weui-uploader__file">
                        <div class="deleteicon" bindtap="deleteimg(idx)">
                            <div class="dels">
                                <div class="delleft"></div>
                                <div class="delright"></div>
                            </div>
                        </div>
                        <img class="weui-uploader__img" :src="image" bindtap="predivImage(imageList)">
                      </div>
                    </div>
                  </div>
                  <div class="weui-uploader__input-box"   @click="trigger">
                    <div class="weui-uploader__input"></div>
                    <input type="file" @change="onFileChange" multiple style="display: none;" id="upload_file" accept="image/*">
                  </div>
              </div>
          </div> -->
          <!-- 上传图片 end -->
         <button class="pro_btn_success" @click="sendmess(content.starLists.star)">发布评论</button>
   </div>
</template>
<script>
import { mapState , mapGetters} from 'vuex';
import '@h5/style/comment_style/component/comment_style4.scss'
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
        var files = e.target.files || e.dataTransfer.files;
            this.$store.dispatch('uploadImage',files);
      },
      deleteimg(index){
            this.$store.dispatch('deleteImg',index);
      },
      previewImage(list){
            this.$store.dispatch('previewImage',list);
      },
      sendmess(star){
            this.$store.dispatch('sendmess',{star,'content_id':this.data.contentId});
      },
      selstar(index){
        console.log('selstar',index)
          this.$store.dispatch('setStar',index);
      }
    },
    computed:{
      ...mapState({
            content: state => state.commentStyle
        }),
        ...mapGetters({
            imageList:'imageList',
        })
    }
}
</script>
