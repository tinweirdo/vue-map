<script setup>
import Map from './components/Map.vue'
import PipeLineGroup from './components/PipeLineGroup.vue';
import { freeBus } from './geojson';
const pipelines = [
  { id: 1, data: freeBus }
]

</script>

<template>
  <leftPane>

  </leftPane>
  <Map>
    <PipeLineGroup :pipelines="pipelines" />
  </Map>

</template>

<style>
body, #app {
  margin: 0;
  padding: 0;
}
</style>
