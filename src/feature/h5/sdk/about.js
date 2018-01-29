import Api from '@h5/api/index'

const sdk = {
  getAbout(cb){
    /**
     * @cb:html节点信息
     */
     Api.about({mock:false}).then( result => {
        cb&&cb(result.data);
     })
  }
}

export default sdk
