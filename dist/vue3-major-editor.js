import { openBlock as c, createElementBlock as n, createElementVNode as s, defineComponent as h, createVNode as r, unref as _, pushScopeId as l, popScopeId as p } from "vue";
const u = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "200",
  height: "200",
  class: "icon",
  viewBox: "0 0 1024 1024"
}, f = /* @__PURE__ */ s("path", { d: "M362.976 804.704h141.12c79.616 0 135.776-10.24 168.384-30.784 32.64-20.48 48.96-54.496 48.96-101.984 0-47.904-15.584-82.016-46.72-102.304-31.168-20.288-85.92-30.432-164.288-30.432H362.976zm0-345.152h132.832c60.16 0 104.768-9.728 133.76-29.12 29.056-19.456 43.552-49.44 43.552-90.048 0-38.4-13.12-67.872-39.392-88.384-26.272-20.48-64-30.752-113.12-30.752H362.976zM545.376 896H236.48c-14.816 0-25.92-3.872-33.344-11.648S192 864.928 192 849.376c0-17.28 15.04-44.672 50.24-44.672h20.96V221.248h-20.96c-32.64 0-46.4-28.928-46.4-46.624 0-15.104 3.776-26.656 11.424-34.656 7.616-8 18.624-11.968 33.024-11.968h266.336c89.824 0 158.24 17.792 205.248 53.44 47.04 35.584 70.56 87.296 70.56 155.072q0 51.168-21.6 89.376c-14.4 25.472-35.84 46.4-64.192 62.816 45.76 16.832 79.744 40.32 101.984 70.56S832 627.904 832 674.528q0 58.944-28.608 107.52c-19.072 32.352-45.952 58.88-80.704 79.616a232.6 232.6 0 0 1-69.28 26.24C628 893.312 591.968 896 545.376 896" }, null, -1), w = [
  f
];
function m(t, o) {
  return c(), n("svg", u, [...w]);
}
const v = { render: m }, g = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "200",
  height: "200",
  class: "icon",
  viewBox: "0 0 1024 1024"
}, x = /* @__PURE__ */ s("path", {
  fill: "#0B1D5E",
  d: "m828.31 0-20.375 89.672H674.079L478.625 934.328H612.48L592.106 1024H195.928l20.374-89.672H350.87L546.323 89.672H411.756L432.13 0z"
}, null, -1), H = [
  x
];
function E(t, o) {
  return c(), n("svg", g, [...H]);
}
const I = { render: E }, B = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [a, i] of o)
    e[a] = i;
  return e;
}, M = (t) => (l("data-v-7e4bf3c3"), t = t(), p(), t), V = /* @__PURE__ */ M(() => /* @__PURE__ */ s("button", { class: "btn" }, "Major-Editor777", -1)), b = h({
  name: "Vue3MajorEditor"
}), j = /* @__PURE__ */ Object.assign(b, {
  setup(t) {
    return (o, e) => (c(), n("div", null, [
      V,
      r(_(I)),
      r(_(v))
    ]));
  }
}), d = /* @__PURE__ */ B(j, [["__scopeId", "data-v-7e4bf3c3"]]);
d.install = (t) => {
  t.component("Vue3MajorEditor", d);
};
export {
  d as Vue3MajorEditor,
  d as default
};
