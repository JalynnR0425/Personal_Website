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

/* ========================================
   Project Tabs (click to switch category)
   ======================================== */
window.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.tab-panel');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (!target) return;

      // Update buttons
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      panels.forEach(panel => {
        if (panel.id === target) {
          panel.classList.add('active');

          // Re-trigger scroll-reveal for newly shown content
          panel.querySelectorAll('.scroll-reveal').forEach(el => {
            el.classList.add('visible');
          });
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
});
