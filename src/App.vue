<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition name="slider" mode="out-in">
    	<router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
import '@/style/reset.css';
</script>


<style lang="scss">
body{background: #333;}
#app{
  position: relative;
  height: 100vh;
  max-width: 64vh;
  margin: 0 auto;
  background: white;
}

.slider-enter-active,.slider-leave-active{
	transition: all 0.2s ease;
}

.slider-enter{
	transform: translateX(100%);
	opacity:0;
}

.slider-leave-to{
	transform:translateX(-100%);
	opacity:0;
}
</style>
