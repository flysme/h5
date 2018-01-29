import { GET_COMMENT_LIST,FOCUS_KEYBOARD ,SEND_COMMENT_LIST, SETTHUMB} from '../mutation-types';
import {COMMENTS} from '@h5/sdk/index'
import { Toast } from 'vant';

const state = {
  focus: false,
  getparams: '',
  content: '',
  commentList: [],
};


const actions = {
    getcommentlist({commit}, params){
        COMMENTS.getcommentList(params,(res)=>{
          console.log('res:',res)
          commit(GET_COMMENT_LIST,res);
        })
    },
    focus({commit},params){
        commit(FOCUS_KEYBOARD,params);
    },
    sendcommentList({commit},params){
        COMMENTS.setcommentList(params,(res)=>{
          state.content='';   //清空输入框内容
          state.focus=!state.focus; //清空焦点
          if(res.error_code==0){
              console.log('12212');
              Toast('评论成功');
          }else{
              Toast(res.error_message);
          }
        })
    },
    setthumb({commit},params){
      return new Promise((resolve,reject)=>{
        COMMENTS.setthumb(params,(res)=>{
          console.log('res',res)
          if(res.data.error_code=='0'){
              console.log('params',params);
              let toast = params.like ? '取消点赞' :'点赞成功';
              Toast(toast);
              resolve(true);
          }else{
              Toast('点赞有误');
              resolve(false);
          }
        })
      })

    }
}

const mutations = {
    [GET_COMMENT_LIST](state,result){
      console.log("data",result.result.data);
      let commentlist = result.result.data;
      state.commentList= commentlist;
    },
    [FOCUS_KEYBOARD](state,params){
            console.log(params);
            if(params.type){
              state.focus=false;
              return;
            }
            if(params.item.id == 0){
                state.focus=true;
            }else if(params.item.id == 2){
              let router = params.router;
              // router.push({path:'/report',query:{'content_id':params.comment_id}});
              // 隐藏参数显示
              console.log(params,'params.comments')
              router.push({name:'report',params:{'comments':params.comments}});
              //  路由到举报页面  需要拿到当前评论conent-id
            }else{
              //复制内容
            }
    },
};


const getters = {
  getcommentList(){
    return state.commentList.reverse();
  }
};


export default {
  state,
  mutations,
  getters,
  actions
}
