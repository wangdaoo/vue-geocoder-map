import Vue from 'vue';
import App from './App.vue';
import VueAMap from 'vue-amap';

Vue.config.productionTip = false;

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '7ed489f23efa53a03e885cf6ee69fe39',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
  ],
  v: '2.0',
});
new Vue({
  render: (h) => h(App),
}).$mount('#app');
