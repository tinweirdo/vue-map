<script setup>
import * as Cesium from 'cesium';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import LinePopup from '@mapVues/LinePopup/index.vue'
import { useViewer } from '@/utils'
const props = defineProps({ features: Array })
const viewer = useViewer()

const popupRef = ref(null)
const mounted = ref(false)
const polylineCollection = new Cesium.EntityCollection();
const attributes = ref({})

const addPolylineCollection = (features) => {
    for (const feature of features) {
        if (feature.geometry.paths) {
            attributes.value = feature.attributes;
            const { globalId, map_num_s, map_num_e } = feature.attributes;
            // 添加 infobox
            const polylineEntity = {
                id: globalId,
                name: map_num_s + " - " + map_num_e,
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArray(feature.geometry.paths[0].flat()),
                    width: 2,
                    material: Cesium.Color.fromCssColorString("#ff0000"),
                    clampToGround: true,
                },
                description: '这是一个示例实体的描述信息。'
            }
            viewer.entities.add(polylineEntity);
            polylineCollection.add(polylineEntity);
        }
    }
}

watch([() => props.features, mounted], ([features, mounted]) => {
    if (!(popupRef.value && mounted && features.length)) return;
    addPolylineCollection(features);
}, { immediate: true });


onMounted(() => mounted.value = true)

onUnmounted(() => {
    for (const ele of polylineCollection.values) {
        viewer.entities.remove(ele);
    }
})

</script>

<template>
    <LinePopup ref="popupRef" :attributes="attributes" />
</template>

<style scoped></style>