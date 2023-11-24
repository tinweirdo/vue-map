<script setup>
import * as Cesium from 'cesium';
import { ref, onMounted, onUnmounted, watch, inject } from 'vue'
import LinePopup from '@map/common/LinePopup/index.vue'
import { useViewer } from '@/utils'
const props = defineProps({ features: Array })
const viewer = useViewer()

const pickedLine = inject("pickedLine")

const mounted = ref(false);
const attributes = ref({});

watch([() => props.features, mounted, pickedLine], ([features, mounted, newFeature]) => {
    // 更新点击的 entity 属性
    if (newFeature?.attributes) attributes.value = newFeature?.attributes;
    // 已经完成了初次加载
    if (!(mounted && features.length)) return;
    addPolylineCollection();
}, { immediate: true });

const pipeCollection = new Cesium.EntityCollection();
const addPolylineCollection = () => {
    for (const feature of props.features) {
        if (feature.geometry.paths) {
            feature.type = "line";
            const { globalId, map_num_s, map_num_e } = feature.attributes;
            if (viewer.entities.getById("line_" + globalId)) continue
            const polylineEntity = {
                id: "line_" + globalId,
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
}

onMounted(() => mounted.value = true)

onUnmounted(() => {
    pipeCollection.removeAll()
})
</script>

<template>
    <LinePopup class="popup3d" :attributes="attributes" />
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