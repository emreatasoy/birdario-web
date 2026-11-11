// Author: E.Atasoy
// Üst bar gölgesi, görünürken beliren bölümler, dil seçimini hatırlama.
(() => {
  const top = document.querySelector('.top');
  const onScroll = () => top && top.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-in'));
  }

  // Elle seçilen dil kökten gelince de kullanılsın
  document.querySelectorAll('[data-lang]').forEach((a) => {
    a.addEventListener('click', () => {
      try { localStorage.setItem('lang', a.dataset.lang); } catch (_) {}
    });
  });

  // Dil menüsü dışarı tıklanınca kapanır
  const menu = document.querySelector('.lang');
  document.addEventListener('click', (e) => {
    if (menu && menu.open && !menu.contains(e.target)) menu.open = false;
  });
})();
