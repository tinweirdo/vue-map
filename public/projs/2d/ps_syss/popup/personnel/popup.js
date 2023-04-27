$(function () {
  // show_charts()
  // show_linecharts()

  // initData();
  // bindview();
  // queryEntity()
});

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
  String.EscapeChar = "'";

  /// <summary>
  /// 替换所有字符串
  /// </summary>
  /// <param name="searchValue">检索值</param>
  /// <param name="replaceValue">替换值</param>
  String.prototype.replaceAll = function (searchValue, replaceValue) {
    var regExp = new RegExp(searchValue, "g");
    return this.replace(regExp, replaceValue);
  };

  /// <summary>
  /// 格式化字符串
  /// </summary>
  String.prototype.format = function () {
    var regexp = /\{(\d+)\}/g;
    var args = arguments;
    var result = this.replace(regexp, function (m, i, o, n) {
      return args[i];
    });
    return result.replaceAll("%", String.EscapeChar);
  };
})();

var id = getQueryString("id");
var id2 = getQueryString("globalId");
var url = getQueryString("url");
url=url+'/query';
console.log(url);
XJDPopup(id)
var name = null;
var globalId;
let mainDiv = document.getElementById("context");
let html = "<table width='100%' height='100%'   >";
async function SETURL(globalId,path){
  if(path) {
    url= new URL(path,url)
  }
  else(
    url= new URL(url)
  )
  url.pathname
  url.searchParams.set('returnGeometry', true); 
  url.searchParams.set('where', `"globalId"='${globalId}'`); 
  url.searchParams.set('outSr', 4326); 
  url.searchParams.set('outFields', '*'); 
  url.searchParams.set('whereEncryption', true); 
  url.searchParams.set('f', 'json'); 
  return url
}
async function XJDPopup(xjdid){
  let url=await SETURL(xjdid)
  let response = await fetch(url)
  results=await response.json();
  var feaSet = results.features;
  if (feaSet.length > 0) {
    //number,name,task
    /*
    add: "地址"
    contact: "联系方式"
    created_date: "创建时间"
    created_user: "创建用户"
    created_user_id: "创建用户Id"
    dept: "职务"
    desc: "备注"
    globalId: "全局唯一Id"
    id: "序号"
    last_edited_date: "最近更新时间"
    last_edited_user: "最近更新用户"
    last_edited_user_id: "最近更新用户Id"
    name: "名称"
    objectId: "唯一Id"
    six: "性别"
    status: "状态"
     */
    var getpopup = feaSet[0];
    $.getJSON("popup.json","",function(jsondata){
      let html = "<table width='100%' height='100%'   >";
      for (var i = 0; i < jsondata.fields.length; i++) {
        var name = jsondata.fields[i].field.name;
        var alias = jsondata.fields[i].field.alias;
        var unit = jsondata.fields[i].field.unit;
        {
            var value = jsondata.fields[i].field.value;
            if (value) {
                html += "<tr><td  width='90px'>" + alias + ":</td><td>" + value + "</td></tr>";
            } else {
                if (unit != null && unit != undefined && unit != '')
                    html += "<tr><td  width='90px'>" + alias + ":</td><td>" + getpopup.attributes[name] + " " + unit + "</td></tr>";
                else{
                    if(getpopup.attributes[name]){
                        html += "<tr><td  width='110px'>" + alias + ":</td><td>" + getpopup.attributes[name] + "</td></tr>";
                    }
                }
            }
        }
        html += "</table>";
        $("#the_tbody").html(html)
    }
    })
  }
}

/*this.parent.L.esri
  .query({
    url: url,
  })
  .where('"globalId"=' + "'" + id + "'")
  .run(function (error, results) {
    console.log(results)

    if (results == null) return;

    var feaSet = results.features;
    if (feaSet.length > 0) {
      // add: "地址"
      // contact: "联系方式"
      // created_date: "创建时间"
      // created_user: "创建用户"
      // created_user_id: "创建用户Id"
      // dept: "职务"
      // desc: "备注"
      // globalId: "全局唯一Id"
      // id: "序号"
      // last_edited_date: "最近更新时间"
      // last_edited_user: "最近更新用户"
      // last_edited_user_id: "最近更新用户Id"
      // name: "名称"
      // objectId: "唯一Id"
      // six: "性别"
      // status: "状态"
      var getpopup = feaSet[0];
      $.getJSON("popup.json","",function(jsondata){
        let html = "<table width='100%' height='100%'   >";
        for (var i = 0; i < jsondata.fields.length; i++) {
          var name = jsondata.fields[i].field.name;
          var alias = jsondata.fields[i].field.alias;
          var unit = jsondata.fields[i].field.unit;
          {
              var value = jsondata.fields[i].field.value;
              if (value) {
                  html += "<tr><td  width='90px'>" + alias + ":</td><td>" + value + "</td></tr>";
              } else {
                  if (unit != null && unit != undefined && unit != '')
                      html += "<tr><td  width='90px'>" + alias + ":</td><td>" + getpopup.properties[name] + " " + unit + "</td></tr>";
                  else{
                      if(getpopup.properties[name]){
                          html += "<tr><td  width='110px'>" + alias + ":</td><td>" + getpopup.properties[name] + "</td></tr>";
                      }
                  }
              }
          }
          html += "</table>";
          $("#the_tbody").html(html)
      }
      })
      // $("#globalId").text(getpopup.properties.globalId);
      // $("#name").text(getpopup.properties.name);
      // $("#six").text(getpopup.properties.six);
      // $("#status").text(getpopup.properties.status);
      // $("#add").text(getpopup.properties.add);
      // $("#dept").text(getpopup.properties.dept);
      // $("#desc").text(getpopup.properties.desc);
      // $("#contact").text(getpopup.properties.contact);
      // $("#contact").text(getpopup.properties.contact);
      // $("#last_edited_date").text(getpopup.properties.last_edited_date);
      // var arr = Object.keys(getpopup.properties);
      
      // let html;
      // for(let i=0;i<arr.length;i++){
      //   $(`#${arr[i]}`).text(getpopup.properties[arr[i]])
      //   html+=
      //   `<tr>
      //   <td width="90px"><span>${arr[i]}</span></td>
      //   <td id="${arr[i]}">${getpopup.properties[arr[i]]}</td>
      //   </tr>`
      // }
      // $("#the_tbody").html(html)
    }
  });*/






