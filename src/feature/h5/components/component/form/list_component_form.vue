<template>
	<div>
		<h4>FORM COMPONENTS !!!</h4>
		<div class="form_component_wrap">
			aaaa
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import "@h5/style/list_component_form.scss"

export default {
	data(){
		return {}
	},
	computed:{
		slug(){
			return 'model_1509356103';
		}
	},
	created(){
		this.$store.dispatch('formInitData',{slug:this.slug});
	}
}

</script>
