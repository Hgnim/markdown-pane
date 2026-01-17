[English](https://github.com/Hgnim/markdown-pane/blob/main/README.md) | [简体中文](https://github.com/Hgnim/markdown-pane/blob/main/doc/README.md)

# Markdown Pane

> Warning: This page is translated by MACHINE, which may lead to POOR QUALITY or INCORRECT INFORMATION, please read with CAUTION!


Features:

- to `Markdown` based on the display of multiple panes within a single page, each using `Markdown` syntax.
- Reserved `Markdown` the function.
- You can define the position of each pane

Use Scenario:

- Planned version
- Paste a note for an article
- More......

## Demo

 [Demo Page](https://hgnim.github.io/markdown-pane/)\
 [Preview Tool](https://litoolhub.hgnim.mjyy.top/#/tool/markdownpane)

## Use

### Installation

Install with npm

- Partial installation

```sh
  npm i markpane
  ```

- Global Installation
  
```sh
  npm i -g markpane
  ```

using cdn

```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/markpane/dist/markpane.umd.min.js"></script>
</head>
```

### CLI

> If you use a global installation (`npm i -g markpane`), you can use it directly `markpane` command

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

### Browser

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

#### Browser

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

## Markdown Pane syntax

with `Markdown` syntax Consistent

New syntax:

```markdown
---<x> <y> <width> <height> <zIndex> <id> <class>
# Markdown Pane
---
```

All parameters are optional

- `x`: The distance of the panel from the left
- `y`: The distance of the panel from the top
- `width`: Panel width
- `height`: Panel height
- `zIndex`: Panel stacking order
- `id`: id of the panel container
- `class` the class of the panel container
