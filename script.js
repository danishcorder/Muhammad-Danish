const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const assistantInput = document.getElementById('assistant-input');
const assistantBtn = document.getElementById('assistant-btn');
const currentYear = document.getElementById('current-year');

// Restore the visitor's preferred theme.
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') body.classList.add('light-theme');

function syncThemeButton() {
  if (!themeToggle) return;
  themeToggle.textContent = body.classList.contains('light-theme') ? '☾' : '◐';
  themeToggle.setAttribute(
    'aria-label',
    body.classList.contains('light-theme') ? 'Switch to dark theme' : 'Switch to light theme'
  );
}

syncThemeButton();

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  localStorage.setItem('portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark');
  syncThemeButton();
});

// Mobile navigation.
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    if (navToggle) navToggle.textContent = '☰';
  });
});

// Lightweight reveal animations.
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('visible'));
}

// Highlight the active section in the navigation.
const navAnchors = [...document.querySelectorAll('.nav-links a')];
const sections = navAnchors
  .map(anchor => document.querySelector(anchor.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = navAnchors.find(a => a.getAttribute('href') === `#${entry.target.id}`);
      active?.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));
}

// AI portfolio assistant integration.
const assistantBaseUrl = 'https://danishcorder.github.io/Muhammad-danish-AI-Assiatant/';
function openAssistant(promptText) {
  const query = (promptText ?? assistantInput?.value ?? '').trim();
  const target = query ? `${assistantBaseUrl}?q=${encodeURIComponent(query)}` : assistantBaseUrl;
  window.open(target, '_blank', 'noopener,noreferrer');
}

assistantBtn?.addEventListener('click', () => openAssistant());
assistantInput?.addEventListener('keydown', event => {
  if (event.key === 'Enter') openAssistant();
});

document.querySelectorAll('[data-prompt]').forEach(button => {
  button.addEventListener('click', () => {
    const prompt = button.dataset.prompt || '';
    if (assistantInput) assistantInput.value = prompt;
    openAssistant(prompt);
  });
});

if (currentYear) currentYear.textContent = new Date().getFullYear();
