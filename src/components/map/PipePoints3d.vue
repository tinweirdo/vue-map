<script setup>
import { Cartesian3, Color } from 'cesium';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import PointPopup from '@mapVues/PointPopup/index.vue'
import { useViewer } from '@/utils'

const props = defineProps({ features: Array })
const viewer = useViewer()

const popupRef = ref(null)
const mounted = ref(false)
const pointCollection = [];
const attributes = ref({});

watch([() => props.features, mounted], ([features, mounted]) => {
    if (!(mounted && features.length)) return;
    for (const feature of features) {
        if (feature.geometry.x && feature.geometry.y) {
            const pointEntity = {
                position: Cartesian3.fromDegrees(feature.geometry.x, feature.geometry.y),
                point: {
                    pixelSize: 5,
                    color: Color.fromCssColorString("#ff0000"),
                    outlineColor: Color.fromCssColorString("#000"),
                    outlineWidth: 1,
                }
            }
            pointCollection.push(pointEntity)
            viewer.entities.add(pointEntity)
        }
    }
}, { immediate: true })

onMounted(() => mounted.value = true)

onUnmounted(() => {
})

</script>

<template>
    <v-if></v-if>
    <!-- <PointPopup ref="popupRef" :attributes="attributes" /> -->
</template>

<style scoped></style>