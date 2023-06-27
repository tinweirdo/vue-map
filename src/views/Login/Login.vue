<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
const title = ref('智慧排水管理平台');
const organizer = ref('合肥市排水管理处');
const tecSupport = ref('成都科创');

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
    console.log('login');
    console.log('username', username.value);
    console.log('password', password.value);
    // when login success,route to Map.vue
    router.push({ name: 'map' });
};
</script>

<template>
    <div id="container" class="container">
        <div id="container-bg22" class='container-bg2'></div>
        <div class="row" align="center">
            <!-- 登录内容 -->
            <div id="content-bg" class="content-bg">
                <div class='content-header'>
                    <div class='header-left'>
                        <div class='left-top'></div>
                        <div class='left-img'></div>
                        <div class="left-icon"><img src='./images/light_left.png'></div>
                    </div>
                    <div class='header-center'>
                        <img class='header-center-image' src='./images/line_left.png'>
                        <div class='center-content'>
                            <img id='top-logo' class='top-img' src=''>
                            <span id='top-title' class='top-title'>{{ title }}</span>
                        </div>
                        <div class='center-tx'></div>
                        <img class='header-center-image' src='./images/line_right.png'>
                    </div>
                    <div class='header-right'>
                        <div class='right-top'></div>
                        <div class='right-img'>
                        </div>
                        <div class="right-icon"> <img src='./images/light_right.png'></div>
                    </div>
                </div>


                <form class="form" id="loginForm" onsubmit="return false">
                    <div style="width: 100%;height: 100%;position: relative">
                        <img id="form-sys" class="form-sys" src="./images/qrcode.png" title="微信扫一扫登录">
                        <div class='form-group form-title'>
                            <div class='title-content'>
                                <span id="title-content">账号登录</span>
                                <img id="title-back" class='title-back' src='./images/login-back.png' title="返回" state=''>
                            </div>
                            <!-- <img class='title-line' src='./images/box_downline.png'> -->

                        </div>
                        <div id="form-login" class='form-content'>
                            <div class='form-group form-group-admin'>
                                <div class='input-logo'>
                                    <img src='./images/username.png'>
                                </div>
                                <input type="text" placeholder="请输入登录账号" id="username" v-model="username" />
                            </div>
                            <!-- <div class='form-line'></div> -->
                            <div class='form-group form-group-password'>
                                <div class='input-logo'>
                                    <img src='./images/password.png'>
                                </div>
                                <input type="password" placeholder="请输入登录密码" id="password" v-model="password" />
                                <span id="login-code" class="login-code">获取验证码</span>
                                <span id="login-time" class="login-code login-time">60秒后重试</span>
                            </div>
                            <!-- <div class='form-line'></div> -->
                            <div class='form-group form-group-yzm'>
                                <div class='input-logo'>
                                    <img src='./images/code.png'>
                                </div>
                                <input type="text" placeholder="验证码" id="codesInput" required />
                                <span id="codesImage"></span>
                            </div>
                        </div>
                        <div id="form-download" class='form-contents'>
                            <div class="download-con">
                                <img id="download-img" class="download-img" src="./images/noram.png">
                            </div>
                            <div id="download-msg" class="download-msg">扫描二维码即可下载安卓版管理客户端</div>
                        </div>
                        <button type="submit" id="login" @click="login" data-type="login">登录</button>
                        <div id="form-msgs" class="form-msgs">
                            <span style="display:none" id="login-android" class="form-msg" data-type="android">
                                <img class="android" src="./images/android.png" alt="">
                                安卓客户端</span>
                            <span style="display:none" id="login-message" class="form-msg" data-type="message">
                                <img class="sms" src="./images/sms.png" alt="">
                                短信验证登录</span>
                            <span id="login-scan_login" style="display:none" class="form-msg" data-type="scan_login"><img
                                    class="weixin" src="./images/weixin.png" alt="">扫码登录</span>
                            <span id="login-scan_gzh" class="form-msg" data-type="scan_gzh"><img class="weixin_gzh"
                                    src="./images/weixin_gzh.png" alt="">扫码关注</span>
                        </div>
                        <img class="point1" src="./images/1.png" alt="">
                        <img class="point2" src="./images/2.png" alt="">
                        <img class="point3" src="./images/3.png" alt="">
                        <img class="point4" src="./images/4.png" alt="">
                        <img class="point5" src="./images/form-left.png" alt="">
                        <img class="point6" src="./images/form-right.png" alt="">
                    </div>
                </form>
                <div id="login-copyright" class='content-bottom'>
                    <span id="login-zb" class='bottom-item'>主办:{{ organizer }}</span>
                    <span id="login-jszc">技术支持: {{ tecSupport }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
html {
    font-size: 10px;
    font-family: 'Microsoft YaHei';
}

@media screen and (max-width: 1921px) {
    html {
        font-size: 10px;
    }
}

@media screen and (max-width: 1708px) {
    html {
        font-size: 9px;
    }
}

@media screen and (max-width: 1537px) {
    html {
        font-size: 8px;
    }
}

@media screen and (max-width: 1397px) {
    html {
        font-size: 7.5px;
    }
}

@media screen and (max-width: 1230px) {
    html {
        font-size: 6.5px;
    }
}

@font-face {
    font-family: "优设标题黑";
    src: url('../../../../res/fonts/ysbth.TTF');
}

@font-face {
    font-family: 'UnidreamLED';
    src: url(UnidreamLED/UnidreamLED.eot);
    /***兼容ie9***/
    src: url(UnidreamLED/UnidreamLED.eot?#iefix)format('embedded-opentype'),
        /***兼容ie6-ie8***/
        url('UnidreamLED/UnidreamLED.woff') format('woff'), local('UnidreamLED'), url("UnidreamLED/UnidreamLED.woff");
    /***默认使用本地的***/
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #717085 inset;
}

html,
body {
    height: 100%;
    overflow: hidden;
}

body {
    background: #000407;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
}

.container {
    height: 100%;
    width: 100%;
    display: table;
    text-align: center;
    background-size: cover;
}

.container-bg2 {
    z-index: -999;
    height: 100% !important;
    width: 100% !important;
    position: absolute;
    background: url(./images/login_bg.jpg);
    background-size: 100% 100%;
}

.row {
    display: table-cell;
    vertical-align: middle;
}

.content-bg {
    width: 100vw;
    height: 100vh;
    position: relative;
}

.logo {
    width: 124px;
    height: 132px;
}

.enter-logo {
    margin-bottom: 4.5rem;
}

.title {
    font-size: 4rem;
    /*  35px; */
    font-weight: bold;
    letter-spacing: 2px;
    color: #fff;
    display: inline-block;
}

.sub-title {
    font-size: 3rem;
    margin-top: 2.7rem;
}

.content-tip {
    min-width: 397px;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
    margin-top: 10rem;
}

.content-tip.active {
    background: rgb(255, 59, 47);
}

.form {
    position: absolute;
    bottom: calc(50% - 26rem);
    left: calc(50% - 17.1rem);
    width: 35.1rem;
    height: 43.3rem;
    background-color: #05264b !important;
    border: 1px solid #45eeff;
}

.form .point1 {
    width: 2.2rem;
    height: 2.1rem;
    position: absolute;
    left: -0.3rem;
    top: -0.3rem;
}

.form .point2 {
    width: 2rem;
    height: 2.1rem;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
}

.form .point3 {
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: -0.3rem;
    bottom: -0.3rem;
}

.form .point4 {
    width: 2.2rem;
    height: 2rem;
    position: absolute;
    left: -0.3rem;
    bottom: -0.3rem;
}

.form .point5 {
    width: 25.8rem;
    height: 5.4rem;
    position: absolute;
    left: 0;
    top: 0;
}

.form .point6 {
    width: 14.8rem;
    height: 5.4rem;
    position: absolute;
    right: 0;
    top: 0;
}

.form-title {
    /* width: 33.7rem; */
    height: 5.4rem;
    line-height: 5.4rem;
    text-align: left;
    font-size: 2.1rem;
    font-weight: bold;
    padding-left: 2.7rem;
    margin-bottom: 2.5rem !important;
    /* 2.7rem !important; */
}

.form-title .title-line {
    margin-top: 2rem;
    width: calc(100% - 6rem);
}

.form input {
    width: 100%;
    line-height: 5rem;
    display: block;
    box-sizing: content-box;
    outline: none;
    border: 0px;
    color: #ffffff;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    text-indent: 4rem;
    background: transparent;
    font-size: 1.6rem;
}

.form-group {
    width: 100%;
    /* height: 6.2rem; */
    position: relative;
    background: rgba(17, 17, 17, 0);
    border: 0px;
    color: #666;
}

.form-group-admin {
    border: 1px solid rgba(153, 153, 153, 0.5);
    height: 5rem;
}

.input-logo {
    position: absolute;
    left: 1.3rem
}

.input-logo img {
    width: 1.6rem;
    height: 1.8rem;
    margin-right: 1rem;
    margin-top: 1.6rem;
}

.form #codesInput {
    width: 36rem;
}

.form #codesImage {
    cursor: pointer;
    width: 7.3rem;
    height: 3rem;
    background: rgba(69, 238, 255, 0.5);
    line-height: 3rem;
    font-size: 1.4rem;
    color: #011e3e;
    letter-spacing: 1px;
    position: absolute;
    right: 0.7rem;
    top: 1rem;
}

.form #login[type=submit] {
    color: #ffffff;
    outline: none;
    cursor: pointer;
    display: block;
    font-size: 1.8rem;
    width: calc(100% - 5.4rem);
    height: 5.2rem;
    border: 0px;
    background: -moz-linear-gradient(top, #02E0F6 0%, #0B77B5 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #000000), color-stop(100%, #0B77B5));
    background: -webkit-linear-gradient(top, #02E0F6 0%, #0B77B5 100%);
    background: -o-linear-gradient(top, #02E0F6 0%, #0B77B5 100%);
    background: -ms-linear-gradient(top, #02E0F6 0%, #0B77B5 100%);
    background: linear-gradient(to bottom, #02E0F6 0%, #0B77B5 100%);
}

.form #login[type=submit]:hover {
    color: #FFFFff;
}

.content-bottom {
    width: 100%;
    height: 3.8rem;
    line-height: 3.8rem;
    position: fixed;
    bottom: 0px;
    left: 0;
    color: #999;
    background: rgba(3, 44, 73, 0.6);
    font-size: 1.4rem;
    letter-spacing: 1px;
}

.content-bottom .bottom-item {
    margin-right: 2rem;
}

.form-line {
    width: 75%;
    height: 2px;
    background: radial-gradient(#12A4B4 1%, rgba(255, 255, 255, 0) 100%);
}

.form-content {
    width: calc(100% - 5.4rem)
        /*22.45rem*/
    ;
    border-radius: 6px;
    margin-bottom: 2.9rem;
    /* border-top: 1px solid rgba(28,212,251,0.5);
    border-bottom: 1px solid rgba(28,212,251,0.5);
    border-left: 1px solid rgba(4, 166, 198, 0.5);
    border-right: 1px solid rgba(4, 166, 198, 0.5); */
}


/* 顶部样式 start*/

.content-header {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 100vw;
    height: 5.7rem;
}

.content-header .header-left,
.header-right {
    height: 5.7rem;
    width: calc(50vw - 35rem);
    box-sizing: border-box;
}

.content-header .header-left .left-top,
.content-header .header-right .right-top {
    height: 2.2rem;
    position: relative;
    background: url("./images/line_r.png");
    background-size: contain;
}

.content-header .left-icon img,
.content-header .right-icon img {
    width: 8.2rem;
    height: 1.9rem;
}

.content-header .header-left .left-icon {
    position: relative;
    right: -11.1rem;
    top: -1.1rem;
    text-align: right;
}

.content-header .header-right .right-icon {
    position: relative;
    left: -11.1rem;
    top: -1.1rem;
    text-align: left;
}

.content-header .header-left .left-img {
    width: 100%;
    border-bottom: 2.8rem solid rgba(2, 224, 246, 0.1);
    border-right: 4.8rem solid transparent;
    text-align: right;
    position: relative;
    right: 0;
    top: 0.7rem;
}

.content-header .header-right .right-img {
    width: 100%;
    border-bottom: 2.8rem solid rgba(2, 224, 246, 0.1);
    border-left: 4.8rem solid transparent;
    text-align: left;
    position: relative;
    left: -5rem;
    top: 0.7rem;
}

.content-header .header-center {
    height: 6.2rem;
    display: flex;
}

.content-header .header-center .header-center-image {
    height: 5.9rem;
}

.content-header .header-center .center-content {
    padding: 0 30px;
    min-width: 57rem;
    height: 5.9rem;
    display: flex;
    align-items: center;
    background: url("./images/line.png");
    background-size: contain;
    justify-content: center;
}

.content-header .header-center .center-tx {
    position: absolute;
    left: calc(50% - 18.7rem);
    bottom: -4px;
    width: 35.8rem;
    height: .4rem;
    background: url(./images/mm.png) no-repeat;
    background-size: 35.8rem .4rem;
}

.content-header .header-center .center-content .top-title {
    white-space: nowrap;
    font-size: 3.6rem;
    color: rgba(69, 238, 255, 1);
    text-shadow: 0rem 0rem 1rem rgba(12, 28, 43, 0.3);
    letter-spacing: 2px;
    font-family: 优设标题黑;
}

.content-header .header-center .center-content .top-img {
    margin-right: 1.9rem;
    width: 3rem;
}


/* 顶部样式 end */

.form-msgs {
    width: calc(100% - 5.4rem);
    height: 6.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
}

.form-msg {
    cursor: pointer;
    /* text-decoration: underline; */
    color: #01EAFF;
    display: flex;
    align-items: center;
}

.form-msg .android {
    width: 1.7rem;
    height: 2rem;
    vertical-align: middle;
    margin-right: .7rem;
}

.form-msg .sms {
    width: 2.1rem;
    height: 1.6rem;
    vertical-align: middle;
    margin-right: .7rem;
}

.form-msg .weixin {
    width: 1.9rem;
    height: 1.9rem;
    vertical-align: middle;
    margin-right: .7rem;
}

.form-msg .weixin_gzh {
    width: 2.4rem;
    height: 1.9rem;
    vertical-align: middle;
    margin-right: .7rem;
}

.form-group-password {
    display: flex;
    border: 1px solid rgba(153, 153, 153, 0.5);
    height: 5rem;
    line-height: 5rem;
    margin: 2.2rem 0;
}

.form-group-yzm {
    border: 1px solid rgba(153, 153, 153, 0.5);
    height: 5rem;
}

.login-code {
    display: inline-block;
    line-height: 6.2rem;
    color: #01EAFF;
    z-index: 999;
    position: absolute;
    right: 22px;
    cursor: pointer;
    display: none;
}

.login-time {
    color: #CCCCCC;
    display: none;
}

.form-contents {
    width: calc(100% - 5.4rem);
    /* height: 24rem; */
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    display: none;
}

.download-con {
    width: 23rem;
    height: 23rem;
    /* width: calc(100% - 95px);
    height: calc(100% - 47px); */
    margin-bottom: 1.5rem;
    border: 2px solid rgba(1, 234, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.download-img {
    width: 21rem;
    height: 21rem;
    /* width: calc(100% - 25px);
    height: calc(100% - 25px); */
}

.download-msg {
    width: 100%;
    height: 20px;
    font-size: 1.5rem;
    color: #FFFFFF;
}

.title-content {
    width: calc(100% - 5.7rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #45eeff;
}

.title-back {
    width: 2.7rem;
    height: 2.7rem;
    cursor: pointer;
    display: none;
    z-index: 9;
}

.form-sys {
    cursor: pointer;
    position: absolute;
    right: 2.5rem;
    top: 1.5rem;
    z-index: 9999;
    width: 2.9rem;
    height: 2.8rem;
    /* display: none !important; */
}
</style>