const p = (e, a = "YYYY-MM-DD HH:mm:ss") => {
  const t = new Date(e), r = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), s = String(t.getDate()).padStart(2, "0"), c = String(t.getHours()).padStart(2, "0"), o = String(t.getMinutes()).padStart(2, "0"), g = String(t.getSeconds()).padStart(2, "0");
  return a.replace("YYYY", String(r)).replace("MM", n).replace("DD", s).replace("HH", c).replace("mm", o).replace("ss", g);
}, S = {
  formatDate: p
};
export {
  S as default
};
