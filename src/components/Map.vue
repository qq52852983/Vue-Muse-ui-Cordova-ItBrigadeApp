<template>
  <div id="app" style="height:100%;width:100%;background:pink">
    <div id="allmap"></div>
    <button style="font-size:23px;display:none" @click="getCurrentPosition();">获取位置信息</button>
  </div>
</template>

<style scoped>
  #allmap {
    width: 100%;
    height: 100%
  }

</style>
<script>
  import {
    axios_get,
    axios_post,
    axios_get_2
  } from '../js/axios.js';
  export default {
    data() {
      return {

      }
    },
    methods: {
      getCurrentPosition: function () {
        let loading = this.$loading();
        let _this = this;
        var onSuccess = function (position) {
          let position_ = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
          }
          let th_is = _this;
          axios_get('api__apis', position_, (result) => {
            let str = result.data.substr(0, result.data.length)
            str = str.replace(/(\\)|(\/)|(\n)|(\r)/g, '')
            let DW_data = JSON.parse(str)
            let url = 'http://api.map.baidu.com/geocoder/v2/?address=' + DW_data.detail.poilist[0].addr +'&output=json&ak=RnuyyQbZNGc6Gf2B8eBIzVQS7lhAqjvK'
            axios_get('api_http', {url:url}, (resul) => {
              loading.close()
              resul=JSON.parse(resul.data)
              var map = new BMap.Map("allmap"); // 创建Map实例
              map.centerAndZoom(new BMap.Point(resul.result.location.lng, resul.result.location.lat),
                30); // 初始化地图,设置中心点坐标和地图级别
              map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
              map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
              map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
              map.enableScrollWheelZoom(); //启用滚轮放大缩小
              map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
              map.setCurrentCity(DW_data.detail.poilist[0].addr_info.c); // 设置地图显示的城市 此项是必须设置的
              
            });
          });
        };

        function onError(error) {
          loading.close()
          this.$toast.error('定位失败...')
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
    },
    mounted() {
      this.getCurrentPosition()
    }
  }

</script>
