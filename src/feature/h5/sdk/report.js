import Api from '@h5/api/index'



const sdk = {
  sendReport(data,cb){
    /**
     * @verb : report,
     * @action_object:reports.id,
     * @action_object_content_type:comment,
     * @reason: reporttype,
     * @content:content
     */
    Api.setreport({data}).then( result => {
        cb&&cb(result.data);
    })
  }
}

export default sdk
