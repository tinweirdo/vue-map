function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // console.log(reg)
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

var tablename = getQueryString("id");
var url = getQueryString("url");
console.log("tablename", tablename)
var pointUrl = "syzhpsMap/FeatureServer/syhfssPointLayer";
var lineUrl = "syzhpsMap/FeatureServer/syhfssLineLayer";

var tableArr = tablename.split("_");
console.log('tableArr: ', tableArr);
if (!!!tablename) {
    var mainDiv = document.getElementById("context");
    mainDiv.innerHTML = "<p>数据出错,id不存在</p>";
    //alert("数据出错,id不存在")
    throw new Error("数据出错,id不存在")
}
var querystr;
var where;
var cen_deep;
var numreg = /^[0-9]+.?[ 0-9]*/;
// querystr = tableArr[5];
// var isNum = numreg.test(querystr);
querystr = tableArr[0];
if (isNaN(querystr)) {
    where = "map_num='" + querystr + "'";
    showPointPop(where);
}
else {
    // where = "\"objectId\"=117220";
    where = "\"objectId\"=" + parseInt(querystr);
    showLinePop(where);
    // parent.cdkc.alert.warning("未知数据");
}

function showPointPop(where) {
    $("#context3").show(); 
    $("#context2").hide();
    var fullPointUrl = url + pointUrl;
    new Promise((resolve) => {
        parent.kcgis3d.L.esri.query({
            url: fullPointUrl
        }).where(where).run(function (error, results) {
            if (results == null) return;
            var feaSet = results.features;
            if (feaSet.length > 0) {
                resolve(feaSet[0])
            }
        });
    }).then(feature => {
        var mainDiv = document.getElementById("context");
        getPointpopupHtml(feature, mainDiv);
        setpoint_picstyle(feature);
        console.log('feature: ', feature);
    }).catch(err => console.log(err))
}

function showLinePop(where) {
    // console.log("where", "\"objectId\"=106536");
    console.log("where", where);
    $("#context3").hide();
    $("#context2").show();
    var fullLineUrl = url + lineUrl;
    console.log("fullLineUrl", fullLineUrl);
    let query = parent.kcgis3d.L.esri.query({
        url: fullLineUrl
    });
    query.params.whereEncryption = false;
    new Promise((resolve, reject) => {
        try {
            parent.kcgis3d.L.esri.query({
                url: fullLineUrl
            }).where(where).returnGeometry(true)
                .run(function (error, results) {
                    if (results == null) return;
                    var feaSet = results.features;
                    resolve(feaSet);
                });
        } catch (error) {
            console.log("error", error);
        }
    }).then(feaSet => {
        var mainDiv = document.getElementById("context");
        if (feaSet.length > 0) {
            let feature = feaSet[0];
            getLinepopupHtml(feature, mainDiv);
            setline_picstyle(feature);
            console.log('feature: ', feature);
        }
    }).catch(err => console.log(err));
}

//set line popup new style
function setline_picstyle(feature) {
    new Promise((resolve) => {
        let gdInfo = feature.properties;
        $.getJSON("../popup_gx.json", "", function (jsondata) {

            for (const item of jsondata.fields) {
                const [name, unit, fixed] = [item.field.name, item.field.unit, item.field.fixed];
                //单位和小数位数
                if (gdInfo[name]) {
                    if (fixed) {
                        gdInfo[name] = parseFloat(gdInfo[name]).toFixed(fixed)
                    }
                    if (unit) {
                        gdInfo[name] = gdInfo[name] + " " + unit
                    }
                    //流向
                    if (gdInfo.flow == 1) {
                        $("#gd_flow").text("正向");
                    }
                    else if (gdInfo.flow == 2) {
                        $("#gd_flow").text("反向");
                    }
                    else if (gdInfo.flow == 4) {
                        $("#gd_flow").text("未知流向");
                    }
                    else {
                        $("#gd_flow").text("暂无流向");
                    }
                }
            }
            resolve(gdInfo)
        })
    }).then((gdInfo) => {
        $("#gdzj_num").text(gdInfo.d_s || "");
        $("#gdcd_num").text(gdInfo.len || "");
        $("#gd_type").text(parent.service.getNameCN(gdInfo.subtype), "subtype");
        $("#gd_material").text(gdInfo.material || "");
        $("#gd_burytype").text(gdInfo.bury_type || "");
        if (eval(parseFloat(gdInfo.cen_deep_sn)) > eval(parseFloat(gdInfo.cen_deep_en))) {
            $("#right_dh_title").text("起点号");
            $("#right_dh_num").text(gdInfo.map_num_s);
            $("#r_gdbg_num").text(gdInfo.cen_deep_sn)

            $("#left_dh_title").text("终点号");
            $("#left_dh_num").text(gdInfo.map_num_e);
            $("#l_gdbg_num").text(gdInfo.cen_deep_en);
            setFlow(true, gdInfo.flow)
        }
        else {
            $("#right_dh_title").text("终点号");
            $("#right_dh_num").text(gdInfo.map_num_e);
            $("#r_gdbg_num").text(gdInfo.cen_deep_en);

            $("#left_dh_title").text("起点号");
            $("#left_dh_num").text(gdInfo.map_num_s);
            $("#l_gdbg_num").text(gdInfo.cen_deep_sn);
            setFlow(false, gdInfo.flow)
        }
    }).catch(err => console.log(err))
}

//set point popup new style
function setpoint_picstyle(feature) {
    let properties = feature.properties;
    let map_num = properties.map_num;

    var fullLineUrl = url + lineUrl;
    let where = "map_num_s='" + map_num + "' or map_num_e='" + map_num + "'";

    parent.L.esri.query({
        url: fullLineUrl
    }).where(where).run(function (error, data) {
        if (data == null) {
            parent.parent.cdkc.alert.warning('未获取此管点相关管道数据')
        }
        else {
            data = data.features
            if (data.length > 0) {
                let s_line = data.filter(feature => (feature.properties.map_num_s == map_num));
                let e_line = data.filter(feature => (feature.properties.map_num_e == map_num));
                if (s_line.length > 0) {
                    s_line_pop(s_line);
                }
                else if (e_line.length > 0) {
                    e_line_pop(e_line);
                }
            }
            else {
                parent.parent.cdkc.alert.warning('暂无此管点相关数据')
            }
        }
    });
}

function s_line_pop(data) {
    //如果有多条数据，如何舍取？
    let linefeat = data[0].properties;
    let s_point = linefeat.map_num_s;
    let e_point = linefeat.map_num_e;
    if (s_point) $("#s_mapnum").text(s_point);
    if (e_point) $("#e_mapnum").text(e_point);
    let where = "map_num='" + s_point + "' or map_num='" + e_point + "'";
    new Promise((resolve, reject) => {
        parent.kcgis3d.L.esri.query({
            url: url + pointUrl
        }).where(where).run(function (error, results) {
            if (results == null) reject(new Error("no feature."));
            resolve(results.features);
        });
    }).then(feaSet => {
        let s_feat = feaSet.filter(ele => (ele.properties.map_num == s_point))[0].properties;
        let e_feat = feaSet.filter(ele => (ele.properties.map_num == e_point))[0].properties;
        return new Promise((resolve) => {
            $.getJSON("../popup_gd.json", "", function (jsondata) {
                for (const item of jsondata.fields) {
                    const [name, unit, fixed] = [item.field.name, item.field.unit, item.field.fixed];
                    if (s_feat[name]) {
                        if (fixed) {
                            s_feat[name] = parseFloat(s_feat[name]).toFixed(fixed)
                        }
                        if (unit) {
                            s_feat[name] = s_feat[name] + "" + unit
                        }
                    }
                    if (e_feat[name]) {
                        if (fixed) {
                            e_feat[name] = parseFloat(e_feat[name]).toFixed(fixed)
                        }
                        if (unit) {
                            e_feat[name] = e_feat[name] + " " + unit
                        }
                    }
                }
                resolve({ s_feat, e_feat })
            })
        })
    }).then(({ s_feat, e_feat }) => {
        //地面高程
        $(".gaocheng").html(s_feat.surf_h ? ("地面高程：" + s_feat.surf_h) : ("地面高程"));
        //井深
        $(".mid-shen").html(s_feat.cen_deep || "井深");
        //埋深
        $(".left-shen").html(s_feat.bury_deep || "埋深");
        $(".right-shen").html(e_feat.bury_deep || "埋深");
        //管径
        $(".left-cir .left-caliber").html(s_feat.d_s || "管径");
        $(".right-cir .left-caliber").html(e_feat.d_s || "管径");
        //材质
        $("#s_material").text(s_feat.material ? ("材质：" + s_feat.material) : (""));
        $("#e_material").text(e_feat.material ? ("材质：" + e_feat.material) : (""));
    }).catch(err => console.log(err));
}

function e_line_pop(data) {
    let linefeat = data[0].properties;
    let s_point = linefeat.map_num_s;
    let e_point = linefeat.map_num_e;
    if (s_point) $("#s_mapnum").text(s_point);
    if (e_point) $("#e_mapnum").text(e_point);
    let where = "";
    if (s_point) {
        where = "map_num='" + s_point + "' or map_num='" + e_point + "'";
    }
    else {
        where = "map_num='" + e_point + "'";
    }
    $("#e_mapnum").text(e_point);
    new Promise((resolve, reject) => {
        parent.kcgis3d.L.esri.query({
            url: url + pointUrl
        }).where(where).run(function (error, results) {
            if (results == null) reject(new Error("no feature."));
            resolve(results.features);
        });
    }).then(feaSet => {
        let e_feat = feaSet.filter(ele => (ele.properties.map_num == e_point))[0].properties;
        let s_feat = feaSet.filter(ele => (ele.properties.map_num == s_point))[0].properties;
        return new Promise((resolve) => {
            $.getJSON("../popup_gd.json", "", function (jsondata) {
                for (const item of jsondata.fields) {
                    const [name, unit, fixed] = [item.field.name, item.field.unit, item.field.fixed];
                    if (s_feat[name]) {
                        if (fixed) {
                            s_feat[name] = parseFloat(s_feat[name]).toFixed(fixed)
                        }
                        if (unit) {
                            s_feat[name] = s_feat[name] + " " + unit
                        }
                    }
                    if (e_feat[name]) {
                        if (fixed) {
                            e_feat[name] = parseFloat(e_feat[name]).toFixed(fixed)
                        }
                        if (unit) {
                            e_feat[name] = e_feat[name] + " " + unit
                        }
                    }
                }
                resolve({ s_feat, e_feat })
            })
        })
    }).then(({ s_feat, e_feat }) => {
        //地面高程
        $(".gaocheng").html(e_feat.surf_h ? ("地面高程：" + e_feat.surf_h) : ("地面高程"));
        //井深
        $(".mid-shen").html(e_feat.cen_deep || "井深");
        //埋深
        $(".right-shen").html(e_feat.bury_deep || "埋深");
        //管径
        $(".right-cir .left-caliber").html(e_feat.d_s || "管径");
        //材质
        $("#e_material").text(e_feat.material ? ("材质：" + e_feat.material) : (""));

        if (s_feat) {
            //埋深
            $(".left-shen").html(s_feat.bury_deep || "埋深");
            //管径
            $(".left-cir .left-caliber").html(s_feat.d_s ? (s_feat.d_s) : ("管径"));
            //材质
            $("#s_material").text(s_feat.material ? ("材质：" + s_feat.material) : (""));
        }
    }).catch(err => console.log(err));
}

function getPointpopupHtml(feature, mainDiv) {
    $.getJSON("../popup_gd.json", "", function (jsondata) {
        var html = "<table width='100%' height='100%'   >";
        for (var i = 0; i < jsondata.fields.length; i++) {
            var name = jsondata.fields[i].field.name;
            var alias = jsondata.fields[i].field.alias;
            var translateType = jsondata.fields[i].field.translateType;
            var unit = jsondata.fields[i].field.unit
            var fixed = jsondata.fields[i].field.fixed
            if (feature.properties[name]) {
                if (translateType) {
                    var translate = parent.service.getNameCN(feature.properties[name], name);
                    html += "<tr><td  width='70px'>" + alias + ":</td><td>" + translate + "</td></tr>";
                }
                else {
                    var value = jsondata.fields[i].field.value;
                    if (value) {
                        html += "<tr><td  width='70px'>" + alias + ":</td><td>" + value + "</td></tr>";
                    } else {
                        let thisname = feature.properties[name];
                        if (fixed) {
                            thisname = parseFloat(thisname).toFixed(fixed)
                        }
                        if (unit) {
                            thisname = thisname + " " + unit
                        }
                        html += "<tr><td  width='70px'>" + alias + ":</td><td>" + thisname + "</td></tr>"
                    }
                }
            }
        }
        html += "</table>";
        mainDiv.innerHTML = html;
        document.getElementById("popTitle").innerHTML = feature.properties[jsondata.title];
        $('#context').mCustomScrollbar({
            axis: "y",
            theme: "minimal"
        })
    });
}

function getLinepopupHtml(feature, mainDiv) {
    lineColor(feature.properties.type, feature.properties.subtype)//根据管线大类和子类显示颜色
    $.getJSON("../popup_gx.json", "", function (jsondata) {
        var html = "<table width='100%' height='100%'   >";
        var html = "<table width='100%' height='100%'   >";
        var titlename;
        for (var i = 0; i < jsondata.fields.length; i++) {
            var name = jsondata.fields[i].field.name;
            var alias = jsondata.fields[i].field.alias;
            var translateType = jsondata.fields[i].field.translateType;
            var unit = jsondata.fields[i].field.unit;
            var fixed = jsondata.fields[i].field.fixed;
            titlename = feature.properties["map_num_s"] + " - " + feature.properties["map_num_e"]
            if (feature.properties[name]) {
                if (translateType) {
                    var translate = parent.service.getNameCN(feature.properties[name], name)
                    html += "<tr><td  width='90px'>" + alias + ":</td><td>" + translate + "</td></tr>";
                }
                else {
                    let thisname = feature.properties[name];
                    //保留小数位数
                    if (fixed) {
                        thisname = parseFloat(thisname).toFixed(fixed)
                    }
                    //添加单位
                    if (unit) {
                        thisname = thisname + " " + unit
                    }
                    html += "<tr><td  width='90px'>" + alias + ":</td><td>" + thisname + "</td></tr>"
                }
            }
        }
        html += "</table>";
        mainDiv.innerHTML = html;
        document.getElementById("popTitle").innerHTML = titlename;
        $('#context').mCustomScrollbar({
            axis: "y",
            theme: "minimal"
        })
    });
}

//判断流向显示数据
function setFlow(isabove, flow) {
    if (isabove) {
        switch (flow) {
            case 1:
                break;
            case 2://反向
                $(".listRowToleft").css("transform", "rotate(180deg)");
                break;
            case 4://未知
                $(".listRowToleft").css("display", "none")
                parent.parent.cdkc.alert.warning('未知流向！')
                break;
            case 0://没有流向
                $(".listRowToleft").css("display", "none")
                parent.parent.cdkc.alert.warning('无流向数据！')
                break;
            default:
                $(".listRowToleft").css("display", "none")
                parent.parent.cdkc.alert.warning('未定义流向！')
                break;
        }
    }
    else {
        switch (flow) {
            case 1://反向
                $(".listRowToleft").css("transform", "rotate(180deg)");
                break;
            case 2:
                break;
            case 4://未知
                $(".listRowToleft").css("display", "none")
                parent.parent.cdkc.alert.warning('未知流向！')
                break;
            case 0://没有流向
                $(".listRowToleft").css("display", "none")
                parent.parent.cdkc.alert.warning('无流向数据！')
                break;
            default:
                $(".listRowToleft").css("display", "none")
                parent.parent.cdkc.alert.warning('未定义流向！')
                break;
        }
    }

}

function lineColor(type, subtype) {
    switch (type) {
        // default: name=name;break;
        case "CD":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#FF0000 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#FF0000 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#FF0000 ,rgb(5, 5, 5))");
            break;
        case "DL":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#FF0000 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#FF0000 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#FF0000 ,rgb(5, 5, 5))");
            break;
        case "CH,DX":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#00FF00 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#00FF00 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#00FF00 ,rgb(5, 5, 5))");
            break;
        case "DX":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#00FF00 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#00FF00 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#00FF00 ,rgb(5, 5, 5))");
            break;
        case "CQ,RQ":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#FF00FF ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#FF00FF ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#FF00FF ,rgb(5, 5, 5))");
            break;
        case "RQ":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#FF00FF ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#FF00FF ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#FF00FF ,rgb(5, 5, 5))");
            break;
        case "CS,JS":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#00FFFF ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#00FFFF ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#00FFFF ,rgb(5, 5, 5))");
            break;
        case "JS":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#00FFFF ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#00FFFF ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#00FFFF ,rgb(5, 5, 5))");
            break;
        case "CT":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#00FF00 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#00FF00 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#00FF00 ,rgb(5, 5, 5))");
            break;
        case "CY,GY,QT,ZH":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#999999 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#999999 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#999999 ,rgb(5, 5, 5))");
            break;
        case "GY":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#999999 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#999999 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#999999 ,rgb(5, 5, 5))");
            break;
        case "QT":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#999999 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#999999 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#999999 ,rgb(5, 5, 5))");
            break;
        case "ZH":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#999999 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#999999 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#999999 ,rgb(5, 5, 5))");
            break;
        case "PS":
            {
                if (subtype) {
                    switch (subtype) {
                        case "YS":
                            $("#showLine").css("background", "-webkit-linear-gradient(top,#489CDD ,rgb(	25,25,112))");
                            $("#rightBot").css("background", "-webkit-linear-gradient(right,#489CDD ,rgb(	25,25,112))");
                            $("#leftBot").css("background", "-webkit-linear-gradient(left,#489CDD ,rgb(	25,25,112))");
                            break;
                        case "WS":
                            $("#showLine").css("background", "-webkit-linear-gradient(top,#FB1200 ,rgb(5, 5, 5))");
                            $("#rightBot").css("background", "-webkit-linear-gradient(right,#FB1200 ,rgb(5, 5, 5))");
                            $("#leftBot").css("background", "-webkit-linear-gradient(left,#FB1200 ,rgb(5, 5, 5))");
                            break;
                    }
                }
                else {
                    $("#showLine").css("background", "-webkit-linear-gradient(top,#4c3926 ,rgb(5, 5, 5))");
                    $("#rightBot").css("background", "-webkit-linear-gradient(right,#4c3926 ,rgb(5, 5, 5))");
                    $("#leftBot").css("background", "-webkit-linear-gradient(left,#4c3926 ,rgb(5, 5, 5))");
                }
            }
            break;
        case "RL":
            $("#showLine").css("background", "-webkit-linear-gradient(top,#ff8000 ,rgb(5, 5, 5))");
            $("#rightBot").css("background", "-webkit-linear-gradient(right,#ff8000 ,rgb(5, 5, 5))");
            $("#leftBot").css("background", "-webkit-linear-gradient(left,#ff8000 ,rgb(5, 5, 5))");
            break;
    }
}
