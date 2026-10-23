// The phone menu: open and close it, and close it on Escape, on a tap outside,
// or when a link is chosen. Nothing else runs on the site.
(function () {
  var button = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  if (!button || !menu) return;

  function setOpen(open) {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Menu");
  }

  button.addEventListener("click", function () { setOpen(menu.hidden); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) { setOpen(false); button.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!menu.hidden && !menu.contains(e.target) && !button.contains(e.target)) setOpen(false);
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
})();
