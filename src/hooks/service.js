export var service = service || {};
service.version = "1.0";
service.name = "通用常用方法类库";
// service.axios

// 查询数据
export const queryFeats = (url, params) => {
    url += '/query?'
    console.log('url :>> ', url);
    console.log('params :>> ', params);
//     fetch('http://example.com/movies.json')
//   .then(response => response.json())
//   .then(data => console.log(data));
}