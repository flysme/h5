<template>
    <div class="order-module">
        <h1>{{title}}</h1>
        <p>我包含了:</p>
        <test-component></test-component>
    </div>
</template>

<script>
import testComponent from '../../components/test'
import '../../style/test.scss'
export default {
  name: 'list',
  data () {
    return {
      title: '我是订单分支功能模块'
    }
  },
  components: { testComponent }
}
</script>
