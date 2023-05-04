

<script setup>
import { useRouter, useRoute } from 'vue-router';
const emit = defineEmits(['switchMap']);

const router = useRouter();
const route = useRoute();

let path;
// 切换地图
const switchMap = async () => {
    const currentPath = router.currentRoute.value.path;
    path = currentPath === '/map2d' ? '/map3d' : '/map2d';
    router.push({ path });

    let pathName = path === '/map2d' ?
        '二维地图' :
        (path === '/map3d' ? '三维地图' : '其他');
    emit('switchMap', pathName)
};
</script>

<template>
    <div class="menu">
        <button @click="switchMap">切换地图</button>
    </div>
</template>

<style scoped>
.menu {
    position: fixed;
    z-index: 401;
    right: 10px;
    top: 10px;
}
</style>