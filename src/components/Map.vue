<script setup>
import L from 'leaflet'
import { onMounted, onUnmounted, shallowRef } from 'vue';
import { provideMap } from '../hooks/map'

const map = shallowRef()
provideMap(map)
onMounted(() => {
    const latlng = L.latLng(31.862688, 117.088938);
    map.value = L.map('map').setView(latlng, 13);
    L.tileLayer('/cdkc/syssvec/MapServer/tile/{z}/{y}/{x}', { tms: false }).addTo(map.value);
})

onUnmounted(() => {
    // destroy map
})
</script>

<template>
    <div id="map">
        <slot v-if="map" />
    </div>
</template>

<style>
#map {
    width: 100vw;
    height: 100vh;
}
</style>