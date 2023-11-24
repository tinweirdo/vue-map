<script setup>
import { ref, provide } from 'vue';
import { usetestJson } from '@/hooks/useFeatures';
import { MAP_MODE } from '@/constant';

import Map2d from '@map2d/Map2d.vue';
import PipeLines2d from '@map2d/PipeLines2d.vue';
import PipePoints2d from '@map2d/PipePoints2d.vue';

import Map3d from '@map3d/Map3d.vue';
import PipeLines3d from '@map3d/PipeLines3d.vue';
import PipePoints3d from '@map3d/PipePoints3d.vue';

import Menu from '@views/Menu.vue';
import SwitchBar from '@widgets/SwitchBar.vue';

const mapmode = ref(MAP_MODE['MAP_2D']);

provide("mapmode", mapmode);

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
