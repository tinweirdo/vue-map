function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

(function () {
    setTimeout(function () {
        this.bindViewEvent();
    }, 200)

    /// <summary>
    /// 引号转义符号
    /// </summary>
    String.EscapeChar = '\'';

    /// <summary>
    /// 替换所有字符串
    /// </summary>
    /// <param name="searchValue">检索值</param>
    /// <param name="replaceValue">替换值</param>
    String.prototype.replaceAll = function (searchValue, replaceValue) {
        var regExp = new RegExp(searchValue, "g");
        return this.replace(regExp, replaceValue);
    }

    /// <summary>
    /// 格式化字符串
    /// </summary>
    String.prototype.format = function () {
        var regexp = /\{(\d+)\}/g;
        var args = arguments;
        var result = this.replace(regexp, function (m, i, o, n) {
            return args[i];
        });
        return result.replaceAll('%', String.EscapeChar);
    }
    //父级页面css控制

    $(".kcgis3d-popup-content", window.parent.document).css('margin', '0px')
    $(".kcgis3d-popup-tip-container", window.parent.document).css('top', '-1px')
    $(".kcgis3d-popup-background", window.parent.document).css('background', 'rgba(0,0,0,.6)')
    $(".kcgis3d-popup-background", window.parent.document).css('border', '1px solid #0E96AB')
    $(".kcgis3d-popup-content-wrapper", window.parent.document).css('padding', '0px')
    $(".kcgis3d-popup-close-button", window.parent.document).css('cursor', 'pointer')
})();
var id = getQueryString("id"),
    url = getQueryString("url"),
    name = null,
    globalId = '',
    _this = this,
    popfeature = null,
    device_code = '',
    area = '',
    ctrl_model = '',
    map_config = ''
this.parent.L.esri.query({
    url: url
}).where('"objectId"=' + id).run(function (error, results) {
    if (results == null) return;
    var feaSet = results.features;
    if (feaSet.length > 0) {
        getpopupHtml(feaSet[0]);
        popfeature = feaSet[0];
        _this.globalId = feaSet[0].properties.globalId;
        _this.device_code = feaSet[0].properties.globalId;
        _this.ctrl_model = feaSet[0].properties.ctrl_model;
        const { area_type, area_name } = feaSet[0].properties;
        if (area_type && area_name) {
            _this.area = feaSet[0].properties.area_type + "-" + feaSet[0].properties.area_name;
        }
    }

});

$.getJSON("../../2d.json", (data) => map_config = data.map.operationallayers);

function getpopupHtml(feature) {
    var teah = this;
    this.globalId = feature.properties.globalId;
    this.device_code = feature.properties.globalId;
    $.getJSON("popup_device.json", "", function (jsondata) {
        teah.areaUrl = jsondata.terPloygonUrl;
        document.getElementById("popTitle").innerHTML = feature.properties["device_name"];
    })
}

function bindViewEvent() {
    $("#xxjc-tabs").on("click", "a", function () {
        var link = $(this).attr("link");
        let index = link.lastIndexOf(".")
        var node = link.substring(0, index);
        $("#scada-" + node).html("<iframe src='" + link + "'></iframe>")
    })
}
