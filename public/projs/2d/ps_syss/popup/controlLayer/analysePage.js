$(function () {
    bind();
    get_last_24()
    COD([
        [],
        []
    ]);
})

var query_where;
var globalId = parent.device_code;
const layerUrl = parent.layer_config[0].url;
//绑定事件
function bind() {
    $("#btn_Search").on("click", function () {
        let start_time = $("#start_time").val();
        let end_time = $("#end_time").val();
        let start_timestramp = new Date(start_time).getTime();
        let end_timestramp = new Date(end_time).getTime();
        if (start_timestramp > end_timestramp) return;
        start_time = new Date(start_timestramp).toLocaleString('chinese', { hour12: false });
        end_time = new Date(end_timestramp).toLocaleString('chinese', { hour12: false });
        query_where = `("globalId"='${globalId}') and (last_edited_date >= timestamp '${start_time}' and last_edited_date<timestamp '${end_time}' )`;
        StreamServer({
            where: query_where,
        }, function (res) {
            var data = [
                [],
                []
            ]
            for (var i of res) {
                data[0].push(i.last_edited_date)
                data[1].push(i.codmn)
            }
            COD(data)
        })
    })
}

function get_last_24() {
    var date = new Date()
    var time = date.toLocaleString('chinese', { hour12: false });
    time = time.split('/')
    if (time[1].length == 1) time[1] = 0 + time[1]
    time = time.join('-')
    var time1 = new Date(date.getTime() - 24 * 60 * 60 * 1000).toLocaleString('chinese', { hour12: false });
    time1 = time1.split('/')
    if (time1[2].length == 1) time1[2] = 0 + time1[2]
    time1 = time1.join('-');

    $("#start_time").val(new Date(date.getTime() - 24 * 60 * 60 * 1000).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-'));
    $("#end_time").val(new Date(date.getTime()).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-'));
    query_where = `"globalId"='${globalId}' and last_edited_date >= timestamp '${time1}' and last_edited_date<timestamp '${time}'`;
    StreamServer({
        where: query_where,
    }, function (res) {
        var data = [
            [],
            []
        ]
        for (var i of res) {
            data[0].push(i.last_edited_date)
            data[1].push(i.codmn)
        }
        COD(data)
    })

}

function StreamServer(param, cb) {
    $.getJSON(layerUrl + "/query", param, function (res) {
        var lists = []
        //处理数据
        $.each(res.features || [], function (inde, item) {
            lists.push(item.attributes)
        })
        lists.sort((a, b) => {
            const time1 = new Date(a.last_edited_date).getTime();
            const time2 = new Date(b.last_edited_date).getTime();
            return time1 - time2
        })
        lists = lists.filter(item => item.codmn)
        //处理数据
        cb && cb(lists)
    })
}

function COD(res) {
    var myChart = echarts.init(document.getElementById('echart_main'));
    option = {
        color: ['#06A1BE'],
        legend: {
            orient: 'horizontal',
            x:'center',      //可设定图例在左、右、居中
            y:'top',     //可设定图例在上、下、居中
            data: ["COD"],
            textStyle:{//图例文字的样式
                color:'white',
                fontSize:13
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: function (val) {
                return `${val[0].marker}COD: ${val[0].data} mg/L`
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        grid: {
            left: '1%',
            right: '7%',
            bottom: '4%',
            width: "auto", //图例宽度
            height: "auto", //图例高度
            containLabel: true
        },
        xAxis: {
            name: "时间",
            type: 'category',
            boundaryGap: false,
            data: res[0],
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#41454E'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            axisLabel: {//坐标轴刻度标签的相关设置。
                formatter: function (params) {
                    var newParamsName = "";// 最终拼接成的字符串
                    var paramsNameNumber = params.length;// 实际标签的个数
                    var provideNumber = 10;// 每行能显示的字的个数
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                    /**
                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                     */
                    // 条件等同于rowNumber>1
                    if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";// 表示每一次截取的字符串
                            var start = p * provideNumber;// 开始截取的位置
                            var end = start + provideNumber;// 结束截取的位置
                            // 此处特殊处理最后一行的索引值
                            if (p == rowNumber - 1) {
                                // 最后一次不换行
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                // 每一次拼接字符串并换行
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;// 最终拼成的字符串
                        }

                    } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                    }
                    //将最终的字符串返回
                    return newParamsName
                }

            }
        },
        yAxis: {
            name: "(mg/L)",
            type: 'value',
            scale: true,
            axisTick: {
                inside: true
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#41454E'
                }
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
        },
        series: [
            {
                name: "COD",
                itemStyle: { normal: { color: '#FF6600' } },
                data: res[1],
                type: 'line',
                smooth: true,
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                }

            }

        ]
    };
    myChart.setOption(option);
    window.onresize = function () {
        myChart.resize();
    }
}