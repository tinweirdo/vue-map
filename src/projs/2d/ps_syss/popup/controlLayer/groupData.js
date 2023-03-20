
$(function () {
    const link = getLink();
    insertIframe(link);
})
const mapArr = parent.map_config;
const config = mapArr.filter(item => item.name === '控制设备')[0];
const ctrlTypes = config.ctrl_model;
const ctrlType = parent.ctrl_model;

function getLink() {
    let link;
    ctrlTypes.forEach(item => {
        const element = Object.entries(item)[0];
        if (element[0] === ctrlType) link = element[1];
    });
    return link;
}

function insertIframe(url) {
    const globalId = parent.globalId;
    debugger
    if (globalId == '123456789') url = "http://58.49.128.78:8083/%E5%AE%89%E5%BE%BD/%E5%90%88%E8%82%A5/%E8%9C%80%E5%B1%B1/%E8%9C%80%E5%B1%B11%E5%8F%B7%E5%88%86%E6%B5%81%E4%BA%95/?id=997"
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.frameborder = "0";
    iframe.style = "width: 100%;height: 100%;"
    iframe.id = "animation";
    iframe.onload = function () {
        $('#animation').find('.main').css('zoom', 0.9);
    };
    $('#context').append(iframe);

}

function iframeLoad() {
}




