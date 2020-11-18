export default function MapLoader() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src =
        'https://webapi.amap.com/maps?v=2.0&key=7ed489f23efa53a03e885cf6ee69fe39&plugin=AMap.Geocoder&callback=initAMap';
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    };
  });
}
