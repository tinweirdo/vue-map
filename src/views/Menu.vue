  
<script setup>
import { ref, watch, reactive, h, resolveComponent } from 'vue';
import { layer } from "@layui/layui-vue";

import MapManage from '@widgets/MapManage.vue';
import Locate from '@widgets/Locate.vue';

defineProps({
    mapmode: {
        type: String,
        default: '2d'
    }
})
const selectedKey = ref("");
const openKeys1 = ref([]);
const exist = ['map-manage', 'locate'];

const openPage = function (id, e) {
    const text = e.target.innerText;
    layer.open({
        id,
        type: 'page',
        title: text,
        shade: 0,
        resize: true,
        content: h(MapManage, { data: '11' }),
        success: () => {
            // 设置样式
        },
    });
}

</script>

<template>
    <lay-menu theme="light" v-if="mapmode == '2d'" v-model:selected-key="selectedKey" v-model:open-keys="openKeys1">
        <lay-sub-menu>
            <template #title>
                地图管理
            </template>
            <lay-menu-item @click="openPage('map-manage', $event)" id="map-manage">图层管理</lay-menu-item>
            <lay-menu-item @click="openPage('locate', $event)" id="locate">坐标定位</lay-menu-item>
            <lay-menu-item @click="openPage('measure', $event)" id="measure">测量</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                管网查询
            </template>
            <lay-menu-item id="quik-query">快速查询</lay-menu-item>
            <lay-menu-item id="spatial-query">空间查询</lay-menu-item>
            <lay-menu-item id="around-query">周边查询</lay-menu-item>
            <lay-menu-item id="advanced-query">高级查询</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                管网分析
            </template>
            <lay-menu-item id="flow-analysis">流向分析</lay-menu-item>
            <lay-menu-item id="confluence-analysis">汇流分析</lay-menu-item>
            <lay-menu-item id="aging-analysis">老化分析</lay-menu-item>
            <lay-menu-item id="horizontal-distance-analysis">水平净距分析</lay-menu-item>
            <lay-menu-item id="vertical-distance-analysis">垂直净距分析</lay-menu-item>
            <lay-menu-item id="burst-pipe-analysis">爆管分析</lay-menu-item>
            <lay-menu-item id="cross-section-analysis">横剖面分析</lay-menu-item>
            <lay-menu-item id="longitudinal-section-analysis">纵剖面分析</lay-menu-item>
            <lay-menu-item id="connectivity-analysis">连通性分析</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                管网统计
            </template>
            <lay-menu-item id="pipe-custom-statistics">管网统计</lay-menu-item>
            <lay-menu-item id="pipe-aging-statistics">老化统计</lay-menu-item>
            <lay-menu-item id="pipe-statistics">综合统计</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                输出打印
            </template>
            <lay-menu-item id="print-map">打印</lay-menu-item>
            <lay-menu-item id="export-excel">导出EXCEL</lay-menu-item>
        </lay-sub-menu>
    </lay-menu>

    <lay-menu v-if="mapmode == '3d'" v-model:selected-key="selectedKey" v-model:open-keys="openKeys1">
        <lay-sub-menu>
            <template #title>
                地图管理
            </template>
            <lay-menu-item id="map-manage">图层管理</lay-menu-item>
            <lay-menu-item id="locate">坐标定位</lay-menu-item>
            <lay-menu-item id="measure">测量</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                管网查询
            </template>
            <lay-menu-item id="quik-query">快速查询</lay-menu-item>
            <lay-menu-item id="spatial-query">空间查询</lay-menu-item>
            <lay-menu-item id="around-query">周边查询</lay-menu-item>
            <lay-menu-item id="advanced-query">高级查询</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                管网分析
            </template>
            <lay-menu-item id="flow-analysis">流向分析</lay-menu-item>
            <lay-menu-item id="confluence-analysis">汇流分析</lay-menu-item>
            <lay-menu-item id="aging-analysis">老化分析</lay-menu-item>
            <lay-menu-item id="horizontal-distance-analysis">水平净距分析</lay-menu-item>
            <lay-menu-item id="vertical-distance-analysis">垂直净距分析</lay-menu-item>
            <lay-menu-item id="burst-pipe-analysis">爆管分析</lay-menu-item>
            <lay-menu-item id="cross-section-analysis">横剖面分析</lay-menu-item>
            <lay-menu-item id="longitudinal-section-analysis">纵剖面分析</lay-menu-item>
            <lay-menu-item id="connectivity-analysis">连通性分析</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                管网统计
            </template>
            <lay-menu-item id="pipe-custom-statistics">管网统计</lay-menu-item>
            <lay-menu-item id="pipe-aging-statistics">老化统计</lay-menu-item>
            <lay-menu-item id="pipe-statistics">综合统计</lay-menu-item>
        </lay-sub-menu>

        <lay-sub-menu>
            <template #title>
                输出打印
            </template>
            <lay-menu-item id="print-map">打印</lay-menu-item>
            <lay-menu-item id="export-excel">导出EXCEL</lay-menu-item>
        </lay-sub-menu>
    </lay-menu>
</template>