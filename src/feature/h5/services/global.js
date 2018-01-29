import localStorage from '@h5/services/localStorage'

/* 自定义全局数据 */
const globalDataService = {
    setGlobal(key,data){
        this.global_params[key].value = data;
        localStorage.setObject('global_params',this.global_params);
    },
    //使用全局数据的 view_id 对应 uniqueid
    mapping:{},
    global_params : {},
    getGlobal(key){
        return this.global_params[key];
    },
};
export default globalDataService
