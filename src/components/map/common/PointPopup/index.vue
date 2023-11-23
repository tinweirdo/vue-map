<script setup>
import { onMounted, computed, ref } from 'vue';
import { fields } from '@/assets/projs/popup_gd.json';
// const props = defineProps(['attributes', 'geometry', 'entity']);
const props = defineProps({ attributes: Object, geometry: Array });

const title = computed(() => {
    if (!props.attributes) return ''
    return props.attributes.map_num
})

const newFields = computed(() => {
    const arr = [];
    for (const item of fields) {
        const { name, visible, unit, fixed } = item;
        if (props.attributes[name] && visible) {
            let thisValue = props.attributes[name];
            //保留小数位数
            if (fixed) {
                thisValue = parseFloat(thisValue).toFixed(fixed)
            }
            //添加单位
            if (unit) {
                thisValue = thisValue + " " + unit
            }
            item.value = thisValue;
            arr.push(item);
        }
    }
    return arr;
})

// 地面高程
const surf_h = computed(() => {
    let h = '';
    h = newFields.value.find(item => item.name === 'surf_h')?.value;
    return h
})

// 埋深
const bury_deep = computed(() => {
    let h = '';
    h = newFields.value.find(item => item.name === 'bury_deep')?.value;
    return h
})

// 井深
const cen_deep = computed(() => {
    let h = '';
    h = newFields.value.find(item => item.name === 'cen_deep')?.value;
    return h
})

const el = ref()

onMounted(() => {
    el.value.remove()
})

</script>

<template>
    <div class="wrap" ref="el">
        <div class="title">
            <span id="popTitle">{{ title }}</span>
        </div>
        <div class='context' style="display: flex;justify-content: space-between;">
            <div class="context_line">
                <table>
                    <tr v-for="(item) in newFields">
                        <td width='70px'>{{ item.alias }}</td>
                        <td>{{ item.value }}</td>
                    </tr>
                </table>
            </div>
            <div id="context3" class='context3'>
                <div class="gaocheng">
                    地面高程 {{ surf_h ? ('：' + surf_h) : '' }}
                </div>
                <div class="right-line" id="rightLine">
                    <div class="right-shen">埋深</div>
                </div>
                <div class="left-line">
                    <div class="left-shen">埋深{{ bury_deep ? ('：' + bury_deep) : '' }}</div>
                </div>
                <div class="right-cir">
                    <div class="right-bottom"></div>
                    <div class="left-caliber">管径</div>
                    <div class="right-m">
                        <p id="e_mapnum"></p>
                        <p id="e_material"></p>
                    </div>
                </div>
                <div class="left-cir">
                    <div class="left-bottom"></div>
                    <div class="left-caliber">管径</div>
                    <div class="left-m">
                        <p>{{ title }}</p>
                        <p>{{props.attributes['material']}}</p>
                    </div>
                </div>
                <div class="mid-cir">
                    <div class="mid-bottom"></div>
                    <div class="mid-line">
                        <div class="mid-shen">井深{{ cen_deep ? ('：' + cen_deep) : '' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import './index.css';
</style>


