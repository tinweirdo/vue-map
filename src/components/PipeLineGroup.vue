<script setup>
import L from 'leaflet'
import PipeLine from './PipeLine.vue';
import { useMap } from '../hooks/map';
import { onUnmounted, ref } from 'vue';
import { provideLayer } from '../hooks/pipeline-layer'
defineProps({ pipelines: { type: Array, default: () => [] } })

const layer = ref()

const { map } = useMap()

layer.value = L.geoJSON()

layer.value.addTo(map.value)
provideLayer(layer)

onUnmounted(() => {
    // rm layer from map
})

</script>

<template>
    <PipeLine v-for="pipeline in pipelines" :pipeline="pipeline" :key="pipeline.id" />
</template>p