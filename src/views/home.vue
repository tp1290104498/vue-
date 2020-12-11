<template>
  <div class="home">
    <div class="maps" id="maps" ref="maps"></div>
    <Unity id="unityinfame"
           src="./static/Build/WebGL-Test.json"
           unityLoader="./static/Build/UnityLoader.js"
           ref="myInstance"
           frameborder="0"
           width="100%"
           height="100%"
           scrolling="no" />
  </div>
</template>
<script>
import * as Three from 'three'
import THING from 'thingjs'
import Unity from 'vue-unity-webgl'
let SEPARATION = 100,
    AMOUNTX = 100,
    AMOUNTY = 70;
let container;
let camera, scene, renderer;
let particles,
    particle,
    count = 0;
let mouseX = 85,
    mouseY = -342;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
export default {
  name: 'home',
  data() {
    return{
      maps: null,
      point: null
    }
  },
  components: {
    // Unity
  },
  methods: {
    drawMap() {
      this.maps = new window.BMap.Map(this.$refs.maps)
      this.point = new window.BMap.Point(116.197588,39.865583)
      this.maps.centerAndZoom(this.point, 6);
      this.maps.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    init() {
      let container = document.getElementById('maps');

      this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

    },
    inpoll () {
      var app = new THING.App();
      console.log(app);
      app.background = [0, 0, 0];
      THING.Utils.dynamicLoad(['https://www.thingjs.com/uearth/uearth.min.js'], function () {
        // 创建一个地球
        var map = app.create({
          type: 'Map',
          atmosphere: true, // 显示/隐藏 大气层 默认显示
          style: {
            night: true, // 开启/关闭 白天黑夜效果 默认开启
            fog: false  // 开启/关闭 雾效 默认关闭
          },
        });
        // 创建一个瓦片图层
        var tileLayer = app.create({
          type: 'TileLayer',
          name: 'tileLayer1',
          url: 'https://mt0.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
        });
        // 向地球添加一个瓦片图图层
        map.addLayer(tileLayer);

        // 地图注册点击事件
        // map.on('click', function (ev) {
        //   console.clear();
        //
        //   // 获取鼠标点击处的经纬度
        //   var lonlat = ev.coordinates;
        //   console.log(lonlat);
        //   // 将经纬度坐标转为三维坐标，第二个参数代表离地高度
        //   var worldPos = CMAP.Util.convertLonlatToWorld(lonlat, 0)
        //   console.log(worldPos);
        //   // 根据经纬度和方位角计算物体在地球上的旋转信息，第二个参数为方位角 默认0
        //   var angles = CMAP.Util.getAnglesFromLonlat(lonlat, 0);
        //   console.log(angles);
        // })
      });

    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    // this.drawMap()
    // this.getImgCode();
    this.init()
    this.animate()
    // this.inpoll()
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  .maps{
    position: absolute;
    height: 100vh;
    width: 100vw;
  }
}
</style>
