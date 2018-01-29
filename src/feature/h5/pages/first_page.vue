<template>
	<pagecontainer :data="{pageUri:firstPageUri}"></pagecontainer>
</template>

<script>
import viewReaderSdk from '@h5/sdk/view_reader';
import pagecontainer from '@h5/components/page_container'

export default {
  	data () {
    	return {}
  	},
		computed: {
			firstPageUri(){
				return viewReaderSdk.getFirstPageUri();
			}
		},
  	components: {
			pagecontainer
  	},
	mounted(){

	}
}
</script>
