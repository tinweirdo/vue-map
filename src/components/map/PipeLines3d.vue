<script setup>
import { Cartesian3, Color, Polyline } from 'cesium';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import LinePopup from '@mapVues/LinePopup/index.vue'
import { useViewer } from '@/utils'

const props = defineProps({ features: Array })
const viewer = useViewer()


const popupRef = ref(null)
const mounted = ref(false)
const polylineCollection = [];
const attributes = ref({})

watch([() => props.features, mounted], ([features, mounted]) => {
    if (!(mounted && features.length)) return;
    for (const feature of features) {
        if (feature.geometry.paths) {
            const polylineEntity = {
                polyline: {
                    positions: Cartesian3.fromDegreesArray(feature.geometry.paths[0].flat()),
                    width: 2,
                    material: Color.fromCssColorString("#ff0000"),
                }
            }
            polylineCollection.push(polylineEntity)
            viewer.entities.add(polylineEntity)
        }
    }
}, { immediate: true })

onMounted(() => mounted.value = true)

onUnmounted(() => {
})

</script>

<template>
    <!-- <LinePopup ref="popupRef" :attributes="attributes" /> -->
</template>

<style scoped></style>