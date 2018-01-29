<template>
	<div class="search_widget"  @click="listSearchJump" >
	    <div :class="['search_bar','search_bar_fix','relative','search_bar_' + VIEWS[ item ].style]">
	      	<div :class="['search_icon',{'search_icon_left':VIEWS[ item ].style==6},{'search_icon_right':VIEWS[ item ].style==7}]">
	        	<img :src="VIEWS[ item ].search_icon.img_url" >
	      	</div>
	      	<div class="search_text" >{{VIEWS[ item ].search_textfield_text}}</div>
	    </div>
	</div>
</template>
<style scoped>

</style>
<script>

export default {
	name: 'search_widget',
	data () {
	    return {

	    }
	},
	props:{
		data:Object
	},
	computed:{
		VIEWS(){
	      return this.data.VIEWS
	    },
	    componentData(){
	      return this.data.componentData
	    },
	    item(){
	      return this.data.item
	    }
	},
	methods:{
  		listSearchJump() {

  		}
    }
}
</script>