<script setup>
import * as Cesium from 'cesium';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import PointPopup from '@mapVues/PointPopup/index.vue'
import { useViewer } from '@/utils'

const props = defineProps({ features: Array })
const viewer = useViewer()

const popupRef = ref(null)
const mounted = ref(false)
const pointCollection = new Cesium.EntityCollection();

const attributes = ref({});
const addPointCollection = (features) => {
    for (const feature of features) {
        if (feature.geometry.x && feature.geometry.y) {
            attributes.value = feature.attributes;
            const { globalId, map_num } = feature.attributes;
            const pointEntity = {
                id: globalId,
                name: map_num,
                position: Cesium.Cartesian3.fromDegrees(feature.geometry.x, feature.geometry.y),
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.fromCssColorString("#ff0000"),
                    outlineColor: Cesium.Color.fromCssColorString("#000"),
                    outlineWidth: 1,
                },
                description: '这是一个示例实体的描述信息。'
            }
            pointCollection.add(pointEntity)
            viewer.entities.add(pointEntity)
        }
    }
}
watch([() => props.features, mounted], ([features, mounted]) => {
    if (!(popupRef.value && mounted && features.length)) return;
    addPointCollection(features);
}, { immediate: true })

onMounted(() => mounted.value = true)

onUnmounted(() => {
    for (const ele of pointCollection.values) {
        viewer.entities.remove(ele);
    }
})

</script>

<template>
    <PointPopup ref="popupRef" :attributes="attributes" />
</template>

<style scoped></style>