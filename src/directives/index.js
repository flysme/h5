import Vue from 'vue'

// dom获取焦点
Vue.directive('focus', {
// 当被绑定的元素更新时…
update: function (el,binding) {
    if(binding.value){
      // 聚焦元素
      el.focus()
    }
  }
})
