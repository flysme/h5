<template>
    <div>
        创建订单咯
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import '@/style/shoppingcart/createorder.scss';

export default {
	name: 'createOrder',
    data() {
        return {
            showDelete : false
        };
    },
	methods: {
	},
	created() {
    console.log(this.$route.params,"this.$route.params");
        this.$store.dispatch({
            type: 'initOrderData',
            param: this.$route.params
        })
	},
    computed: {
        ...mapState({
        })
	},
};
</script>
