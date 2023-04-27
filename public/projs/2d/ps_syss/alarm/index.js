const paramString = window.location.href.split('?')[1];
const queryString = new URLSearchParams(paramString);
var globalId;
var alarmId;
var map_config;
for (const pair of queryString.entries()) {
    if (pair[0] === 'globalid') globalId = pair[1];
    if (pair[0] === 'alarmid') alarmId = pair[1];
}

$(function () {
    bindViewEvent();
    if (!alarmId) $('.containner-content').html(`<p style="margin-top: 1em;">暂无数据</p>`);
    $.getJSON("../2d.json").then(data => {
        const deviceUrl = data.baseMapUrl + 'syzhpsStream/FeatureServer/syssDevicePointLayer';
        const serviceUrl = data.serviceUrl;
        const projid = data.projid;
        getWarnings(serviceUrl, projid)
            .then(data => {
                if (!data) return
                $('#device-connect').show();
                $('#device-name').text(data.code);
                $('.device-address').text(`地址：${data.name}`);
                $('.waring-type').text(`${data.alarmlevel}告警`);
                const isClose = data.alarmstate === '2' ? '已消警' : '未消警';
                $('#alarm-close').text(`是否消警：${isClose}`)
                $('#alarm-time').text(`告警时间：${data.alarmtime}`);
                $('#alarm-info').text(`告警详情：${data.description}`);
                queryInfo(deviceUrl);
            })
    })
});


function queryInfo(url) {
    Promise.all([getParams(), getDeviceInfo(url)]).then(([params, feature]) => {
        let ParamsHTML = `<div class="child-con">更新时间：${feature.attributes.last_edited_date}</div>`;
        params.forEach((outele, i) => {
            const { name, alias, visible, unit, fixed } = outele;
            if (visible) {
                if (feature.attributes[name]) {
                    let thisname = feature.attributes[name];
                    //控制小数位数
                    if (fixed) {
                        thisname = parseFloat(thisname).toFixed(fixed)
                    }
                    //单位
                    if (unit) {
                        thisname = thisname + " " + unit
                    }
                    ParamsHTML += `<div class="child-con">${alias}：${thisname}</div>`;
                }
            }
        });
        $('#device-params').after(ParamsHTML)
    })

}

function getParams() {
    return new Promise((resolve, reject) => {
        $.getJSON("../popup/deviceLayer/popup_device.json").then(jsondata => {
            const params = jsondata.fields.otherInfo;
            resolve(params);
        })
    })
}
function getDeviceInfo(url) {
    return new Promise((resolve, reject) => {
        $.getJSON(
            url + '/query',
            { where: `globalId = '${globalId}'` },
            res => {
                if (!res.features) return;
                $('.params-div').show();
                const feature = res.features[0];
                resolve(feature);
            })
    })
}

function getWarnings(url, projid) {
    return new Promise((resolve, reject) => {
        const param = { projid: projid };//不显示已消除告警
        $.post(url + '/cdkc_yun/cdkc_alarm/GetList', { data: JSON.stringify(param) }, function (res) {
            const thisAlarm = res.data.filter(item => item.id === alarmId)[0];
            thisAlarm ? resolve(thisAlarm) : reject(new Error('未获取告警信息'));
        })
    }).catch(err => {
        $('.containner-content').html(`<p style="margin-top: 1em;">暂无数据</p>`);
        console.log(err);
    })
}


function bindViewEvent() {
    //顶部tab栏点击切换
    $('#device-tab>div').on('click', function () {
        if ($(this).hasClass('click-tab')) return
        var id = $(this).attr('data-id')
        var text = $("#device-type").text()
        $(this).siblings().removeClass('click-tab')
        $(this).addClass('click-tab')
        initData(id, -1)
    })

    //下拉图标
    $("#device-connect").on("click", ".iconjsy_arrow", function () {
        if ($(this).attr('data-flag') == 'true') {
            $(this).css('transform', 'rotate(180deg)')
            $(this).attr('data-flag', 'false')
            $(this).parent().next().next().slideToggle(200)
        }
        else {
            $(this).css('transform', 'rotate(0deg)')
            $(this).attr('data-flag', 'true')
            $(this).parent().next().next().slideToggle(200)
        }
    })

}