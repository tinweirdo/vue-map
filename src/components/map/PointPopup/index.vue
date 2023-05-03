<script setup>
import { onMounted, computed, ref } from 'vue';
import { fields } from '@/assets/projs/popup_gd.json';
// const props = defineProps(['attributes', 'geometry', 'entity']);
const props = defineProps({ attributes: Object, geometry: Array });

console.log('fields :>> ', fields);

const title = computed(() => {
    if (!props.attributes) return ''
    return props.attributes.map_num_s + '-' + props.attributes.map_num_e
})

const el = ref()

onMounted(() => {
    el.value.remove()
})

</script>

<template>
    <div class="wrap" ref="el">
        <div class="title">
            <span id="popTitle"></span>
        </div>
        <div class='context' style="display: flex;justify-content: space-between;">
            <div id="context" class="context_line">
            </div>
            <div id="context3" class='context3'>
                <div class="gaocheng">
                    地面高程
                </div>
                <div class="right-line" id="rightLine">
                    <div class="right-shen">埋深</div>
                </div>
                <div class="left-line">
                    <div class="left-shen">埋深</div>
                </div>
                <div class="right-cir">
                    <div class="right-bottom"></div>
                    <div class="left-caliber">管径</div>
                    <div class="right-m">
                        <p id="e_mapnum"></p>
                        <p id="e_material"></p>
                    </div>
                </div>
                <div class="mid-cir">
                    <div class="mid-bottom"></div>
                    <div class="mid-line">
                        <div class="mid-shen">井深</div>
                    </div>
                </div>
                <div class="left-cir">
                    <div class="left-bottom"></div>
                    <div class="left-caliber">管径</div>
                    <div class="left-m">
                        <p id="s_mapnum"></p>
                        <p id="s_material"></p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
@import './index.css';
</style>


