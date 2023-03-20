var id = "", url = "", name = "";
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  console.log(reg)
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

$(document).ready(function () {
  id = kckjutil.system.getRequestByName('id')
  url = kckjutil.system.getRequestByName('url');
  // let where = '"objectId"=' + id;
  parent.L.esri.query({
    url: url
  }).where('"objectId"=' + id).run(function (error, results) {
    if (results == null) return;
    var feaSet = results.features;
    console.log(feaSet[0]);
    if (feaSet.length > 0) {
      var mainDiv = document.getElementById("context");
      getpopupHtml(feaSet[0], mainDiv);
      drawLine(feaSet[0]);
      //控制小数位数|单位
      new Promise((resolve) => {
        let gdInfo = feaSet[0].properties;
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
  });
})

function drawLine(feature) {
  var map = getMap();
  //二维矢量
  if (map) {
    if (!feature.geometry || !feature.geometry.coordinates) return;
    let coords = feature.geometry.coordinates
    let latlngs = [[coords[0][1], coords[0][0]], [coords[1][1], coords[1][0]]]
    var style = {
      color: "#ff9b00",
      weight: 8,
      opacity: 0.6
    }
    var polyline = parent.L.polyline(latlngs, style).addTo(map);
    // map.fitBounds(polyline.getBounds());

    const cb = () => {
      map.removeLayer(polyline);
      map.off('popupclose', cb)
    }
    map.on('popupclose', cb)
  }
  //三维矢量
  else {
    let viewer = window.top.document.querySelector("#iframe_entmain").contentWindow.viewer

  }
}

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

function getpopupHtml(feature, mainDiv) {
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
    const date1 = feature.properties.build_date ?? ''
    const date2 = feature.properties.update_time ?? ''
    html += "<tr><td  width='90px'>建设日期:</td><td>" + date1 + "</td></tr>"
    html += "<tr><td  width='90px'>维护时间:</td><td>" + date2 + "</td></tr>"

    html += "</table>";
    mainDiv.innerHTML = html;
    document.getElementById("popTitle").innerHTML = titlename;
    $('#context').mCustomScrollbar({
      axis: "y",
      theme: "minimal"
    })
  });
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

/**
 * 监听气泡iframe是否关闭，但是不起作用
*/
function bindClose() {
  const parent = window.parent
  const iframe = Array.from(parent.document.querySelectorAll('iframe')).find(iframe => iframe.contentWindow === window)
  parent.__observer__ = new MutationObserver((mutationsList, ob) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      }
    }
  })
  console.log('parent.document.body', parent.document.body);
  parent.__observer__.observe(parent.document.body, { childList: true })
  // $(".leaflet-popup-close-button", window.parent.document).click(function () {
  //   debugger
  // })
}
