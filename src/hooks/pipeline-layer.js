import { inject, provide } from "vue"

const KEY = Symbol()

export const provideLayer = layer => provide(KEY, { layer })

export const useLayer = () => inject(KEY)