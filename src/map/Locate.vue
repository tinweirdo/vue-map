
<script setup>
import { CDKC_LIBS_HOST } from '../env';

</script>

<template>
    <div class="container">

        <div class="input-group">
            <span class="input-group-addon">经度</span>
            <input type="text" class="form-control" value="0" placeholder="请输入经度数值0-180" />
        </div>

        <div class="input-group">
            <span class="input-group-addon">纬度</span>
            <input type="text" class="form-control" value="0" placeholder="请输入纬度数值0-180" />
        </div>

        <div class="input-group text-right">
            <div class="radio radio-inline text-right">
                <input type="button" class="btn btn-primary" value="确定" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn-primary {
    background-color: #0d9cd9;
    border-radius: 4px !important;
    color: #03111c;
    border-color: #0d9cd9;
}

.btn {
    user-select: none;
    touch-action: manipulation;
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
}

.radio-inline {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 400;
    vertical-align: middle;
    cursor: pointer;
    padding: unset;
    margin: 0 15px 0 35px;
    color: #0d9cd9;
    font-size: 14px;
}

.text-right {
    text-align: right;
}

.container {
    position: absolute;
    z-index: 500;
    bottom: 30px;
    left: 320px;
    width: 600px;
    height: 150px;
    margin: unset;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
}

.input-group {
    padding-top: unset !important;
    margin: 0 0 5px 5px;
    display: flex;
    align-items: center;
    position: relative;
    border-collapse: separate;
}

.input-group-addon:first-child {
    text-align: left;
    background-color: unset;
    border: unset;
    color: #ccc;
    padding: unset;
    display: flex;
    align-items: center;
}

.input-group-addon:last-child {
    width: 120px;
    margin-left: 40px;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    border-color: rgba(138, 194, 255, .5);
}

.form-control:last-child {
    margin-left: 40px;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    border-color: rgba(138, 194, 255, .5);
}
</style>