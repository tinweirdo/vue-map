<script setup>
import L from 'leaflet'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import PointPopup from '@mapVues/PointPopup/index.vue'
import { useMap } from '@/utils'

const props = defineProps({ features: Array })

const popupRef = ref(null);
const mounted = ref(false);

const style = {
        radius: 5,
        fillColor: "#ff0000",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
}

const map = useMap()

const attributes = ref({})

const layer = L.layerGroup().addTo(map)

watch([() => props.features, mounted], ([features, mounted]) => {
    layer.clearLayers()
    if (!mounted) return;
    for (const feature of features) {
        if (feature.geometry.y && feature.geometry.x) {
            const coordinates = L.latLng(feature.geometry.y, feature.geometry.x);
            const point = L.circleMarker(coordinates, style).addTo(layer);
            point.bindPopup(null, { minWidth: 700})
            point.on('popupopen', () => {
                point.setPopupContent(popupRef.value.$el)
                attributes.value = feature.attributes
            })
        }
    }
}, { immediate: true })

onMounted(() => mounted.value = true)

onUnmounted(() => {
    layer.clearLayers()
    layer.remove()
})
</script>

<template>
    <PointPopup ref="popupRef" :attributes="attributes" />
</template>

<style scoped>
</style>