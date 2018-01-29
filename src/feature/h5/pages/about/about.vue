<template>
    <div v-html='mess'>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        data(){
          return {
          }
        },
        computed:{
          ...mapGetters({
                mess:'mess'
          })
        },
        created(){
          this.init();

        },
        methods:{
          init(){
            this.$store.dispatch('getAbout');
          }
        }
    }
</script>
