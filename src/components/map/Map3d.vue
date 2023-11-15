<script setup>
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/static/Cesium/';
import { Cartesian3, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_KEY } from '@/env.js';
import { shallowRef, onMounted } from 'vue';
import { provideViewer } from '@/utils';
const viewer = shallowRef();
provideViewer(viewer);

onMounted(() => {
    // Your access token can be found at: https://ion.cesium.com/tokens.
    Ion.defaultAccessToken = CESIUM_KEY;
    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    viewer.value = new Viewer('cesiumContainer', {
        animation: false,//动画
        baseLayerPicker: false,//底图
        fullscreenButton: false,//全屏
        vrButton: false,//VR
        geocoder: false,//搜索
        // homeButton: false,
        sceneModePicker: false,
        timeline: false,//时间轴
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        terrain: Terrain.fromWorldTerrain(),
    });
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.value.camera.flyTo({
        destination: Cartesian3.fromDegrees(117.160521, 31.862834, 10000),
        orientation: {
            heading: CesiumMath.toRadians(0.0),
            pitch: CesiumMath.toRadians(-90.0),
            roll: 0.0,
        }
    });
    console.log('viewer :>> ', viewer);
});
</script>

<template>
    <div id="cesiumContainer">
        <slot v-if="viewer" />
    </div>
</template>

<style>
#cesiumContainer {
    width: 100vw;
    /* 减去顶部菜单栏的高度 */
    height: calc(100vh - 60px);
}

/* 隐藏底部版权 */
.cesium-viewer>.cesium-viewer-bottom>.cesium-widget-credits {
    display: none;
}
</style>