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
var id = parent.id
var url = parent.url;

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
        // GetAnnexesFileList(feaSet[0].properties.piclist);
        // GetAnnexesFileList(feaSet[0].properties.attach);
    }

});
/**
 * 借助FileReader实现转化
 * return base64Url
 */
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
    $("#scada-img").attr('src', feature.properties.imgstr)
    $.getJSON("popup_device.json", "", function (jsondata) {
        var html = "<table width='100%' height='100%'   >";
        //基本参数
        const displayed_fields = jsondata.fields.baseInfo;
        displayed_fields.forEach((ele, i) => {
            const { name, alias, unit, fixed, visible } = displayed_fields[i];
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