<script setup>
import { ref } from 'vue';
import { usetestJson } from '@/hooks/useFeatures';
import { MAP_MODE } from '@/constant';

import PipeLines2d from '@mapVues/PipeLines2d.vue';
import PipePoints2d from '@mapVues/PipePoints2d.vue';
import PipeLines3d from '@mapVues/PipeLines3d.vue';
import PipePoints3d from '@mapVues/PipePoints3d.vue';

import Map2d from '@mapVues/Map2d.vue';
import Map3d from '@mapVues/Map3d.vue';
import Menu from '@views/Menu.vue';

const mapmode = ref(MAP_MODE['MAP_3D']);
const lineFeatures = usetestJson("line");
const pointFeatures = usetestJson("point");
</script>

<template>
  <div>
    <Menu :mapmode="mapmode" />
    <Map2d v-if="mapmode === '2d'">
      <PipeLines2d :features="lineFeatures" />
      <PipePoints2d :features="pointFeatures" />
    </Map2d>
    <Map3d v-if="mapmode === '3d'">
      <PipeLines3d :features="lineFeatures" />
      <PipePoints3d :features="pointFeatures" />
    </Map3d>

    <div class="menu">
      <div class="switch-box">
        <div class="switch-menu">
          <span>
            <span class="switch-span" :class="{ current: mapmode === '2d' }"
              @click="mapmode = MAP_MODE['MAP_2D']">二维</span>
            /
            <span class="switch-span" :class="{ current: mapmode === '3d' }"
              @click="mapmode = MAP_MODE['MAP_3D']">三维</span>
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.map {
  width: 100vw;
  height: 100vh;
}


.menu {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  position: fixed;
  z-index: 401;
  bottom: 25px;
  right: 10px;
  background-color: rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 9px 2px rgb(0 9 43 / 13%);
  border-radius: 25px;
  padding: 0 10px;
}

.switch-box {
  width: 10rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 1);
  margin-right: 6px;
  font-size: 12px;
  border-right: 1px solid #9da2b2;
}

.switch-menu {
  width: 16.4rem;
  height: 4.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  color: rgba(255, 255, 255, 1);
}

.switch-span {
  cursor: pointer;
}

.current {
  font-family: "优设标题黑";
  font-size: 17px;
}

.legend-menu {
  display: flex;
  flex-flow: row wrap;
  font-size: 13px;
  color: #fff;
}
</style>