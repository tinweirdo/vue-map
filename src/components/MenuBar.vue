<script lang="ts" setup>
import { inject, watchEffect, onUnmounted ,ref} from 'vue';
import { useMenus, menuComponents, openWidget } from '../hooks/useMenus';

const app = inject("app")
const menus = useMenus(app);
const openMenus = ref([])
const filterMenus = ref([])

const handleSelect = (key: string, keyPath: string[]) => {
    openWidget(app, key)
}
const stopWatchEffect = watchEffect(() => {
    if (!menus?.value?.length) return;
    for (const menu1 of menus.value) {
        const children = []
        for (const menu2 of menu1.children) {
            if (menu2.display) children.push(menu2)
        }
        menu1.children = children;
        filterMenus.value.push(menu1)
    }
    openMenus.value = menuComponents.filter(ele => ele.config.openAtStart)
    for (const item of openMenus.value) {
        openWidget(app, item.config.id)
    }
})

onUnmounted(() => {
    stopWatchEffect()
})
</script>

<template>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" @select="handleSelect">
        <template v-if="filterMenus.length">
            <el-sub-menu v-for="menu1 in filterMenus" :index="menu1.id" :key="menu1.id">
                <template #title>{{ menu1.name }}</template>
                <el-menu-item v-for="menu2 in menu1.children" :index="menu2.id" :key="menu2.id">
                    {{ menu2.name }}
                </el-menu-item>
            </el-sub-menu>
        </template>
    </el-menu>
</template>