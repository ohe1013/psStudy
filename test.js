function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  b;
  Object.entries(node.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => $el.setAttribute(attr, value));
  const $el = document.createElement(node.type);
  node.childre.map(createElement).forEach((child) => $el.appendChild(child));
  return $el;
}

const state = [
  { id: 1, completed: false, content: "todo list item 1" },
  { id: 2, completed: true, content: "todo list item 2" },
];

const realDom = createElement(
  <div id="app">
    <ul>
      {state.map(({ completed, content }) => (
        <li class={completed ? "completed" : null}>
          <input type="checkbox" class="toggle" checked={completed} />
          {content}
          <button class="remove">삭제</button>
        </li>
      ))}
    </ul>
    <form>
      <input type="text" />
      <button type="submit">추가</button>
    </form>
  </div>
);

console.log(realDom);
