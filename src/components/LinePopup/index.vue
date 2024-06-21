


<script setup>
import { onMounted, computed, ref, watch, inject } from 'vue';
import { fields } from '@/assets/projs/popup_gx.json';
const props = defineProps({ attributes: Object });
const mapmode = inject("mapmode");

watch(() => [props.attributes], ([attr]) => {
    if (mapmode.value === "2d") return;
    console.log("props.attributes11", props.attributes);
}, { immediate: true })

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

const poptitle = computed(() => {
    let text = '';
    if (props.attributes?.map_num_s && props.attributes?.map_num_e)
        text = props.attributes?.map_num_s + '-' + props.attributes?.map_num_e;
    return text;
})

const len = computed(() => {
    let length = 0;
    if (props.attributes?.len)
        length = parseFloat(props.attributes.len).toFixed(2) + 'm'
    return length
})

const flow = computed(() => {
    let text = '';
    //流向
    switch (props.attributes.flow) {
        case 1:
            text = '正向';
            break;
        case 2:
            text = '反向';
            break;
        case 4:
            text = '未知流向';
            break;
        default:
            text = '暂无流向'
            break;
    }
    return text;
})

const el = ref();

onMounted(() => {
    el.value.remove()
})

</script>

<template>
    <div class="wrap" ref="el">
        <div class="title">
            <span>{{ poptitle }}</span>
        </div>
        <div class='context'>
            <div class="context_line">
                <table>
                    <tr v-for="(item) in newFields">
                        <td width='90px'>{{ item.alias }}</td>
                        <td>{{ item.value }}</td>
                    </tr>
                </table>
            </div>
            <div class='context2'>
                <div class="pipe_line_title">
                    <div>
                        <span>管道类别：</span>
                        <span>{{ attributes.type }}</span>
                    </div>
                    <div>
                        <span>材质：</span>
                        <span>{{ attributes.material }}</span>
                    </div>
                    <div>
                        <span>流向：</span>
                        <span>{{ flow }}</span>
                    </div>
                    <div>
                        <span>埋设：</span>
                        <span>{{ attributes.bury_type }}</span>
                    </div>
                </div>
                <div class="pipe_line_box">
                    <div class="show-line-box">
                        <div class="show-line" id="showLine">
                            <div class="right-bot" id="rightBot"></div>
                            <div class="left-bot" id="leftBot"></div>
                            <div class="listRowToleft"></div>
                        </div>
                    </div>
                    <div class="gdcd">
                        <p>管道长度</p>
                        <p class="gdcd_num">{{ len }}</p>
                    </div>
                    <span class="gdcd_line1"> </span>
                    <span class="gdcd_line2"> </span>
                    <span class="gdcd_line3"> </span>
                    <span class="gdcd_line4"> </span>
                    <div class="gdzj">
                        <p>管道直径</p>
                        <p>{{ attributes.d_s }}</p>
                    </div>
                    <div class="l_gdbg">
                        <p>埋深</p>
                        <p>{{ attributes.bury_deep }}</p>
                    </div>
                    <div class="r_gdbg">
                        <p>埋深</p>
                        <p></p>
                    </div>

                    <div class="left_dh">
                        <span>点号</span>
                        <span>{{ attributes.map_num_s }}</span>
                    </div>
                    <div class="right_dh">
                        <span>点号</span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
@import './index.css';
</style>


