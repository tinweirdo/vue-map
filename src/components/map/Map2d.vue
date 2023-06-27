<script setup>
import L from 'leaflet'
import { shallowRef, onMounted, inject } from 'vue';
import { provideMap } from '@/utils';


const map = shallowRef();
const mapOpt = {
    zoomControl:false,
    preferCanvas: true,
}
provideMap(map);

onMounted(() => {
    const latlng = L.latLng(31.862834, 117.160521);
    map.value = L.map('leafletContainer',mapOpt).setView(latlng, 14);
    L.tileLayer('/tileserver/syssvec/MapServer/tile/{z}/{y}/{x}', { tms: false }).addTo(map.value);
});

</script>

<template>
    <div id="leafletContainer">
        <slot v-if="map" />
    </div>
</template>

<style scoped>
#leafletContainer {
    width: 100vw;
    height: 100vh;
}
</style>