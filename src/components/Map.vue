<script setup>
import L from 'leaflet'
import { onMounted, onUnmounted, ref } from 'vue';
import { provideMap } from '../hooks/map'

const map = ref()
provideMap(map)
onMounted(() => {
    map.value = L.map('map').setView([39.74739, -105], 13);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map.value)
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

/* .leaflet-container {
    height: 400px;
    width: 600px;
    max-width: 100%;
    max-height: 100%;
} */
</style>