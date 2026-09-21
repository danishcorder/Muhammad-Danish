const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.nav-links');
try {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light' || (!savedTheme && matchMedia('(prefers-color-scheme: light)').matches)) body.classList.add('light-theme');
} catch {}
function syncTheme() { const light = body.classList.contains('light-theme'); themeButton.textContent = light ? '☾' : '◐'; themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme'); }
syncTheme();
themeButton.addEventListener('click', () => { body.classList.toggle('light-theme'); try { localStorage.setItem('portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark'); } catch {} syncTheme(); });
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); menuButton.querySelector('span').textContent = '☰'; }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); menuButton.querySelector('span').textContent = open ? '×' : '☰'; });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.getElementById('current-year').textContent = new Date().getFullYear();
