<template>
	<pagecontainer :data="{pageUri:pageUri}"></pagecontainer>
</template>

<script>
import pagecontainer from '@h5/components/page_container';
import uriServices from '@h5/services/uri';
import APPCONFIG from "@h5/static/app_config.js"



export default {
  	data () {
    	return {
    	}
  	},
		props:{
			option:Object,
		},
  	components: {
		    pagecontainer
  	},
		created(){
			this.$store.commit('pageStore/INIT_PAGE_PARAMS',this.option);
		},
    computed: {
  		pageId(){
        return this.$route.query.module_id;
  		},
      pageUri(){
        let uri = APPCONFIG.pages.pages[ this.pageId ].uri,
            parseResult = uriServices.parse( uri );
        parseResult.params = Object.assign({}, parseResult.params, this.$route.query);
        let newUri = uriServices.stringifyUrl( parseResult );
        return newUri;
      },
  	},
}
</script>
