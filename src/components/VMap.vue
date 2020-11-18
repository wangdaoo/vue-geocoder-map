<template>
  <section class="m-style">
    <el-amap vid="amap" :zoom="zoom">
    </el-amap>
  </section>
</template>
<script>
/**
 * @author 🌈MARS <wangdaoo@yeah.net>
 * @desc 📝地图空间
 * @copyright 🤝In me the tiger sniffs the rose.
 */
export default {
  name: 'VMap',
  data() {
    return {
      zoom: 12,
      plugin: [
        /** 类型 */
        {
          pName: 'MapType',
          defaultType: 0,
        },
        /** 比例尺 */
        { pName: 'Scale' },
        { pName: 'Geolocation' },
        /** 工具条 */
        {
          pName: 'ToolBar',
          locate: true,
        },
      ]
    };
  },

  mounted() {},

  methods: {},
};
</script>
<style lang="css" scoped>
.m-style {
  width: 100%;
  height: 600px;
  border: 1px solid #dddddd;
}
</style>
