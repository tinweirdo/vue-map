<script setup>
import * as Cesium from 'cesium';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import LinePopup from '@map/common/LinePopup/index.vue'
import PointPopup from '@map/common/PointPopup/index.vue'
import { useViewer } from '@/utils'
const props = defineProps({ features: Object })

const geoType = ref("");
const viewer = useViewer()

const popupRef = ref(null)
const mounted = ref(false)
const pipeCollection = new Cesium.EntityCollection();

const attributes = ref({})

const addPolylineCollection = () => {
    const polylines = props.features.lineFeatures;
    for (const feature of polylines) {
        if (feature.geometry.paths) {
            // if(viewer.entities)
            attributes.value = feature.attributes;
            const { globalId, map_num_s, map_num_e } = feature.attributes;
            if (viewer.entities.getById(globalId)) continue
            const polylineEntity = {
                id: globalId,
                name: map_num_s + " - " + map_num_e,
                feature: feature,
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray(feature.geometry.paths[0].flat()),
                    width: 2,
                    material: Cesium.Color.fromCssColorString("#ff0000"),
                    clampToGround: true,
                }
            }
            viewer.entities.add(polylineEntity);
            pipeCollection.add(polylineEntity);
        }
    }
    const points = props.features.pointFeatures;
    for (const feature of points) {
        if (feature.geometry.x && feature.geometry.y) {
            attributes.value = feature.attributes;
            const { globalId, map_num } = feature.attributes;
            if (viewer.entities.getById(globalId)) continue
            const pointEntity = {
                id: globalId,
                name: map_num,
                feature: feature,
                position: Cesium.Cartesian3.fromDegrees(feature.geometry.x, feature.geometry.y),
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.fromCssColorString("#ff0000"),
                    outlineColor: Cesium.Color.fromCssColorString("#000"),
                    outlineWidth: 1,
                    clampToGround: true,
                }
            }
            viewer.entities.add(pointEntity)
            pipeCollection.add(pointEntity)
        }
    }
}

// 为 entity 添加弹窗
const bindClick = () => {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
        const picked = viewer.scene.pick(movement.position)
        if (!(Cesium.defined(picked) && picked.id.id)) return;
        Popupposition(picked)//弹窗位置控制
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

// 设置弹窗位置
const Popupposition = (e) => {
    let coords = []
    if (e.id.feature.geometry.hasOwnProperty("paths")) {
        geoType.value = "line"
        coords = e.id.feature.geometry.paths[0][0];
    }
    else if (e.id.feature.geometry.hasOwnProperty("x")) {
        geoType.value = "point"
        coords = [e.id.feature.geometry.x, e.id.feature.geometry.y];
    }
    //经纬度转为世界坐标
    let gisPosition = Cesium.Cartesian3.fromDegrees(
        coords[0],
        coords[1],
        0,
    );
    attributes.value = e.id.feature.attributes;
    // document.getElementById('stateShow').style.display = 'block' //弹出信息框
    //实时更新位置
    viewer.scene.postRender.addEventListener(() => {
        //转化为屏幕坐标
        var windowPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, gisPosition);
        // document.getElementById('stateShow').style.left = (windowPosition.x - 150) + 'px'
        // document.getElementById('stateShow').style.top = (windowPosition.y - 220) + 'px'

        //解决滚动不隐藏问题
        const camerPosition = viewer.camera.position;
        let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(camerPosition).height;
        height += viewer.scene.globe.ellipsoid.maximumRadius;
        if ((!(Cesium.Cartesian3.distance(camerPosition, gisPosition) > height)) && viewer.camera.positionCartographic.height < 50000000) {
            // document.getElementById('stateShow').style.display = "block"
        }
        else {
            // document.getElementById('stateShow').style.display = "none"
        }
    })
}

watch([() => props.features, mounted], ([features, mounted]) => {
    if (!(popupRef.value && mounted && props.features?.lineFeatures?.length && props.features?.pointFeatures?.length)) return;
    addPolylineCollection();
    bindClick();//为 entity 添加弹窗
}, { immediate: true });


onMounted(() => mounted.value = true)

onUnmounted(() => {
    for (const ele of pipeCollection) {
        viewer.entities.remove(ele);
    }
})
</script>

<template>
    <div id="cesiumContainer-kcgis3d-pupup-all" ref="popupRef">
        <LinePopup class="popup3d" :attributes="attributes" />
        <!-- <PointPopup v-if="geoType === 'point'" class="popup3d" :attributes="attributes" /> -->
    </div>
</template>

<style scoped>
.popup3d {
    width: 700px;
    height: 360px;
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>