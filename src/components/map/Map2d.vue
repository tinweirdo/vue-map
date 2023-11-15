<script setup>
import L from 'leaflet'
import { shallowRef, onMounted } from 'vue';
import { provideMap } from '@/utils';

const map = shallowRef();
provideMap(map);

onMounted(() => {
    const mapOpt = {
        minZoom: 3,
        maxZoom: 18,
        attributionControl: false,
        center: [31.862834, 117.160521],
        zoom: 12
    }
    map.value = L.map('leafletContainer', mapOpt);
    const baseLayers = {
        //天地图tk可以换成自己申请的key
        "天地图":
            L.layerGroup([
                L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
                L.tileLayer('http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
            ]).addTo(map.value),
        "天地图影像":
            L.layerGroup([
                L.tileLayer('http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
                L.tileLayer('http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
            ]),
        "天地图地形":
            L.layerGroup([
                L.tileLayer('http://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
                L.tileLayer('http://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
            ])
    };
    L.control.layers(baseLayers, {}, {
        position: "topright",
        collapsed: false,//如果为 "true"，控件将折叠成一个图标，并在鼠标悬停、触摸或键盘激活时展开。
    }).addTo(map.value);
});


</script>

<template>
    <div id="leafletContainer">

        <slot v-if="map" />
    </div>
</template>

<style>
#leafletContainer {
    width: 100vw;
    height: 100vh;
}
</style>