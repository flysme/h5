/**
 * @params    file图片文件
 * retrun     处理后的base64格式图片文件
 */
import Api from '@h5/api/index'
const sdk={
            uploadImage(file,cb){
                  if(typeof FileReader==='undefined'){
                      reject('您的浏览器不支持图片上传，请升级您的浏览器');
                  }else{
                    let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (e)=>{
                         cb&&cb(e.target.result)
                       };
                  }
            },
            getUploadImg(data,cb){
                Api.uploadImage({data}).then(res=>{
                    cb&&cb(res)
                })
            }

}

export default sdk
