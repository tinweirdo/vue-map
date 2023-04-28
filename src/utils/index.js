import { inject, provide } from "vue"

// 地图相关配置
const KEY = Symbol()
export const provideMap = map => provide(KEY, { map })
export const useMap = () => inject(KEY);