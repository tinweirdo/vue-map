const f_projid = 'ps_syss';
// 项目配置文件

const { config2d, config3d } = await getProjConfig(f_projid);

async function getProjConfig(projid) {
    const res = await new Promise((resolve, reject) => {
        const P1 = fetch('../../projs/2d/' + projid + '/2d.json').then(res => res.json());
        const P2 = fetch('../../projs/3d/' + projid + '/3d.json').then(res => res.json());
        Promise.all([P1, P2]).then(res => {
            resolve(res);
        })
    })
    return {
        config2d: res[0],
        config3d: res[1]
    };
}

export default {
    '2d': config2d,
    '3d': config3d
}