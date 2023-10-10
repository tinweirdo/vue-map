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
        // 百度坐标系是 BD09
        // "百度地图": L.tileLayer('http://online{s}.map.bdimg.com/baselayer-icon/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1', {
        //     subdomains: '0123456789', tms: true, crs: 'wgs84'
        // }),
        // "百度卫星": L.tileLayer('http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46', {
        //     subdomains: '0123456789', tms: true, crs: 'wgs84'
        // }),
        // 高德坐标系是火星坐标系（GCJ02）
        "<img class='baselayer-icon' src='img/earth.png' alt='' >高德地图": L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            { subdomains: "1234", crs: 'gcj02' }).addTo(map.value),
        "<img class='baselayer-icon' src='img/earth.png' alt='' >高德影像": L.layerGroup(
            [
                L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', { subdomains: "1234" }),
                L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
                    { subdomains: "1234" })
            ]
        ),
        //天地图tk可以换成自己申请的key
        "<img class='baselayer-icon' src='img/earth.png' alt='' >天地图": L.layerGroup([
            L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
            L.tileLayer('http://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
        ]),
        "<img class='baselayer-icon' src='img/earth.png' alt='' >天地图影像": L.layerGroup([
            L.tileLayer('http://t{s}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
            L.tileLayer('http://t{s}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
        ]),
        "<img class='baselayer-icon' src='img/earth.png' alt='' >天地图地形": L.layerGroup([
            L.tileLayer('http://t{s}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
            L.tileLayer('http://t{s}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=6da78be63e66c6ac6a6f4164e85cbeab', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] })
        ]),

        // GeoQ 也是 GCJ02
        "<img class='baselayer-icon' src='img/earth.png' alt='' >GeoQ ": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}'),
        "<img class='baselayer-icon' src='img/earth.png' alt='' >GeoQ 藏蓝": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'),
        "<img class='baselayer-icon' src='img/earth.png' alt='' >GeoQ 灰": L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}')
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
.baselayer-icon {
    padding: 0.25em 0.6em 0.25em;
    font-weight: 400;
    border-radius: 0.3em;
    margin-top: -3px;
}

#leafletContainer {
    width: 100vw;
    height: 100vh;
}
</style>