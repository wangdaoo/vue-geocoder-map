<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-circle
        v-for="(circle, i) in circles"
        :key="i"
        :center="circle.center"
        :radius="circle.radius"
        :fill-opacity="circle.fillOpacity"
        :events="circle.events"
      ></el-amap-circle>
    </el-amap>
  </div>
</template>

<style>
.amap-page-container {
  height: 600px;
}
</style>

<script>
module.exports = {
  data() {
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      circles: [
        {
          center: [121.5273285, 31.21515044],
          radius: 200,
          fillOpacity: 0.5,
          events: {
            click: () => {
              alert('click');
            },
          },
        },
      ],
    };
  },
};
</script>
