<script setup>
import Map from './components/Map.vue'
import Locate from './map/Locate.vue';
import PipeLineGroup from './components/PipeLineGroup.vue';

// 获取项目编码
// 获取配置文件
const pointUrl = 'https://kc3.kcgis.cn:30130/kcgis/services/syzhpsMap/FeatureServer/syhfssPointLayer';
const lineUrl = 'https://kc3.kcgis.cn:30130/kcgis/services/syzhpsMap/FeatureServer/syhfssLineLayer';
const defaultWhere = '1=1'
</script>

<template>
  <leftPane>

  </leftPane>
  <Map>
    <PipeLineGroup :url="{ pointUrl, lineUrl }" :config="{ where: defaultWhere }" />
    <Locate />
  </Map>
</template>

<style>
body,
#app {
  margin: 0;
  padding: 0;
}
</style>
