import { inject, provide } from "vue"

// 二维地图相关配置
const mapKEY = Symbol();
export const provideMap = map => provide(mapKEY, map)
export const useMap = () => {
    const map = inject(mapKEY)
    if (!map.value) {
        throw new Error("No map provided!!!")
    }
    return map.value
};

// 三维地图相关配置
const viewerKEY = Symbol();
export const provideViewer = viewer => provide(viewerKEY, viewer)
export const useViewer = () => {
    const viewer = inject(viewerKEY)
    if (!viewer.value) {
        throw new Error("No map provided!!!")
    }
    return viewer.value
};
