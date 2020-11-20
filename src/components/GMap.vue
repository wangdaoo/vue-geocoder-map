<template>
  <div>
    <section id="container" class="m-style"></section>
    <button @click="handleSave">保存</button>
    <button @click="handleClear">清除</button>
    <button @click="handleWatch">编辑</button>
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
      /** 圆 */
      circle: {},
      /** 地图标注 */
      mapData: {
        /** 经度 */
        lng: 0,
        /** 纬度 */
        lat: 0,
        /** 半径 */
        radius: 500,
      },
      newMapData: {
        lng: 0,
        lat: 0,
        radius: 0,
      },
      circleEditor: {},
    };
  },

  mounted() {
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
          pitch: 30,
          buildingAnimation: true, // 模块消失是否有动画效果
          // center: [116.397428, 39.90923], //初始化地图中心点
        });
        _this.resMap.plugin(['AMap.ToolBar', 'AMap.MapType'], function() {
          _this.map.addControl(new _this.resMap.ToolBar());
          _this.map.addControl(new _this.resMap.MapType());
        });
        this.map.on('click', this.mapClick);
        this.map.on('rightclick', function(e) {
          console.log(e);
          // this.rightClick
        });
      } catch (err) {
        console.error(err);
      }
    },
    handleWatch() {
      this.mapData.lng = 103.856516;
      this.mapData.lat = 36.046381;
      this.mapData.radius = 200;
      this.$nextTick(() => {
        this.editMap();
      })
    },
    mapClick(e) {
      if (this.mapData.lat !== 0) return alert('已绘制打卡位置!');
      this.mapData.lng = e.lnglat.lng;
      this.mapData.lat = e.lnglat.lat;
      this.$nextTick(() => {
        this.editMap();
      });
    },
    editMap() {
      this.circle = new this.resMap.Circle({
        center: [this.mapData.lng, this.mapData.lat],
        radius: this.mapData.radius, //半径
        borderWeight: 3,
        strokeColor: '#3498db',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        fillColor: '#1791fc',
        zIndex: 50,
      });
      // this.circle.setMap(this.map);
      // this.map.add(circle);

      // 缩放地图到合适的视野级别
      this.map.add(this.circle);
      this.map.setFitView([this.circle]);
      let _that = this;
      _that.resMap.plugin(['AMap.CircleEditor'], function() {
        _that.circleEditor = new _that.resMap.CircleEditor(
          _that.map,
          _that.circle
        );
        _that.circleEditor.open();
      });
      setTimeout(() => {
        /** 移动 */
        _that.circleEditor.on('move', function(e) {
          console.log(e);
          _that.newMapData.lng = e.lnglat.lng;
          _that.newMapData.lat = e.lnglat.lat;
          _that.newMapData.radius =
            _that.newMapData.radius !== 0
              ? _that.newMapData.radius
              : _that.mapData.radius;
        });
        /** 半径 */
        _that.circleEditor.on('adjust', function(e) {
          console.log(e);
          _that.newMapData.lng = _that.mapData.lng;
          _that.newMapData.lat = _that.mapData.lat;
          _that.newMapData.radius = e.radius;
        });
      }, 1000);
    },
    handleSave() {
      console.log('%c' + 'save', 'color: #2ecc71; font-size: 13px;');
      console.log(this.circleEditor);
      if (this.newMapData.radius === 0 && this.newMapData.lat === 0) {
        console.log('%c' + '未改变', 'color: #2ecc71; font-size: 13px;');
        console.log(this.mapData);
      } else {
        console.log('%c' + '已改变', 'color: #2ecc71; font-size: 13px;');
        console.log(this.newMapData);
      }
    },
    handleClear() {
      this.circleEditor.close();
      this.map.clearMap();
      this.mapData.lat = 0;
      this.newMapData = {
        radius: 0,
        lat: 0,
        lng: 0,
      };
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
