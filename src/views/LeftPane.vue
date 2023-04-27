<template>
    <div class="menu">
        <button @click="switchMap">切换地图</button>
    </div>
</template>

<script setup>
// 切换地图
function switchMap() {
console.log('111 :>> ', 111);
}
</script>
<style scoped>
.menu{
    position: fixed;
    z-index: 401;
    right: 10px;
    top: 10px;
}
</style>