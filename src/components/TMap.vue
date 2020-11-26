<template>
  <div>
    <section id="container" class="m-style"></section>
    <button @click="handleSave">保存</button>
    <button @click="handleClear">清除</button>
    <!-- <button @click="handleWatch">编辑</button> -->
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
      mapPath: [],
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
      polygon: {},
      mouse: {},
    };
  },

  mounted() {
    this.initAMap();
    let data = JSON.parse(
      '[[[103.812742,36.061925],[103.809052,36.049643],[103.843384,36.050128],[103.836088,36.065324]],[[103.796091,36.066851],[103.785448,36.050406],[103.804331,36.046797],[103.807163,36.07025]]]'
    );
    console.log(data);
    this.mapPath = data;
    setTimeout(() => {
      this.edit();
    }, 1000);
  },

  methods: {
    async initAMap() {
      let _this = this;
      try {
        _this.resMap = await AMap();
        this.map = new _this.resMap.Map('container', {
          resizeEnable: true, //是否监控地图容器尺寸变化
          zoom: 14, //初始化地图层级
          zoomEnable: true, // 是否缩放
          scrollWheel: true, // 是否支持滚轮缩放
          dragEnable: true, // 是否支持鼠标拖拽平移
          jogEnable: true, // 是否支持缓动效果
          pitch: 30,
          buildingAnimation: true, // 模块消失是否有动画效果
          // center: [116.397428, 39.90923], //初始化地图中心点
        });
        _this.resMap.plugin(
          ['AMap.ToolBar', 'AMap.MapType', 'AMap.MouseTool'],
          function() {
            _this.map.addControl(new _this.resMap.ToolBar());
            _this.map.addControl(new _this.resMap.MapType());

            _this.mouse = new _this.resMap.MouseTool(_this.map);
            _this.mouse.polygon();
            _this.mouse.on('draw', function(e) {
              console.log(e.obj.getPath());
              _this.mapPath.push(e.obj.getPath());
              // _this.edit();
            });
          }
        );
      } catch (err) {
        console.error(err);
      }
    },
    edit() {
      this.polygon = new this.resMap.Polygon({
        path: this.mapPath,
        borderWeight: 3,
        strokeColor: '#3498db',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillOpacity: 0.4,
        strokeDasharray: [10, 10],
        fillColor: '#1791fc',
        zIndex: 50,
      });
      this.map.add(this.polygon);
      this.map.setFitView([this.polygon]);
    },
    handleSave() {
      console.log('%c' + 'save', 'color: #2ecc71; font-size: 13px;');
      console.log(JSON.stringify(this.mapPath));
    },
    handleClear() {
      this.mouse.close();
      this.map.clearMap();
      this.mapPath = [];

      this.initAMap();
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
