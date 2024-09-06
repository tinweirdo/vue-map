<script setup>
import * as Cesium from 'cesium';
import { ref, onMounted, onUnmounted, watch, inject } from 'vue'
import PointPopup from './index.vue'
import { useViewer } from '@/utils'
const props = defineProps({ data: Object })
const pickedPoint = inject("pickedPoint")

const viewer = useViewer()

const popupRef = ref(null)
const mounted = ref(false)
const pipeCollection = new Cesium.EntityCollection();

const attributes = ref({})
watch([() => props.data.features, mounted, pickedPoint], ([features, mounted, newFeature]) => {
    // 更新点击的 entity 属性
    if (newFeature?.attributes) attributes.value = newFeature?.attributes;
    // 已经完成了初次加载
    if (!(mounted && features?.length)) return;
    addPointCollection();
}, { immediate: true });

const addPointCollection = () => {
    for (const feature of props.data.features) {
        if (feature.geometry.x && feature.geometry.y) {
            feature.type = "point";
            const { globalId, map_num } = feature.attributes;
            if (viewer.entities.getById("point_" + globalId)) continue
            const pointEntity = {
                id: "point_" + globalId,
                name: map_num,
                feature: feature,
                position: Cesium.Cartesian3.fromDegrees(feature.geometry.x, feature.geometry.y),
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.fromCssColorString("#ff0000"),
                    outlineColor: Cesium.Color.fromCssColorString("#000"),
                    outlineWidth: 1,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
            }
            pointEntity.popup = {
                html: popupRef.value.$el, //可以是任意html
            };
            viewer.entities.add(pointEntity)
            pipeCollection.add(pointEntity)
        }
    }
}

onMounted(() => mounted.value = true)

onUnmounted(() => {
    pipeCollection.removeAll()
})
</script>

<template>
    <PointPopup ref="popupRef" class="popup3d" :attributes="attributes" />
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
