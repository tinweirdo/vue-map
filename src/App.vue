<script setup>
import { ref, inject,watch } from 'vue';
import SwitchMap from '@mapVues/SwitchMap.vue'
import useFeatures from '@/hooks/useFeatures';
import { MAP_MODE } from './constant';

const app = inject('app');

const aa = inject('$mapmode');
console.log('aa :>> ', aa);

const mapmode = ref(MAP_MODE['MAP_2D']);
app.config.globalProperties.$mapmode = mapmode;

watch(app.config.globalProperties.$mapmode, (val) => {
  console.log('val :>> ', val);
}, { immediate: true });

import PipeLines from '@mapVues/PipeLines.vue';
import PipePoints from '@mapVues/PipePoints.vue';

import Map2d from '@mapVues/Map2d.vue';
import Map3d from '@mapVues/Map3d.vue';

const lineUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssLineLayer';
const pointUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssPointLayer';

const lineFeatures = useFeatures(lineUrl, `road_name='晥山路'`);
const pointFeatures = useFeatures(pointUrl, `road_name='万泽路'`);

</script>
<template>
  <SwitchMap />

  <Map2d v-if="mapmode === '2d'">
    <PipeLines :features="lineFeatures" />
    <PipePoints :features="pointFeatures" />
  </Map2d>

  <Map3d v-if="mapmode === '3d'">
    <PipeLines :features="lineFeatures" />
    <PipePoints :features="pointFeatures" />
  </Map3d>
</template>

<style scoped>
body,
#app {
  margin: 0;
  padding: 0;
}

.map {
  width: 100vw;
  height: 100vh;
}
</style>
