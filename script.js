/* ========================================
   Page Transition (silky fade between pages)
   ======================================== */
document.addEventListener('click', (e) => {
  const link = e.target.closest('nav a');
  if (!link || link.classList.contains('active')) return;

  // Only intercept same-origin navigations
  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;

  e.preventDefault();
  document.body.classList.add('page-leave');

  // Wait for fade-out, then navigate
  setTimeout(() => {
    window.location.href = link.href;
  }, 280);
});

/* ========================================
   Scroll Reveal (rises into view smoothly)
   ======================================== */
window.addEventListener('DOMContentLoaded', () => {
  // Slight delay so body fade-in is underway before sections animate
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }, 150);
});
