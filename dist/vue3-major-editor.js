import { defineComponent as a, openBlock as s, createElementBlock as d, pushScopeId as _, popScopeId as p, createElementVNode as i } from "vue";
const l = (o) => (_("data-v-df8c0c81"), o = o(), p(), o), u = /* @__PURE__ */ l(() => /* @__PURE__ */ i("button", { class: "btn" }, "Major-Editor", -1)), m = [
  u
], f = /* @__PURE__ */ a({
  name: "Vue3MajorEditor",
  __name: "index",
  setup(o) {
    return (e, t) => (s(), d("div", null, m));
  }
}), E = (o, e) => {
  const t = o.__vccOpts || o;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, c = /* @__PURE__ */ E(f, [["__scopeId", "data-v-df8c0c81"]]);
c.install = (o) => {
  o.component("Vue3MajorEditor", c);
};
export {
  c as Vue3MajorEditor,
  c as default
};
