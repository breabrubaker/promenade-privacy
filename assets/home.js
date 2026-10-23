// Computer only: the postcards sit in a pile. Pointing at the pile shuffles
// through it, a postcard every 2.2 seconds, and stops when the pointer leaves.
// Clicking (or Enter) flips one at a time. Nothing moves on its own.
(function () {
  var wide = window.matchMedia("(min-width: 900px)");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)");
  var section = document.querySelector(".features");
  if (!section) return;
  var cards = Array.prototype.slice.call(section.querySelectorAll(".card"));
  var next = section.querySelector(".pile-next");
  var order = cards.map(function (_, n) { return n; });   // order[0] is on top
  var timer = null, busy = false, hovering = false;

  function paint() {
    order.forEach(function (cardIndex, depth) {
      var c = cards[cardIndex];
      c.setAttribute("data-depth", depth);
      c.setAttribute("aria-hidden", String(depth !== 0));
    });
    next.setAttribute("aria-label", "Next postcard, now showing " + cards[order[0]].querySelector("h2").textContent);
  }
  function flip() {
    if (busy) return;
    busy = true;
    var top = cards[order[0]];
    top.classList.add("leaving");
    setTimeout(function () {
      order.push(order.shift());
      top.classList.remove("leaving");
      paint();
      busy = false;
      if (hovering) timer = setTimeout(flip, 2200);
    }, still.matches ? 0 : 520);
  }

  next.addEventListener("click", function () { flip(); });
  next.addEventListener("mouseenter", function () {
    if (!wide.matches) return;
    hovering = true; clearTimeout(timer); timer = setTimeout(flip, 500);
  });
  next.addEventListener("mouseleave", function () { hovering = false; clearTimeout(timer); });

  function setup() {
    if (wide.matches) { section.classList.add("pile"); paint(); }
    else {
      section.classList.remove("pile"); hovering = false; clearTimeout(timer);
      cards.forEach(function (c) { c.removeAttribute("data-depth"); c.removeAttribute("aria-hidden"); });
    }
  }
  wide.addEventListener("change", setup);
  setup();
})();
