<script setup>
import { ref, provide } from 'vue';
import SwitchMap from '@mapVues/SwitchMap.vue'
import useFeatures from '@/hooks/useFeatures';
import { MAP_MODE } from './constant';

import PipeLines from '@mapVues/PipeLines.vue';
import PipePoints from '@mapVues/PipePoints.vue';

const lineUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssLineLayer';
const pointUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssPointLayer';

const lineFeatures = useFeatures(lineUrl, `road_name='晥山路'`);
const pointFeatures = useFeatures(pointUrl, `road_name='万泽路'`);

</script>
<template>
  <SwitchMap />

  <router-view/>
   
  <!-- <PipeLines :features="lineFeatures"/> -->
  <!-- <PipePoints :features="pointFeatures"/> -->
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
