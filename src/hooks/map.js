import L from 'leaflet';
import { inject, provide } from "vue"
import { queryFeatures } from '../api/map-service';
import { config2d } from '../map';

const lineconfig = config2d.map.operationallayers.find(item => item.name === '管线图层');
const pointconfig = config2d.map.operationallayers.find(item => item.name === '管点图层')
const lineFeatures = await queryFeatures(lineconfig.featureUrl, `road_name='晥山路'`);
const PointFeatures = await queryFeatures(pointconfig.featureUrl, `feature='四通'`);

// 地图相关配置
const KEY = Symbol()
export const provideMap = map => provide(KEY, { map })
export const useMap = () => inject(KEY);

export const initData = async (map) => {
    // 绘制点线
    showFeatures(map);
}

// 绘制点线数据
const showFeatures = (map) => {
    // leaflet draw lines
    const lineStyle = {
        color: '#ff0000',
        weight: 2,
        opacity: 1,
        smoothFactor: 1
    }
    const pointStyle = {
        radius: 5,
        fillColor: "#ff0000",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
    const linepop = lineconfig.popup;
    const height = linepop.height;
    const width = linepop.width;
    for (const feature of lineFeatures) {
        if (feature.geometry.paths) {
            const coord1 = [feature.geometry.paths[0][0][1], feature.geometry.paths[0][0][0]];
            const coord2 = [feature.geometry.paths[0][1][1], feature.geometry.paths[0][1][0]];
            const line = L.polyline([coord1, coord2], lineStyle).addTo(map);
            line.bindPopup(`<iframe src="${linepop.url}" width="${width}" height="${height}"></iframe>`);
        }
    }
    const pointpop = pointconfig.popup;

    for (const feature of PointFeatures) {
        if (feature.geometry.y && feature.geometry.x) {
            const coordinates = L.latLng(feature.geometry.y, feature.geometry.x);
            const point = L.circleMarker(coordinates, pointStyle).addTo(map);
            point.bindPopup(feature.attributes.map_num);
        }
    }
}

