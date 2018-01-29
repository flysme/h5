<template>
  <div id="allmap" :style="mapStyle"></div>
</template>
<script>
  export default {
    data(){
      return{
        mapStyle:{
          width:'100%',
          height:this.mapHeight +'vh'
        }
      }
    },
    props:{
      // 地图在该视图上的高度
      mapHeight:{
        type:Number,
        default:100
      },
      // 坐标
      point:Object,
    },
    mounted(){
        // 初始化
        this.init();
    },
    methods:{
      init(){
        // 初始化地图
        this.getMapPoint(this.point);
      },
      getMapPoint(point){
          let coordinate = point;
          var map =new BMap.Map("allmap");
          var point =new BMap.Point(coordinate.lng,coordinate.lat);
          var marker =new BMap.Marker(point);
          map.addOverlay(marker);
          map.centerAndZoom(point,15);
          // 信息窗的配置信息
          var opts ={
            width :150,
            height:55,
            title :"地址：",
          }
          var infoWindow =new BMap.InfoWindow(coordinate.address, opts);// 创建信息窗口对象
          marker.addEventListener("click",function(){
            map.openInfoWindow(infoWindow,point);
          });
          map.enableScrollWheelZoom(true);
          map.openInfoWindow(infoWindow,point);//开启信息窗口
      }
    }
  }
</script>
<style scoped>

</style>
