import { createApp, h } from 'vue'
import L from 'leaflet';
import { queryFeatures } from '../api/map-service';
import linePopup from '../components/map/linePopup.vue';
import pointPopup from '../components/map/pointPopup.vue';

const f_projid = 'ps_syss';
// 项目配置文件
const { config2d, config3d } = await getProjConfig(f_projid);
const lineconfig = config2d.map.operationallayers.find(item => item.name === '管线图层');
const pointconfig = config2d.map.operationallayers.find(item => item.name === '管点图层')
const lineFeatures = await queryFeatures(lineconfig.featureUrl, `road_name='晥山路'`);
const PointFeatures = await queryFeatures(pointconfig.featureUrl, `feature='四通'`);
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
    const height1 = linepop.height;
    const width1 = linepop.width;
    for (const feature of lineFeatures) {
        if (feature.geometry.paths) {
            const coord1 = [feature.geometry.paths[0][0][1], feature.geometry.paths[0][0][0]];
            const coord2 = [feature.geometry.paths[0][1][1], feature.geometry.paths[0][1][0]];
            const line = L.polyline([coord1, coord2], lineStyle).addTo(map);
            const settings = {
                minWidth: width1,
                minHeight: height1
            }
            line.bindPopup(null, settings);
            line.on('popupopen', e => {
                e.target.setPopupContent(returnVueComponentElement(linePopup, {
                    attributes: feature.attributes,
                    geometry: feature.geometry,
                    entity: line
                })
                )
            })
        }
    }
    return
    const pointpop = pointconfig.popup;
    const height2 = pointpop.height;
    const width2 = pointpop.width;
    for (const feature of PointFeatures) {
        if (feature.geometry.y && feature.geometry.x) {
            const coordinates = L.latLng(feature.geometry.y, feature.geometry.x);
            const point = L.circleMarker(coordinates, pointStyle).addTo(map);
            point.bindPopup(feature.attributes.map_num);

            const settings = {
                minWidth: width2 * 0.8,
                minHeight: height2 * 0.8
            }
            // `<iframe src="${linepop.url}" width="${settings.minWidth}" height="${settings.minHeight}"></iframe>`
            point.bindPopup(null, settings);
            point.on('popupopen', e => {
                e.target.setPopupContent(returnVueComponentElement(pointPopup, {
                    objectId: feature.attributes.objectId,
                    url: pointconfig.featureUrl,
                    entity: point
                })
                )
            })
        }
    }
}

const returnVueComponentElement = (component, props = {}) => {
    let app = createApp({
        render() {
            return h(component, props);
        }
    });
    let mount = app.mount(document.createElement("div"));
    return mount.$el;
}

async function getProjConfig(projid) {
    const res = await new Promise((resolve, reject) => {
        const P1 = fetch('../../projs/2d/' + projid + '/2d.json').then(res => res.json());
        const P2 = fetch('../../projs/3d/' + projid + '/3d.json').then(res => res.json());
        Promise.all([P1, P2]).then(res => {
            resolve(res);
        })
    })
    return {
        config2d: res[0],
        config3d: res[1]
    };
}

export default {
    showFeatures
}

