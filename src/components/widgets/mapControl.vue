<template >
    <div>
        <div class="container" >
            <div class="content">
                <ul class="ztree"></ul>
                <ul class="ztree"></ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMap } from '@/utils';

const map = useMap();

</script>
<style scoped>
.container {
    height: 100vh;
    overflow-y: auto;
}

.content{
    height: 100%;
}
</style>