import { inject, provide } from "vue"

// 地图相关配置
const mapKEY = Symbol()
export const provideMap = map => provide(mapKEY, map)
export const useMap = () => {
    const map = inject(mapKEY)
    if (!map.value) {
        throw new Error("No map provided!!!")
    }
    return map.value
};
