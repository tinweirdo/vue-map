<script setup>
import L from 'leaflet'
import { onMounted, onUnmounted, shallowRef } from 'vue';
import { provideMap, initData } from '../hooks/map';
import { config2d } from '../map';

const map = shallowRef();
provideMap(map);
onMounted(async () => {
    const latlng = L.latLng(31.862834, 117.160521);
    map.value = L.map('map2d').setView(latlng, 14);
    L.tileLayer('/tileserver/syssvec/MapServer/tile/{z}/{y}/{x}', { tms: false }).addTo(map.value);
    initData(map.value);
});



onUnmounted(() => {
    // destroy map
})
</script>

<template>
    <div id="map2d">
        <slot v-if="map" />
    </div>
</template>

<style>
#map2d {
    width: 100vw;
    height: 100vh;
}
</style>