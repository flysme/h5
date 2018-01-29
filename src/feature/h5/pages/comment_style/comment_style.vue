<template>
    <div >
        <component :is="componentName" :data="{'contentId':cotnentId}"></component>
    </div>
</template>
<script>
    import comment_style1 from './component/comment_style1.vue';
    import comment_style2 from './component/comment_style2.vue';
    import comment_style3 from './component/comment_style3.vue';
    import comment_style4 from './component/comment_style4.vue';
    export default{
        data(){
            return {

            }
        },
        props:{
          option:Object
        },
        created(){
          console.log('this.$route.query.componentName',this.$route.query.componentName)
        },
        mounted(){
          console.log(this.option);
        },
        computed:{
            componentName(){
                return this.option.componentName
            },
            cotnentId(){
              return this.option.content_id
            }
        },
        methods:{

        },
        components:{
          comment_style1,
          comment_style2,
          comment_style3,
          comment_style4
        }
    }
</script>
