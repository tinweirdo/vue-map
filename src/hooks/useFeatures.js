import axios from 'axios';
import { shallowRef } from "vue";

export function useFeatures(type) {
    const data = shallowRef([]);
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

