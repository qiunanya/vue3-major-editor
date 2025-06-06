### magic-editor-vue3

#### A vue3 high quality rich text editor.

```js
// 1. 获取文档中的字符位置（从0开始计数）
const { from, to } = editor.state.selection;
console.log('editor:', editor)
console.log("光标起始位置:", from, "结束位置:", to);
// 2. 获取光标所在屏幕坐标
const coords = editor.view.coordsAtPos(from);
console.log("屏幕坐标:", coords);
// 3. 获取光标所在的节点信息
const node = editor.state.doc.nodeAt(from);
console.log("所在节点类型:", node);
const { $from } = editor.state.selection;
const nodeType = $from.parent.type.name;
console.log('节点类型:', nodeType, $from.parent);
console.log('$from信息:', $from);
// 通过坐标获取 DOM 元素
const domElement = document.elementFromPoint(coords.left, coords.top);
console.log('DOM 元素:', domElement?.parentNode?.nodeName);
// 方法 1：向上查找表格
function getCurrentTable() {
    let depth = $from.depth;
    while (depth > 0) {
    const node = $from.node(depth);
    // if (node.type.name === 'table') {
    //   return node;
    // }
    console.log('当前节点:', node.type.name);
    depth--;
    }
    return null;
}
const table = getCurrentTable();
console.log('所在表格:', table);
````