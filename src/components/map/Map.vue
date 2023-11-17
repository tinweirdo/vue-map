<script setup>
import { ref } from 'vue';
import { usetestJson } from '@/hooks/useFeatures';
import { MAP_MODE } from '@/constant';

import PipeLines2d from '@mapVues/PipeLines2d.vue';
import PipePoints2d from '@mapVues/PipePoints2d.vue';
import PipeLines3d from '@mapVues/PipeLines3d.vue';
import PipePoints3d from '@mapVues/PipePoints3d.vue';

import Menu from '@views/Menu.vue';
import Map2d from '@mapVues/Map2d.vue';
import Map3d from '@mapVues/Map3d.vue';
import SwitchBar from '@mapVues/SwitchBar.vue';

const mapmode = ref(MAP_MODE['MAP_3D']);
const lineFeatures = usetestJson("line");
const pointFeatures = usetestJson("point");

const handleMapmodeUpdated = (newMapmode) => {
  mapmode.value = newMapmode;
}
</script>

<template>
  <Menu :mapmode="mapmode" />

  <Map2d v-show="mapmode === '2d'">
    <PipeLines2d :features="lineFeatures" />
    <PipePoints2d :features="pointFeatures" />
  </Map2d>

  <Map3d v-show="mapmode === '3d'">
    <PipeLines3d :features="lineFeatures" />
    <PipePoints3d :features="pointFeatures" />
  </Map3d>

  <SwitchBar :mapmode="mapmode" @mapmodeUpdated="handleMapmodeUpdated" />
</template>
