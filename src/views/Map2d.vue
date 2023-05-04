<script setup>
import L from 'leaflet'
import { shallowRef, onMounted } from 'vue';
import { provideMap } from '@/utils';

const map = shallowRef();
provideMap(map);

onMounted(() => {
    const latlng = L.latLng(31.862834, 117.160521);
    map.value = L.map('leafletContainer').setView(latlng, 14);
    L.tileLayer('/tileserver/syssvec/MapServer/tile/{z}/{y}/{x}', { tms: false }).addTo(map.value);
});

</script>

<template>
    <div id="leafletContainer">
        <slot v-if="map"/>
    </div>
</template>

<style scoped>
#leafletContainer {
    width: 100vw;
    height: 100vh;
}
</style>