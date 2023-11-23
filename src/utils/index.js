import { Viewer } from 'cesium';
import { inject, provide } from "vue"

// 二维地图相关配置
const MAP_KEY = Symbol();
export const provideMap = map => provide(MAP_KEY, map)
export const useMap = () => {
    const map = inject(MAP_KEY)
    if (!map.value) {
        throw new Error("No map provided!!!")
    }
    return map.value
};

// 三维地图相关配置
const VIEWER_KEY = Symbol();
export const provideViewer = viewer => provide(VIEWER_KEY, viewer)
/**
 * 
 * @returns {Viewer}
 */
export const useViewer = () => {
    const viewer = inject(VIEWER_KEY)
    if (!viewer.value) {
        throw new Error("No map provided!!!")
    }
    return viewer.value
};
