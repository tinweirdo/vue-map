$(function () {
    bind();
    getOrderList();
    getParams();
})

const globalId = parent.globalId;
const feature = parent.popfeature;
const cdkc = parent.top.cdkc;
const API_ROOT = 'https://kc3.kcgis.cn:52002/api/order?';
var isActivate = false;
const roleCode = JSON.parse(sessionStorage.getItem("kckj.user")).baseinfo.roleCodes;
//绑定事件
function bind() {
    // 激活远程
    $('#activation-btn').on('click', () => {
        if (roleCode != '管理员') {
            cdkc.alert.warning('您暂无控制权限!')
            return;
        }
        if (!feature.properties.orders) {
            cdkc.alert.warning('未获取该设备控制信息!')
            return;
        }
        const state = $('#activation-btn').attr('state');
        if (state === 'wjh') {
            $('#activation-btn').attr('state', 'yjh');
            $('#activation-btn').attr('src', 'images/yjh.png');
            $(".isisActive_alt span:nth-child(1)").addClass('active');
            $(".isisActive_alt span:nth-child(2)").removeClass('active');
            sendActivation(0);
        } else {
            $('#activation-btn').attr('state', 'wjh');
            $('#activation-btn').attr('src', 'images/wjh.png');
            $(".isisActive_alt span:nth-child(2)").addClass('active');
            $(".isisActive_alt span:nth-child(1)").removeClass('active');
            sendActivation(1);
        }
    });
}

function getOrderList() {
    if (!feature.properties.orders) {
        cdkc.alert.warning('未获取该设备命令信息！')
        return;
    }
    const orders = JSON.parse(feature.properties.orders);
    const controlOrders = orders.filter(el => (el.order_id != 0) & (el.order_id != 1));
    var menuHTML = '';
    controlOrders.forEach(ele => {
        const orderName = ele.order_name;
        menuHTML += `<li>
            <span class="controlDevice_title">${orderName.substring(4, orderName.length)}</span>
            <span id="orderid_${ele.order_id}" onclick="sendCtrlOrder(${ele.order_id})" class="controlDevice_btn">${orderName.substring(4, orderName.length)}</span>
            </li>`;
    });
    $('.info').before(menuHTML);
}

function sendActivation(order) {
    let successInfo;
    let errTip;
    if (order == 0) {
        successInfo = '远程激活成功！';
        errTip = '激活失败：';
    }
    if (order == 1) {
        successInfo = '远程退出成功！';
        errTip = '退出失败：';
    }

    fetch(`${API_ROOT}projectid=${globalId}&orderid=${order}`)
        .then(res => res.json())
        .then(res => {
            if (res.code == 0) {
                if (order == 0) isActivate = true;
                else isActivate = false;
                cdkc.alert.success(`${globalId + successInfo}`)
            }
            else cdkc.alert.error(`${errTip + res.message}!`);
        })
        .catch(console.error);
}

function sendCtrlOrder(order) {
    if (!isActivate) {
        cdkc.alert.error('请先激活远程！');
        return
    }
    $(`#orderid_${order}`).addClass('active').parent('li').siblings()
        .children('.controlDevice_btn').removeClass('active');

    fetch(`${API_ROOT}projectid=${globalId}&orderid=${order}`)
        .then(res => res.json())
        .then(res => {
            if (res.code == 0) cdkc.alert.success(`${res.message}!`)
            else cdkc.alert.error(`执行失败：${res.message}!`);
        })
        .catch(console.error);
}

function getParams() {
    //其他参数
    const info = feature.properties.info ? JSON.parse(feature.properties.info) : "";
    if (info) {
        const param_fields = info.Parameters;
        let tableHTML = `<table width='100%'>`;
        param_fields.forEach((item, i) => {
            const varible = "v" + i;
            let thisprop = feature.properties[varible];
            const alias = item.Parameter_name;
            const unit = item.Parameter_unit;
            if (unit) {
                thisprop = thisprop + " " + unit
            }
            if (thisprop && alias) {
                tableHTML += `<tr><td><span>${alias}:</td><td class=${i == 0 ? 'tohis' : ' '}>${thisprop}</td></tr>`;
            }
        });
        tableHTML +=`</table>`
        $('#param-table').append(tableHTML);
    }
}



