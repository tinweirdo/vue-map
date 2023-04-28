<script setup>
import L from 'leaflet'
import { shallowRef, onMounted } from 'vue';
import { provideMap } from '../../utils';
import mapIndex from '../../map';

const map = mapIndex.map;
const map2d = shallowRef();
provideMap(map2d);

onMounted(() => {
    const latlng = L.latLng(31.862834, 117.160521);
    map2d.value = L.map('map2d').setView(latlng, 14);
    L.tileLayer('/tileserver/syssvec/MapServer/tile/{z}/{y}/{x}', { tms: false }).addTo(map2d.value);
    map.showFeatures(map2d.value);
});

</script>

<template>
    <div id="map2d">
        <slot v-if="map" />
    </div>
</template>

<style scoped>
#map2d {
    width: 100vw;
    height: 100vh;
}
</style>