<template>
  <div>
    <section id="container" class="m-style"></section>
    <button @click="handleSave">保存</button>
  </div>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝原生地图
 * @copyright 🤝In me the tiger sniffs the rose.
 */
import AMap from '../utils/AMap';
export default {
  name: 'GMap',
  data() {
    return {
      map: null,
      resMap: {},
      /** 地图标注 */
      mapData: {
        /** 经度 */
        lng: 0,
        /** 纬度 */
        lat: 0,
        /** 半径 */
        radius: 500,
      },
    };
  },

  mounted() {
    window.title = '地图';
    this.initAMap();
  },

  methods: {
    async initAMap() {
      let _this = this;
      try {
        _this.resMap = await AMap();
        console.log(_this.resMap);
        this.map = new _this.resMap.Map('container', {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 11, //初始化地图层级
          zoomEnable: true, // 是否缩放
          scrollWheel: true, // 是否支持滚轮缩放
          dragEnable: true, // 是否支持鼠标拖拽平移
          jogEnable: true, // 是否支持缓动效果
          buildingAnimation: true, // 模块消失是否有动画效果
          // center: [116.397428, 39.90923], //初始化地图中心点
        });
        _this.resMap.plugin(['AMap.ToolBar', 'AMap.MapType'], function() {
          _this.map.addControl(new _this.resMap.ToolBar());
          _this.map.addControl(new _this.resMap.MapType());
        });
        this.map.on('click', this.mapClick);
      } catch (err) {
        console.error(err);
      }
    },
    mapClick(e) {
      console.log(e);
      this.mapData.lng = e.lnglat.lng;
      this.mapData.lat = e.lnglat.lat;
      let circle = new this.resMap.Circle({
        center: [e.lnglat.lng, e.lnglat.lat],
        radius: this.mapData.radius, //半径
        borderWeight: 3,
        strokeColor: '#FF33FF',
        strokeOpacity: 1,
        strokeWeight: 6,
        fillOpacity: 0.4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        fillColor: '#1791fc',
        zIndex: 50,
      });
      circle.setMap(this.map);
      // 缩放地图到合适的视野级别
      this.map.setFitView([circle]);
      // this.map.add(circle);
      let _that = this;
      _that.resMap.plugin(['AMap.CircleEditor'], function() {
        let circleEditor = new _that.resMap.CircleEditor(_that.map, circle);
        circleEditor.open();
      });
    },
    handleSave () {
      console.log('%c' + 'save', 'color: #2ecc71; font-size: 13px;')
      console.log(this.mapData);
    },
  },
};
</script>
<style lang="css" scoped>
.m-style {
  width: 100%;
  height: 600px;
  border: 1px solid #dddddd;
}
</style>
