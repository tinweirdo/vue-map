<script setup>
import { ref } from 'vue';

import SwitchMap from 'mapVues/SwitchMap.vue'
import Map2d from '@/views/Map2d.vue'
import Map3d from '@/views/Map3d.vue'
import PipeLines from 'mapVues/PipeLines.vue';
import PipePoints from 'mapVues/PipePoints.vue';

import useFeatures from '@/hooks/useFeatures';
import { MAP_MODE } from './constant';

const lineUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssLineLayer';
const pointUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssPointLayer';

const lineFeatures = useFeatures(lineUrl, `road_name='晥山路'`);
const pointFeatures = useFeatures(pointUrl, `road_name='万泽路'`);

</script>
<template>
  <SwitchMap />

  <router-view></router-view>
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
