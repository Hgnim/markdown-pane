import {marked} from "marked";

//默认值
const MdpJsonDefault = {
    x: null,
    y: null,
    width: null,
    height: null,
    zIndex: null,
    id: null,
    class: [],
    markdown: '',
    html: '',
};
/**
 * 解析.mdp文本内容为html字符串
 * @param {string} content 内容
 * @param {boolean} haveOuter 输出是否被一个div所包裹。默认为true
 * @return {string} 返回html内容
 */
export function parseMdp(content, haveOuter=true){
    const parJson=parseMdpJson(content);
    let result='';
    parJson.panes.forEach(pane => {
        const styles = [];
        let haveStyle = false;
        {
            let hasAbso = false;
            function addAbso() {
                if (!hasAbso) {
                    styles.push('position:absolute;');
                    hasAbso = true;
                }
            }
            if (pane.x != undefined && pane.x != null) {
                styles.push(`left:${pane.x}px;`);
                addAbso();
                haveStyle = true;
            }
            if (pane.y != undefined && pane.y != null) {
                styles.push(`top:${pane.y}px;`);
                addAbso();
                haveStyle = true;
            }
        }
        if (pane.width != undefined && pane.width != null) {
            styles.push(`width:${pane.width}px;`);
        }
        if (pane.height != undefined && pane.height != null) {
            styles.push(`height:${pane.height}px;`);
            haveStyle = true;
        }
        if (pane.zIndex != undefined && pane.zIndex != null) {
            styles.push(`z-index:${pane.zIndex};`);
            haveStyle = true;
        }
        const style = (() => {
            if (haveStyle) {
                let stys = '';
                styles.forEach(s => {
                    stys += s;
                });
                return ` style="${stys}"`;
            } else
                return '';
        })();
        const id=(()=>{
            if (pane.id!=undefined&&pane.id!=null)
                return ` id="${pane.id}"`;
            else
                return '';
        })();
        const classList=(()=>{
            let cls='';
            if (pane.class.length>0){
                pane.class.forEach(c=>{
                    cls+=c+' ';
                });
                return ` class="${cls}"`;
            }
            else
                return '';
        })();

        result+=`<div${id}${classList}${style}>\n${pane.html}</div>\n`;
    });
    if (haveOuter)
        return `<div style="position:relative;overflow:scroll;width:100%;height:100%;">\n${result}\n</div>`;
    else
        return result;
}
/**
 * 解析.mdp文本内容为结构化数据
 * @param {string} content 内容
 * @returns {object} 返回json数据
 */
export function parseMdpJson(content) {
    const result = { panes: [] };
    const lines = content.split('\n');

    //面板数据
    let pane = null;
    //markdown内容
    let mdContent = [];
    let mdOtherContent = [];
    function savePane(mdContent_){
        pane.markdown = mdContent_.join('\n').trim();
        pane.html = marked.parse(pane.markdown);
        result.panes.push(structuredClone(pane)/*深拷贝*/);
        pane=null;
    }
    for (const line of lines) {
        const lineTrim = line.trim();

        if (lineTrim.startsWith('---')) {
            if (pane) {//面板结束，保存
                savePane(mdContent);
            }
            else {//开始面板
                pane = parseHeader(lineTrim.slice(3).trim());
                mdContent = [];
            }
            continue;
        }

        if (pane)
            mdContent.push(line);
        else
            mdOtherContent.push(line);
    }
    if (pane) {//如果还有数据则最后保存
        savePane(mdContent);
    }
    pane = structuredClone(MdpJsonDefault);
    savePane(mdOtherContent);

    return result;
}

/**
 * 解析头部参数字符串
 * @param {string} argsStr 参数字符串
 */
function parseHeader(argsStr) {
    const result = structuredClone(MdpJsonDefault/*深拷贝默认值，避免更改默认值*/);
    {
        const ast=argsStr.trim();
        if (!ast || ast==='') return result;
    }

    if (argsStr.includes('=')) {//赋值语句引入参数(key=value)
        for (
            const [, key, value]
            of argsStr.matchAll(/(\w+(?:-\w+)?)=("[^"]*"|'[^']*'|[^\s"']+)/g)
            ) {
            //处理后的值
            let valueProced = value;
            if (//去除可能包含的引号
                (valueProced.startsWith('"') && valueProced.endsWith('"')) ||
                (valueProced.startsWith("'") && valueProced.endsWith("'"))
            ) {
                valueProced = valueProced.slice(1, -1);
            }

            switch (key) {
                case 'x':
                    result.x = parseInt(valueProced) ?? MdpJsonDefault.x;
                    break;
                case 'y':
                    result.y = parseInt(valueProced) ?? MdpJsonDefault.y;
                    break;
                case 'w':
                case 'width':
                    result.width = parseInt(valueProced) ?? MdpJsonDefault.width;
                    break;
                case 'h':
                case 'height':
                    result.height = parseInt(valueProced) ?? MdpJsonDefault.height;
                    break;
                case 'z':
                case 'z-index':
                    result.zIndex = parseInt(valueProced) ?? MdpJsonDefault.zIndex;
                    break;
                case 'id':
                    result.id = valueProced ?? MdpJsonDefault.id;
                    break;
                case 'class':
                    result.class = valueProced.split(/\s+/).filter(Boolean) ?? MdpJsonDefault.class;
                    break;
            }
        }
    } else {//按顺序引入参数
        const args = argsStr.trim().split(/\s+/);

        for(let index=0;index<args.length;index++){
            switch (index){
                case 0:
                    result.x = parseInt(args[index]) ?? MdpJsonDefault.x;
                    break;
                case 1:
                    result.y = parseInt(args[index]) ?? MdpJsonDefault.y;
                    break;
                case 2:
                    result.width = parseInt(args[index]) ?? MdpJsonDefault.width;
                    break;
                case 3:
                    result.height = parseInt(args[index]) ?? MdpJsonDefault.height;
                    break;
                case 4:
                    result.zIndex = parseInt(args[index]) ?? MdpJsonDefault.zIndex;
                    break;
                case 5: {
                    const idAndClass = args.slice(index);
                    for (let i = 0; i < idAndClass.length; i++) {
                        if (i === 0)
                            result.id = idAndClass[0] ?? MdpJsonDefault.id;
                        else if (idAndClass[i])
                            result.class.push(idAndClass[i]);
                    }
                }
                    break;
            }
        }
    }
    return result;
}

export const markpane = {
    parse: (content, haveOuter = true) => {
        return parseMdp(content, haveOuter);
    },
    parseJson: (content) => {
        return parseMdpJson(content);
    },
}

export default markpane;