<script setup>
// The URL on your server where CesiumJS's static files are hosted.
window.CESIUM_BASE_URL = '/static/Cesium/';
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";
import { CESIUM_KEY } from '@/env.js';
import { shallowRef, ref, onMounted, provide } from 'vue';
import { provideViewer } from '@/utils';
const viewer = shallowRef();
provideViewer(viewer);

onMounted(() => {
    // 初始化地球
    initViewer();
});

const pickedLine = shallowRef({});
const pickedPoint = shallowRef({});
provide("pickedLine", pickedLine)
provide("pickedPoint", pickedPoint)
// 为 entity 添加弹窗
const bindClick = () => {
    let coords = [];
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas);
    handler.setInputAction(function (movement) {
        const picked = viewer.value.scene.pick(movement.position);

        pickedLine.value = {};
        pickedPoint.value = {};

        if (!(Cesium.defined(picked) && picked.id.id)) return;
        const { attributes, type, geometry } = picked.id.feature;
        if (type === "line") {
            pickedLine.value = picked.id.feature;
            pickedPoint.value = {};
        }
        else if (type === "point") {
            pickedLine.value = {};
            pickedPoint.value = picked.id.feature;
        }
        else {
            pickedLine.value = {};
            pickedPoint.value = {};
        }
        coords = geometry.paths?.[0][0] || [geometry.x, geometry.y];
        //弹窗位置控制
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // //经纬度转为世界坐标
    // let gisPosition = Cesium.Cartesian3.fromDegrees(
    //     coords[0],
    //     coords[1],
    //     0,
    // );
    // // document.getElementById('stateShow').style.display = 'block' //弹出信息框
    // //实时更新位置
    // viewer.value.scene.postRender.addEventListener(() => {
    //     //转化为屏幕坐标
    //     var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, gisPosition);
    //     // document.getElementById('stateShow').style.left = (windowPosition.x - 150) + 'px'
    //     // document.getElementById('stateShow').style.top = (windowPosition.y - 220) + 'px'

    //     //解决滚动不隐藏问题
    //     const camerPosition = viewer.camera.position;
    //     let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
    //     height += viewer.scene.globe.ellipsoid.maximumRadius;
    //     if ((!(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height)) && viewer.camera.positionCartographic.height < 50000000) {
    //         // document.getElementById('stateShow').style.display = "block"
    //     }
    //     else {
    //         // document.getElementById('stateShow').style.display = "none"
    //     }
    // })
}

// 初始化地球
const initViewer = () => {
    // Your access token can be found at: https://ion.cesium.com/tokens.
    Cesium.Ion.defaultAccessToken = CESIUM_KEY;
    // Initialize the Cesium Cesium.Viewer in the HTML element with the `cesiumContainer` ID.
    viewer.value = new Cesium.Viewer('cesiumContainer', {
        animation: false,//动画
        baseLayerPicker: false,//底图
        fullscreenButton: false,//全屏
        infoBox: false,
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
        duration: 0.3
    });
    // 为 entity 添加弹窗
    bindClick();
}
</script>

<template>
    <div id="cesiumContainer">
        <div id="cesiumContainer-kcgis3d-pupup-all">
            <slot v-if="viewer" />
        </div>
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