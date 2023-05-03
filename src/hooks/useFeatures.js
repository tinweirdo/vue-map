import axios from 'axios';
import { ref } from "vue";

export default function useFeatures(url, where) {
    if (!where) where = '1=1';
    const data = ref([])
    axios.get(`${url}/query`, {
        params: { where }
    })
    .then(res => {
        data.value = res.data.features
    });

    return data;
}