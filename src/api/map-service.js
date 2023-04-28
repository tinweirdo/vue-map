import axios from 'axios';

// 点线数据获取
export const queryFeatures = async (url, where) => {
    if (!where) where = '1=1';
    const res = await axios.get(`${url}/query`, {
        params: { where }
    })
    return res.data.features;
}

export const featureDic = {
        "HK":"焊口",
        "WX":"维修",
        "WT":"弯头",
        "RQ":"燃气",
        "BS":"变深",
        "JT":"接头",
        "DT":"多通",
        "JXJ":"检修井",
        "HFC":"化粪池",
        "XWD":"线位点",
        "JYJT":"绝缘接头",
        "MB":"盲板",
        "NSG":"凝水缸",
        "FP":"非普查",
        "BJ":"变径",
        "3T":"三通",
        "4T":"四通",
        "ZZ":"转折",
        "ZX":"直线",
        "RH":"入户",
        "JF":"阀门",
        "JFJ":"阀门井",
        "FZ":"分支",
        "YLK":"预留口",
        "JJ":"检修井",
        "WJ":"污井",
        "JBD":"井边点",
        "QZD":"起止点",
        "PWJ":"排污井",
        "SH":"隧道",
        "SYJ":"水源井",
        "SBJ":"水表井",
        "PQJ":"排气井",
        "PQ":"排气",
        "SB":"水表",
        "CD":"沉淀池",
        "GD":"供电",
        "XFS":"消防栓",
        "CSK":"出水口",
        "SH":"石化",
        "BC":"梁内",
}

export const subsideDic = {
        "HK":"焊口",
        "DT":"多通",
        "WX":"维修",
        "WT":"弯头",
        "RQ":"燃气",
        "BS":"变深",
        "JT":"接头",
        "JXJ":"检修井",
        "HFC":"化粪池",
        "XWD":"线位点",
        "JYJT":"绝缘接头",
        "MB":"盲板",
        "NSG":"凝水缸",
        "FP":"非普查",
        "BJ":"变径",
        "3T":"三通",
        "4T":"四通",
        "ZZ":"转折",
        "ZX":"直线",
}

export const typeDic = {
        "TR": "天然气",
        "MQ": "煤气",
        "RQ": "燃气",
        "JS": "给水",
        "PS": "排水",
        "DL": "电力",
        "JY": "军用",
        "YS": "雨水",
        "WS": "污水",
        "HS": "合水",
        "SS": "自来水",
        "XH": "交通信号",
        "LD": "路灯",
        "GD": "供电",
        "JK": "监控",
        "YD": "移动",
        "WT": "网通",
        "TT": "铁通",
        "LT": "联通",
        "DX": "电信",
        "DT": "电力通信",
        "DS": "电视",
        "CT": "长途通信",
        "TX": "通讯",
        "RS": "热水",
        "EX": "保密",
        "CS": "传输",
        "BM": "不明",
        "SY": "输油",
        "RL": "热力",
        "GY": "工业",
        "ZH": "综合",
}
