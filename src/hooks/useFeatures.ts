import axios from 'axios';
import { shallowRef } from "vue";

export function useFeatures(type) {
    const data = shallowRef([]);
    let url = ""
    if (type === "line") {
        url = "projdata/lines.json"
    }
    else if (type === "point") {
        url = "projdata/points.json"
    }
    axios.get(url).then(res => {
        data.value = res.data
    });

    return data;
}

