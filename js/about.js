/* About page only. Shared features (menu, reveal, counters, popups) come from script.js */
(function () {
  const tl = document.querySelector('.timeline');

  if (tl) {
    const items = tl.querySelectorAll('.t-item');
    const fill = tl.querySelector('.tl-fill');

    // Cards slide in from alternating sides (left, right, left...)
    items.forEach((el, i) => el.classList.add(i % 2 === 0 ? 'from-left' : 'from-right'));

    // The coloured line grows as you scroll down the journey
    const grow = () => {
      const r = tl.getBoundingClientRect();
      const reached = innerHeight * 0.6 - r.top;
      const pct = Math.max(0, Math.min(1, reached / r.height));
      fill.style.height = pct * 100 + '%';
    };
    addEventListener('scroll', grow, { passive: true });
    addEventListener('resize', grow);
    grow();
  }

  // FAQ: opening one answer closes the others
  const faqs = document.querySelectorAll('.faq details');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));
})();