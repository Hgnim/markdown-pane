export interface mdpPane {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    id: string;
    class: string[];
    markdown: string;
    html: string;
}
export interface mdpJson{
    panes: mdpPane[];
}

/**
 * 解析.mdp文本内容为html字符串
 * @param content 内容
 * @param haveOuter 输出是否被一个div所包裹。默认为true
 * @return 返回html内容
 */
export function parseMdp(content:string, haveOuter?:boolean):string;
/**
 * 解析.mdp文本内容为结构化数据
 * @param content 内容
 * @return 返回json数据
 */
export function parseMdpJson(content:string):mdpJson;

export interface Markpane{
    parse:typeof parseMdp;
    parseJson:typeof parseMdpJson;
}
export const markpane:Markpane;

export default markpane;