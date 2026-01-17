[English](https://github.com/Hgnim/markdown-pane/blob/main/README.md) | [简体中文](https://github.com/Hgnim/markdown-pane/blob/main/doc/README.md)

# Markdown Pane

特点：

- 以`Markdown`为基础，在单页面内显示多个窗格，每个窗格都使用`Markdown`语法。
- 保留了`Markdown`的功能。
- 可定义每个窗格的位置

使用场景：

- 计划版
- 为一篇文章贴上便签
- 更多……

## 演示

[演示页面](https://hgnim.github.io/markdown-pane/)\
[预览工具](https://litoolhub.hgnim.mjyy.top/#/tool/markdownpane)

## 使用

### 安装

使用npm安装

- 局部安装

  ```sh
  npm i markpane
  ```

- 全局安装
  
  ```sh
  npm i -g markpane
  ```

使用cdn

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/markpane/dist/markpane.umd.min.js"></script>
</head>
```

### CLI

> 如果使用全局安装(`npm i -g markpane`)，则可以直接使用`markpane`命令

```sh
$ npx markpane parse _test/test.mdp
<div style="position:relative;overflow:scroll;width:100%;height:100%;">
<div>
<h1>test</h1>
</div>
<div>
</div>

</div>
$ npx markpane parseJson _test/test.mdp
{
  "panes": [
    {
      "x": null,
      "y": null,
      "width": null,
      "height": null,
      "zIndex": null,
      "id": null,
      "class": [],
      "markdown": "# test",
      "html": "<h1>test</h1>\n"
    },
    {
      "x": null,
      "y": null,
      "width": null,
      "height": null,
      "zIndex": null,
      "id": null,
      "class": [],
      "markdown": "",
      "html": ""
    }
  ]
}
```

### CDN引用

```html
<body>
    <div id="container"></div>
    <script src="https://cdn.jsdelivr.net/npm/markpane/dist/markpane.umd.min.js"></script>
    <script>
        document.getElementById('container').innerHTML = markpane.parse('---\n# test\n---');
    </script>
</body>
```

### Module

#### CDN引用

```html
<body>
    <div id="container"></div>
    <script>
        import markpane from "https://cdn.jsdelivr.net/npm/markpane@latest/dist/markpane.esm.min.js";
        document.getElementById('container').innerHTML = markpane.parse('---\n# test\n---');
    </script>
</body>
```

#### NPM

```js
import markpane from "markpane";
document.getElementById('container').innerHTML = markpane.parse('---\n# test\n---');
```

## Markdown Pane 语法

与`Markdown`语法一致

新增语法：

```markdown
---<x> <y> <width> <height> <zIndex> <id> <class>
# Markdown Pane
---
```

所有参数均为可选参数

- `x`：面板距离左侧的距离
- `y`：面板距离顶部的距离
- `width`：面板宽度
- `height`：面板高度
- `zIndex`：面板堆叠顺序
- `id`：面板容器的id
- `class`：面板容器的class
