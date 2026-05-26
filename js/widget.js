(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return;
  if (document.getElementById("peach-widget-frame")) return;

  var ORIGIN = (function () {
    var cs = document.currentScript;
    if (cs && cs.src) {
      try {
        return new URL(cs.src).origin;
      } catch (e) {}
    }
    return "";
  })();

  var iframe = document.createElement("iframe");
  iframe.id = "peach-widget-frame";
  iframe.title = "Peachweb help chat";
  iframe.src = ORIGIN + "/widget";
  iframe.setAttribute("allow", "clipboard-write");
  iframe.setAttribute("loading", "lazy");
  iframe.style.cssText = [
    "position:fixed",
    "bottom:0",
    "right:0",
    "width:168px",
    "height:64px",
    "border:0",
    "background:transparent",
    "color-scheme:normal",
    "z-index:2147483000",
  ].join(";");

  function mount() {
    if (!document.body) {
      setTimeout(mount, 20);
      return;
    }
    document.body.appendChild(iframe);
  }
  mount();

  window.addEventListener("message", function (e) {
    if (!iframe.contentWindow || e.source !== iframe.contentWindow) return;
    var data = e.data;
    if (!data || data.type !== "peach-resize") return;
    var w = Math.max(80, Math.min(1200, Number(data.w) || 220));
    var h = Math.max(60, Math.min(1200, Number(data.h) || 80));
    iframe.style.width = w + "px";
    iframe.style.height = h + "px";
  });
})();
