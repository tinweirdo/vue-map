

<script setup>
import { useRouter, useRoute } from 'vue-router';

const emit = defineEmits(['switchMap']);

const router = useRouter();

const is2d = ref('');
// 切换地图
const switchMap2d = async () => {
    router.push({ path:'/map2d' });
    is2d.value = true;
    emit('switchMap', '二维地图')
};

const switchMap3d = async () => {
    router.push({ path:'/map3d' });
    is2d.value = false;
    emit('switchMap', '三维地图')
};
</script>

<template>
    <div class="menu">
        <div class="switch-box">
            <div class="switch-menu">
                <span>
                    <span class="switchTo-2d" @click="switchMap2d">二维</span>
                    /
                    <span class="switchTo-3d" @click="switchMap3d">三维</span>
                </span>
            </div>
        </div>

        <div class="legend-menu">
            <div>加载中...</div>
        </div>
    </div>
</template>

<style scoped>
.menu {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: fixed;
    z-index: 401;
    bottom: 25px;
    right: 10px;
    background-color: rgb(0 0 0 / 50%);
    box-shadow: 0px 0px 9px 2px rgb(0 9 43 / 13%);
    border-radius: 25px;
    padding: 0 10px;
}

.switch-box {
    width: 10rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 1);
    margin-right: 6px;
    font-size: 12px;
    border-right: 1px solid #9da2b2;
}

.switch-menu {
    width: 16.4rem;
    height: 4.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    color: rgba(255, 255, 255, 1);
}

.switchTo-2d,
.switchTo-3d {
    cursor: pointer;
}

.legend-menu {
    display: flex;
    flex-flow: row wrap;
    font-size: 13px;
    color: #fff;
}
</style>