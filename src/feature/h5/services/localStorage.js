/**
 *@key 存储的键值
 *@value 默认值
 */

 const localStorage ={
   //存储单个属性
    set(key,value){
       window.localStorage.setItem(key,value);
    },
   //读取单个属性
    get(key){
      return window.localStorage.getItem(key);
    },
    //删除属性
    remove(key){
       window.localStorage.removeItem(key);
    },
    // 存储对象属性
    setObject(key,value){
       window.localStorage.setItem(key,JSON.stringify(value));
    },
    // 读取对象
    getObject(key){
      return JSON.parse(window.localStorage.getItem(key));
    }

 }

export default localStorage
