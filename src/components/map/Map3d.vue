<script setup>
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/static/Cesium/';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_KEY } from '@/env.js';
import { shallowRef, onMounted } from 'vue';
import { provideViewer } from '@/utils';
const viewer = shallowRef();
provideViewer(viewer);

onMounted(() => {
    // Your access token can be found at: https://ion.cesium.com/tokens.
    Cesium.Ion.defaultAccessToken = CESIUM_KEY;
    // Initialize the Cesium Cesium.Viewer in the HTML element with the `cesiumContainer` ID.
    viewer.value = new Cesium.Viewer('cesiumContainer', {
        animation: false,//动画
        baseLayerPicker: false,//底图
        fullscreenButton: false,//全屏
        vrButton: false,//VR
        geocoder: false,//搜索
        homeButton: false,
        sceneModePicker: false,
        timeline: false,//时间轴
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        terrain: Cesium.Terrain.fromWorldTerrain(),
    });
    // Fly the camera to San Francisco at the given longitude, latitude, and height.
    viewer.value.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(117.154221, 31.862834, 2000),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-90.0),
            roll: 0.0,
        },
        duration: 0
    });


    console.log('widget :>> ', viewer);
    // var handler = new Cesium.ScreenSpaceEventHandler(widget.scene.canvas);
    // handler.setInputAction(function (movement) {
    //     var pick = widget.scene.pick(movement.position);
    //     if (Cesium.defined(pick) && (pick.id.match(/label_([0-9]+)/))) {
    //         var id = parseInt(RegExp.$1);
    //         var point = constant.points[id];
    //         widget.infoBox.viewModel.titleText = point.label;
    //         widget.infoBox.viewModel.descriptionRawHtml = point.description;
    //         widget.infoBox.viewModel.showInfo = true;
    //         widget.infoBox.viewModel.closeClicked.addEventListener(function () { widget.infoBox.viewModel.showInfo = false; });
    //     }
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
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