import axios from 'axios';

// 点线数据获取
export const queryFeatures = async (url, where) => {
    if (!where) where = '1=1';
    const res = await axios.get(`${url}/query`, {
        params: { where }
    })
    return res.data.features;
}