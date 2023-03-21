<script setup>
import L from 'leaflet'
import { useMap } from '../hooks/map';
import { onUnmounted, ref } from 'vue';
import { provideLayer } from '../hooks/pipeline-layer';
import * as service from '../hooks/service'

const props = defineProps({
    url: { type: Object, default: () => null },
    config:{ type: Object, default: () => null }
});

// pipe url
const { pointUrl, lineUrl } = props.url;
// config
const { where } = props.config;

service.queryFeats(pointUrl, where)

const layer = ref();

const { map } = useMap();

layer.value = L.geoJSON();

layer.value.addTo(map.value);
provideLayer(layer);

onUnmounted(() => {
    // rm layer from map
})

</script>

<template></template>