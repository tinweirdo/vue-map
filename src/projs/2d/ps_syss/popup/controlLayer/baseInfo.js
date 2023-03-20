function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
(function () {
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

})();
$("#device_area").click(function () {
    showArea();
})
var id = parent.id
var url = parent.url;
var areaXY = parent.areaXY;
var area_name = parent.area;
// const map = getMap();
// if (parent.globalId === 'PLC_518') {
//     window.open('http://58.49.128.78:8083/%E5%AE%89%E5%BE%BD/%E5%90%88%E8%82%A5/%E8%9C%80%E5%B1%B1/%E8%9C%80%E5%B1%B11%E5%8F%B7%E5%88%86%E6%B5%81%E4%BA%95/?id=997')
// }
// if (parent.globalId === 'PLC_20231') {
//     window.open('http://58.49.128.78:8083/%E5%AE%89%E5%BE%BD/%E5%90%88%E8%82%A5/%E8%9C%80%E5%B1%B1/%E8%9C%80%E5%B1%B12%E5%8F%B7%E5%88%86%E6%B5%81%E4%BA%95/?id=999')
// }
// if (parent.globalId === 'PLC_519') {
//     window.open('http://58.49.128.78:8083/%E5%AE%89%E5%BE%BD/%E5%90%88%E8%82%A5/%E8%9C%80%E5%B1%B1/%E8%9C%80%E5%B1%B13%E5%8F%B7%E5%88%86%E6%B5%81%E4%BA%95/?id=1000')
// }
// if (map) {
//     map.closePopup();
// }
// else {
//     let viewer = window.top.document.querySelector("#iframe_entmain2")?.contentWindow.viewer
//     if(!viewer) viewer = window.top.document.querySelector("#iframe_entmain")?.contentWindow.viewer
//     viewer.kcgis.popup.close()
// }
if (area_name) $("#device_area").html(area_name);
else {
    $("#device_area").html("未知区域");
    $("#btn-right").removeClass("btn-right")
    $("#btn-right").addClass("btn_right_fade")
}

var dataSourceAll = null
var name = null,
    deviceImg = []
this.parent.parent.L.esri.query({
    url: url
}).where('"objectId"=' + id).run(function (error, results) {
    if (results == null) return;
    var feaSet = results.features;
    var mainDiv = document.getElementById("device-content");
    if (feaSet.length > 0) {
        getpopupHtml(feaSet[0], mainDiv);
        //showArea();
        // GetAnnexesFileList(feaSet[0].properties.piclist);
        // GetAnnexesFileList(feaSet[0].properties.attach);
    }

});
/**
 * 借助FileReader实现转化
 * return base64Url
 */

function getMap() {
    var iframe1 = window.top.document.querySelector("#iframe_entmain")
    var iframe2 = window.top.document.querySelector("#lr_frame_main")
    var map;
    if (iframe1) {
        map = iframe1.contentWindow.map;
    }
    else if (iframe2) {
        map = iframe2.lastChild.contentWindow.map;
    }
    else {
        map = window.top.map;
    }
    return map;
}
function blobToDataURL(blob) {
    let a = new FileReader();
    a.onload = function (e) {
        return e.target.result;
    }
    a.readAsDataURL(blob);
}

function GetAnnexesFileList(folderId) {
    var queryData = {
        "folderId": folderId,
    },
        _this = this
    new top.Ajax("/LR_SystemModule/Annexes/").post("GetAnnexesFileList", {
        success: function (result) {
            if (result == null || result == undefined || result == '') return
            result = result.body
            if (result.length == 0) return
            deviceImg = result;
            $("#scada-img").attr('src', window.top.kckj.config.resBase + result[0].F_FilePathNet)
            $("#scada-img").click(function () {
                _this.renderImage(deviceImg);
            })
        },
        params: JSON.stringify(queryData)
    })
}

function getpopupHtml(feature, mainDiv) {
    var state = feature.properties.state, stateClass = "state-lx"
    switch (state) {
        case 0:
            state = "在线"
            stateClass = "state-zx"
            break
        case 1:
            state = "离线"
            stateClass = "state-lx"
            break
        default:
            state = "无状态"
            stateClass = "state-lx"
            break
    }
    if (feature.properties.attach2) {
        if (feature.properties.attach2 === '../../res/theme/pipe1/images/wushuju.png') $("#scada-img").attr('src', '')
        else $("#scada-img").attr('src', feature.properties.attach2)
    }
    $("#device-status").text(state);
    $(".btn-left").addClass(stateClass);
    $.getJSON("popup_device.json", "", function (jsondata) {
        var html = "<table width='100%' height='100%'   >";
        //基本参数
        const displayed_fields = jsondata.fields.baseInfo;
        displayed_fields.forEach((ele, i) => {
            const { name, alias, image, unit, fixed, visible } = displayed_fields[i];
            if (visible) {
                if (feature.properties[name]) {
                    let value = feature.properties[name];
                    if (fixed) {
                        value = parseFloat(value).toFixed(fixed)
                    }
                    if (unit) {
                        value = value + " " + unit
                    }

                    html += `<tr><td><span>${alias}:</td><td class=${i == 0 ? 'tohis' : ' '}>${value}</td></tr>`;
                }
            }
        });
        html += "</table>";
        mainDiv.innerHTML = html;
        //跳转
        $('.tohis').on('click', function (event) {
            event.preventDefault()
            var item = parent.parent.mars3d.widget.getWidget("widgets_jsy/cdkc_zxjc_lssj/widget.js");
            var code = $(this).text()
            item.param = {
                code,
                flag: true
            }
            setTimeout(function () {
                parent.parent.mars3d.widget.activate(item);
            }, 200)
        })
        $("#popup-baseInfo").css("display", "none")
        // document.getElementById("popTitle").innerHTML = feature.properties[jsondata.title];
        //新增滚动条
        $("#device-content").mCustomScrollbar({
            axis: "yx",
            theme: "minimal"
        });
    })


}

function getAlais(translateType, value) {

    for (var i = 0; i < translateType.length; i++) {
        if (translateType[i].name == value) {
            return translateType[i].alias;
        }
    }
}

function renderImage(data) {
    // var datas = parent.widget_zjkajj_top.Enclosure_photo;
    var datas = data
    var json = [];
    for (var i = 0, len = datas.length; i < len; i++) {
        json.push({
            "alt": datas[i].F_FileName,
            "pid": datas[i].F_Id, //图片id
            "src": window.top.kckj.config.resBase + datas[i].F_FilePathNet, //原图地址
        })
    }
    parent.parent.view_photos(json);
}

function showArea() {
    var tach = this;
    var areaXY = parent.areaXY;
    if (areaXY == "") return
    var areaXY = parent.areaXY.split(",");
    var subtype = "waterSupply_area";
    var url = parent.areaUrl;
    var baseMapUrl = parent.parent.kckj.config.baseMapUrl;
    var fullUrl = baseMapUrl + url;
    if (parent.parent.kckj.proj.f_code) {
        var projid = parent.parent.kckj.proj.f_code;
        var where = " \"globalId\" in ('" + areaXY.join("','") + "') and subtype='" + subtype + "' and projid='" + projid + "'";
    } else {
        var where = "\"globalId\"='" + globalId + "' and subtype='" + subtype + "'";
    }


    var query = parent.parent.L.esri.query({
        url: fullUrl
    });
    query.where(where);
    query.fields([]);
    query.returnGeometry(true);
    query.run(function (error, featureCollection, response) {
        if (featureCollection == null || featureCollection.features == null || featureCollection.features.length < 1) {
            layer.msg('没有查询到最新坐标数据！' + error);
            return;
        }
        var feat = featureCollection.features[0];
        if (feat != null) {
            parent.parent.widget_3d_top.showResult(featureCollection);

        } else {
            parent.parent.kckjutil.msg("没有获取到最新坐标!");
        }
    });
}