<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!--测试 router的Props属性-->
    <div class="show_props_name" v-show="username">
      <span>更改路由参数:</span>
      <router-link to="/hello/zhangsan">TO_LINK_ZHANGSAN</router-link>
      <router-link to="/hello/zhaosi">TO_LINK_ZHAOSI</router-link>
      <p>获得路由过来的参数:{{username}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    username:{
      type:String,
      default:"no_username"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
