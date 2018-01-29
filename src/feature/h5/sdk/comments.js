import Api from '@h5/api/index'
import services from '@h5/services/utils'
/**
 * @params contentIds 页面id
 * @params cb Function
 * @retrun
 */
const sdk ={
      getcommentList(contentIds,cb){
          /**
           * id pageid
           * page
           * size
           * order
           * include_reply
           */
          let data={
                  id:contentIds,
                  'api.page' : 1,
                  'api.size':20,
                  order: '-submit_time',
                  include_reply : false
              };
              Api.getCommentList( {data} ).then( result => {
                  if(result.error_code==0){
                    result.data.result.data.forEach(commentItem => {
                      // 此处 UtilsService 未引入
                      commentItem.submit_date = services.formatTime(commentItem.submit_date, 'yyyy-MM-dd' );
                    });
                  }
                  cb&&cb(result.data);
              });
      },
      getcommentItem(contentIds,cb){
        Api.getCommentItem( {'content_id':contentIds} ).then( result => {
            result.data.forEach(commentItem => {
              // 此处 UtilsService 未引入
              commentItem.submit_date = services.formatTime(commentItem.submit_date, 'yyyy-MM-dd' );
            });
            cb&&cb(result.data);
        });
      },
      setcommentList(data={},cb){
            Api.postComment({data}).then( result => {
                cb&&cb(result.data);
            } )

      },
      setthumb(data={},cb){
                let requestApi ='commitLike';
                let res ={data:data};
                if(!data.like){
                   requestApi ='commitLike';
                   res ={data:data};
                }else{
                   requestApi ='delLike';
                   res ={comment_id:data.comment_id};
                }
                console.log('requestApi',requestApi)
                Api[requestApi](res).then(result => {
                    cb&&cb(result);
                })
      }
}


export default sdk
