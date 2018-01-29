import { COMMENTSTYLE ,COMMENTS } from '@h5/sdk/index';
import { GET_COMMENT_STYLE ,UPLOAD_IMAGES,SET_STARS} from '../mutation-types';
import { ImagePreview ,Toast } from 'vant';
import UTILS from "@h5/services/utils";
const state = {
    comments:'',
    imageList:[],
    commentList:[],
    starLists:{
           starList:5,    //星级数
           star:''         //好评星数
       },
};

const actions = {
  uploadImage({commit,state},params){
      if(!params.files.length)return;
      // 这边判断需加上不同模板关系that.Data.viewid.indexOf('comment_style3') >= 0
      if(state.imageList.length>=3&&params.componentName.indexOf('comment_style3') >= 0){
          Toast('照片最多为三张');
          return;
      }
      let imageList = [];
      for(var img of params.files){
          COMMENTSTYLE.uploadImage(img,result =>{
            let name = `'image/'${UTILS.uuId()}`,
                image = result;
            COMMENTSTYLE.getUploadImg({name,image},res=>{
              console.log(res,'res');
            })
              state.imageList.push(result);
          })
      }
  },
  deleteImg({commit,state},params){
      state.imageList.splice(params, 1);
  },
  previewImage({commit,state},params){
      ImagePreview(params);
  },
  sendmess({commit,state},params){
    console.log('params',params)
      if(state.comments==''){
        Toast('请填写评论内容');
      }else{
        let data={
          // 获取内容id    根据存储
          content_id:params.content_id,
          comment:state.comments,
          img:state.imageList
        }
        // 判断是否要传星级数量评价
        if(params.star){
            data.star=params.star;
        }
        console.log('data',data)
        COMMENTS.setcommentList(data,result => {
            if(result.error_code==0){
                Toast('评论成功');
            }else{
              Toast(result.error_message);
            }
        })
      }
  },
  commentStyle({commit}, params){
      COMMENTS.getcommentItem(params,(res)=>{
          commit(GET_COMMENT_STYLE,res);
      })
  },
  // 设置评论星级数
  setStar({commit},params){
      commit(SET_STARS,params);
  }
};

const mutations = {
  [GET_COMMENT_STYLE](state,res){
    let commentlist = res.result.data;
    state.commentList=commentlist;
  },
  [SET_STARS](state,res){
     state.starLists.star=res;
  }
};

const getters = {
    imageList(){
      return state.imageList;
    },
    comments(){
      return state.comments;
    },
    CommentStyle(){
      return state.commentList;
    }
};


export default {
  state,
  actions,
  mutations,
  getters,
}
