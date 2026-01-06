const n2 = `
*Markdown in the normal position*\\
--- 50 50
# pane1
This is pane 1
- markdown
  - md
---
--- 200 5
# pane2
This is pane 2
> markdown
---
**Markdown in the normal position**
--- 400 80
> pane3
\`\`\`js
markpane.parse('# hello');
\`\`\`
---
***
> line in the normal position
`;

async function loadMdp(markpane) {
    document.getElementById('n1').innerHTML = markpane.parse((await (await fetch('../md/n1.mdp')).text()).toString());

    document.getElementById('n2').innerHTML = markpane.parse(n2);
}