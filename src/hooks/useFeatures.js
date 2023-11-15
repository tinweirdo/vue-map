import axios from 'axios';
import { ref } from "vue";

export function useFeatures(url, where) {
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

export function usetestJson(type) {
    const data = ref([]);
    let url = "../../public/projdata"
    if (type === "line") {
        url += "/lines.json"
    }
    else if (type === "point") {
        url += "/points.json"
    }
    axios.get(url).then(res => {
        data.value = res.data
    });

    return data;
}
