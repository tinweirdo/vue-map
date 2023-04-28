<script setup>
import '../../style/popup.css';
import { reactive, shallowRef, onMounted } from 'vue';
import { typeDic } from '../../api/map-service';
const props = defineProps(['attributes', 'geometry', 'entity']);

const title = shallowRef('');
const attributes = reactive(props.attributes);
const geometry = props.geometry;

onMounted(() => {
    if (attributes.map_num_s && attributes.map_num_e) {
        title.value = attributes.map_num_s + "-" + attributes.map_num_e;
    }
})

</script>

<template >
    <div>
        <div class="title">
            <span>{{ title }}</span>
        </div>
        <div class='context' style="display: flex;justify-content: space-between;">
            <div id="context" class="context_line">
            </div>
            <div id="context2" class='context2'>
                <div class="pipe_line_title">
                    <span>管道类别：</span>
                    <span style="color: #ccc;">{{typeDic[attributes.type] || attributes.type}}</span>
                    <br>
                    <span>材质：</span>
                    <span style="color: #ccc;">{{attributes.material}}</span>
                    <br>
                    <span>流向：</span>
                    <span style="color: #ccc;"></span>
                    <br>
                    <span>埋设：</span>
                    <span style="color: #ccc;" id="gd_burytype"></span>
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
                        <p class="gdcd_num" id="gdcd_num"></p>
                    </div>
                    <span class="gdcd_line1"> </span>
                    <span class="gdcd_line2"> </span>
                    <span class="gdcd_line3"> </span>
                    <span class="gdcd_line4"> </span>
                    <div class="gdzj">
                        <p>管道直径</p>
                        <p id="gdzj_num"></p>
                    </div>
                    <div class="l_gdbg">
                        <p>埋深</p>
                        <p id="l_gdbg_num"></p>
                    </div>
                    <div class="r_gdbg">
                        <p>埋深</p>
                        <p id="r_gdbg_num"></p>
                    </div>

                    <div class="left_dh">
                        <span id="left_dh_title">点号</span>
                        <span id="left_dh_num"></span>
                    </div>
                    <div class="right_dh">
                        <span id="right_dh_title">点号</span>
                        <span id="right_dh_num"></span>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped></style>


