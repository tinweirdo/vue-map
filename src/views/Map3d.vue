<script setup>
import { onMounted, onUnmounted } from 'vue';
import { Viewer } from 'cesium';
let viewer = null;
onMounted(() => {
    viewer = new Viewer('cesiumContainer');
});

onUnmounted(() => {
})
</script>

<template>
    <div id="cesiumContainer">
    </div>
</template>

<style>
#cesiumContainer {
    width: 100vw;
    height: 100vh;
}
</style>