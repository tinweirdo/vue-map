import { inject, provide } from "vue"

const KEY = Symbol()

export const provideMap = map => provide(KEY, { map })

export const useMap = () => inject(KEY)