import { defineComponent as c, openBlock as o, createElementBlock as l, normalizeClass as u, createElementVNode as a, createCommentVNode as r, renderSlot as f } from "vue";
import './index.css';const m = ["disabled"], _ = {
  key: 0,
  class: "my-button__loading"
}, b = /* @__PURE__ */ c({
  __name: "index",
  props: {
    type: { default: "primary" },
    size: { default: "middle" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  setup(t) {
    return (n, e) => (o(), l("button", {
      class: u([
        "my-button",
        `my-button--${t.type}`,
        `my-button--${t.size}`,
        { "my-button--disabled": t.disabled },
        { "my-button--loading": t.loading }
      ]),
      disabled: t.disabled || t.loading
    }, [
      t.loading ? (o(), l("span", _, [...e[0] || (e[0] = [
        a("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 1024 1024",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          a("path", {
            d: "M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z",
            fill: "currentColor"
          })
        ], -1)
      ])])) : r("", !0),
      f(n.$slots, "default", {}, void 0, !0)
    ], 10, m));
  }
});
const y = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [d, i] of n)
    e[d] = i;
  return e;
}, s = /* @__PURE__ */ y(b, [["__scopeId", "data-v-1c02d3a1"]]), g = {
  install(t) {
    t.component("MyButton", s);
  }
}, p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: s,
  default: g
}, Symbol.toStringTag, { value: "Module" }));
const v = (t) => {
  Object.values(/* @__PURE__ */ Object.assign({ "./views/button/index.ts": p })).forEach((e) => {
    e.default && e.default.install && t.use(e.default);
  });
}, B = {
  install: v
};
export {
  g as Button,
  B as default
};
