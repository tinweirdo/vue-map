<script setup>
import { provide } from 'vue';

import LeftPane from '@/views/LeftPane.vue'
import Map2d from 'mapVues/Map2d.vue'
import Map3d from 'mapVues/Map3d.vue'
import PipeLines from 'mapVues/PipeLines.vue';
import PipePoints from 'mapVues/PipePoints.vue';

import useFeatures from '@/hooks/useFeatures';

const lineUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssLineLayer';
const pointUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssPointLayer';

const lineFeatures = useFeatures(lineUrl, `road_name='晥山路'`);
const pointFeatures = useFeatures(pointUrl, `road_name='万泽路'`);

provide('lineFeatures', lineFeatures);
provide('pointFeatures', pointFeatures);
</script>
<template>
  <LeftPane />
  <Map2d>
    <PipeLines :features="lineFeatures" />
    <PipePoints :features="pointFeatures" />
  </Map2d>
  <Map3d />
</template>

<style scoped>
body,
#app {
  margin: 0;
  padding: 0;
}
</style>
