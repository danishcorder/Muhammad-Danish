(() => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const year = document.getElementById('current-year');

  const preferred = localStorage.getItem('portfolio-theme');
  if (preferred === 'light') body.classList.add('light-theme');
  if (!preferred && window.matchMedia?.('(prefers-color-scheme: light)').matches) body.classList.add('light-theme');

  const syncThemeButton = () => {
    if (!themeToggle) return;
    const light = body.classList.contains('light-theme');
    themeToggle.textContent = light ? '☾' : '◐';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  };
  syncThemeButton();

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    localStorage.setItem('portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark');
    syncThemeButton();
  });

  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(Boolean(open)));
    navToggle.textContent = open ? '×' : '☰';
  });

  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    if (navToggle) navToggle.textContent = '☰';
  }));

  if (year) year.textContent = String(new Date().getFullYear());

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveal.forEach(el => observer.observe(el));
  } else {
    reveal.forEach(el => el.classList.add('visible'));
  }
})();
