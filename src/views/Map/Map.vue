<script setup>
import { ref, provide, onMounted } from 'vue';
import { useFeatures } from '@/hooks/useFeatures';

import Map2d from './Map2d.vue';
import Map3d from './Map3d.vue';

import PipeLines2d from '@components/LinePopup/PipeLines2d.vue';
import PipePoints2d from '@components/PointPopup/PipePoints2d.vue';
import PipeLines3d from '@components/LinePopup/PipeLines3d.vue';
import PipePoints3d from '@components/PointPopup/PipePoints3d.vue';

import SwitchBar from '@components/SwitchBar.vue';
import MenuBar from '@components/MenuBar.vue';

const lineData = useFeatures("line");
const pointData = useFeatures("point");
const mapmode = ref("2d");
provide("mapmode", mapmode);

onMounted(() => {
  console.log('mapmode :>> ', mapmode);
})

const handleChangeMapMode = (newMapmode) => {
  mapmode.value = newMapmode;
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <MenuBar />
        <Map2d v-show="mapmode == '2d'">
          <PipeLines2d :data="lineData" />
          <PipePoints2d :data="pointData" />
        </Map2d>

        <Map3d v-show="mapmode == '3d'">
          <PipeLines3d :data="lineData" />
          <PipePoints3d :data="pointData" />
        </Map3d>

        <SwitchBar :mapmode="mapmode" @changeMapMode="handleChangeMapMode" />
      </el-main>
    </el-container>
  </div>
</template>
