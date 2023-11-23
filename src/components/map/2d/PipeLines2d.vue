<script setup>
import L from 'leaflet'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import LinePopup from '@map/common/LinePopup/index.vue'
import { useMap } from '@/utils'

const props = defineProps({ features: Array })

const popupRef = ref(null)
const mounted = ref(false)

const style = {
    color: '#ff0000',
    weight: 2,
    fillColor: '#ff0000',
    opacity: 1,
    fillOpacity: 1,
    smoothFactor: 1
}

const map = useMap()

const attributes = ref({})

const layer = L.layerGroup().addTo(map)

watch([() => props.features, mounted], ([features, mounted]) => {
    layer.clearLayers()
    if (!mounted) return
    for (const feature of features) {
        if (feature.geometry.paths) {
            const coord1 = [feature.geometry.paths[0][0][1], feature.geometry.paths[0][0][0]];
            const coord2 = [feature.geometry.paths[0][1][1], feature.geometry.paths[0][1][0]];
            const line = L.polyline([coord1, coord2], style).addTo(layer)
            line.bindPopup(null, { minWidth: 700, minHeight: 360 })
            line.on('popupopen', () => {
                line.setPopupContent(popupRef.value.$el)
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
    <LinePopup ref="popupRef" :attributes="attributes" />
</template>

<style scoped></style>