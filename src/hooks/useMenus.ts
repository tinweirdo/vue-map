import axios from 'axios';
import { shallowRef } from "vue";
import { ElMessage } from 'element-plus';

interface MenuSchemaConfig {
    /**
     * @zh 菜单id
     */
    id?: string;
    /**
     * @zh 菜单名称
     */
    name?: string;
    /**
     * @zh 菜单类型
     */
    type?: string;
    /**
     * @zh 是否显示
     */
    display?: boolean;
    /**
     * @zh 图表
     */
    icon?: string;
    /**
     * @zh 模块地址
     */
    url?: string;
    /**
     * @zh 配置文件地址
     */
    configFile?: string;
    /**
     * @zh 窗口参数
     */
    windowOptions?: WindowOptionsSchemaConfig;
    /**
     * @zh 是否自启动
     */
    openAtStart?: boolean;
    /**
     * @zh 子集
     */
    children?: MenuSchemaConfig[];
}
interface WindowOptionsSchemaConfig {
    /**
     * @zh 宽度
     */
    width?: number;
    /**
     * @zh 高度
     */
    height?: number;
    /**
     * @zh 绝对位置
     */
    position?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    };
    /**
     * @zh 是否开启最大最小化
     */
    maxMin?: boolean;
    /**
     * @zh 是否开启自定义尺寸
     */
    resize?: boolean;
}

const data = shallowRef([]);
const menuConfig = {};
export function useMenus(app) {
    axios.get("projdata/menus.json").then(res => {
        const filter: MenuSchemaConfig[] = [];
        for (const menu1 of res.data) {
            if (!menu1.display) continue;
            if (!menu1.children?.length) continue;
            for (const menu2 of menu1.children) {
                menuConfig[menu2.id.split("-")[1]] = menu2
            }
            filter.push(menu1)
        }
        // 注册组件
        registerMenuComponents(app);
        data.value = filter;
    })
    return data;
}

export const menuComponents = [];
function registerMenuComponents(app) {
    const componentFiles = import.meta.globEager('../components/Menus/*/*.vue');
    Object.keys(componentFiles).forEach((fileName) => {
        const componentConfig = componentFiles[fileName];
        const componentName = fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');
        menuComponents.push({ name: componentName, config: menuConfig[componentName] });
        app.component(componentName, componentConfig.default || componentConfig);
    });
}

// 打开菜单
export const openWidget = (app, key) => {
    const config = menuComponents.find(ele => ele.config.id === key)?.config;
    const componentName = menuComponents.find(ele => ele.config.id === key)?.name
    if (!config) {
        ElMessage.error("未配置该模块！")
        return;
    }
    const { noTitle, maxMin, closeBtn, resize } = config.windowOptions;
    const component = app.component(componentName);
    const area = getArea(config.windowOptions);
    const offset = getOffset(area, config.windowOptions);
    const layerConfig = {
        id: "Widget-" + config.id,
        type: 2, // page 层类型
        area: area,
        offset: offset,
        title: noTitle === true ? false : config.name,
        shade: 0, // 遮罩透明度
        shadeClose: false, // 点击遮罩区域，关闭弹层
        maxmin: maxMin ? true : false, // 允许全屏最小化
        anim: 0, // 0-6 的动画形式，-1 不开启
        closeBtn: closeBtn ? 1 : 0,
        resize: resize === false ? false : true,
        tipsMore: false,
        content: ""
    }
    layer.open(layerConfig);
}


function getArea(windowOptions) {
    const area = []
    let { width, height } = windowOptions;
    let { top, bottom, left, right } = windowOptions.position;
    if (width) {
        area.push(width + "px")
    }
    else {
        if (left && right) {
            let _width = window.innerWidth - left - right
            area.push(_width + "px")
        }
        else {
            area.push("auto")
        }
    }
    if (height) {
        area.push(height + "px")
    }
    else {
        if (top && bottom) {
            let _height = window.innerHeight - top - bottom
            area.push(_height + "px")
        }
        else {
            area.push("auto")
        }
    }
    return area
}


function getOffset(area, windowOptions) {
    const offset = []
    const [width, height] = area.map(ele => Number(ele.split("px")[0]))
    let { left, right, top, bottom } = windowOptions.position;
    if (top) {
        offset.push(top + "px")
    }
    else if (bottom) {
        if (isNaN(height)) offset.push("")
        else {
            let _top = window.innerHeight - bottom - height;
            offset.push(_top + "px")
        }
    }

    if (left) {
        offset.push(left + "px")
    }
    else if (right) {
        if (isNaN(width)) offset.push("")
        else {
            let _right = window.innerWidth - right - width;
            offset.push(_right + "px")
        }
    }
    return offset
}




