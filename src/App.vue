<script setup>
import { ref } from 'vue';

import SwitchMap from 'mapVues/SwitchMap.vue'
import Map2d from '@/views/Map2d.vue'
import Map3d from '@/views/Map3d.vue'
import PipeLines from 'mapVues/PipeLines.vue';
import PipePoints from 'mapVues/PipePoints.vue';

import useFeatures from '@/hooks/useFeatures';

const lineUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssLineLayer';
const pointUrl = 'baseMapUrl/syzhpsMap/FeatureServer/syhfssPointLayer';

const lineFeatures = useFeatures(lineUrl, `road_name='晥山路'`);
const pointFeatures = useFeatures(pointUrl, `road_name='万泽路'`);

// 切换地图
const is2d = ref(true);
const is3d = ref(false);

const clickmenu = (value) => {
  is2d.value = value === '二维地图' ? true : false;
  is3d.value = value === '三维地图' ? true : false;
}
</script>
<template>
  <SwitchMap @switchMap="clickmenu" />
  <Map2d class="map" v-show="is2d">
    <PipeLines :features="lineFeatures" />
    <PipePoints :features="pointFeatures" />
  </Map2d>
  <Map3d class="map" v-show="is3d" />
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
