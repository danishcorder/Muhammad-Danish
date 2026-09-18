// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    body.classList.toggle('dark');
    themeToggle.textContent = body.classList.contains('dark') ? 'Toggle Light Mode' : 'Toggle Theme';
});

// Menu Toggle Functionality
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeMenu = document.getElementById('close-menu');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuToggle.style.display = sidebar.classList.contains('open') ? 'none' : 'block';
});

closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('open');
    menuToggle.style.display = 'block';
});

// Scroll Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section, header, nav').forEach(el => {
    observer.observe(el);
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.backgroundPositionY = rate + 'px';
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Micro-interactions for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animationPlayState = 'paused';
    });
    card.addEventListener('mouseleave', () => {
        card.style.animationPlayState = 'running';
    });
});

// Portfolio card hover animations
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('img').style.transform = 'scale(1.05) rotate(2deg)';
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('img').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Typing effect for header text
const headerText = document.querySelector('header h1');
const originalText = headerText.textContent;
headerText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < originalText.length) {
        headerText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 1000);

// AI Assistant Chat Integration
const assistantInput = document.getElementById('assistant-input');
const assistantBtn = document.getElementById('assistant-btn');

if (assistantInput && assistantBtn) {
    const openAssistant = () => {
        const query = assistantInput.value.trim();
        const url = 'https://danishcorder.github.io/Muhammad-danish-AI-Assiatant/' + (query ? '?q=' + encodeURIComponent(query) : '');
        window.open(url, '_blank');
    };

    assistantBtn.addEventListener('click', openAssistant);
    assistantInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') openAssistant();
    });
}
