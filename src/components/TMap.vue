<template>
  <section id="map" class="m-style"></section>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝MAP
 * @copyright 🤝In me the tiger sniffs the rose.
 */
import AMap from '../utils/AMap';
export default {
  name: 'TMap',
  data() {
    return {
      MAP: {},
      resMap: {},
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },

  methods: {
    async initMap() {
      this.resMap = await AMap();
      setTimeout(() => {
        //一秒延迟，等待脚本加载
        // let that = this;
        let map = new this.resMap.Map('map', {
          zoom: 13, //级别
          // center: [117.226737, 31.820066], //中心点坐标
          pitch: 30, // 地图俯仰角度，有效范围 0 度- 83 度
          viewMode: '2D', // 地图模式
        });
        let _that = this
        _that.resMap.plugin(
          [
            'AMap.InfoWindow',
            'AMap.ContextMenu',
            'AMap.Heatmap',
            'AMap.MouseTool',
            'AMap.RangingTool',
            'AMap.CircleEditor',
            'AMap.PolyEditor',
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.OverView',
            'AMap.MapType',
            'AMap.Geolocation',
          ],
          function() {
            //插件引入回调事件，可添加工具控件，也可创建插件实例
            map.addControl(new _that.resMap.ToolBar({ position: 'RT' })); // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            map.addControl(new _that.resMap.Scale()); // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            map.addControl(new _that.resMap.OverView({ isOpen: true })); // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          }
        );
        _that.MAP = map; //将map挂载到组件data，后续交互需要用到
      }, 1000);
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
