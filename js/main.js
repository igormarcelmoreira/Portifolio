/* ─── HERO ASCII ART ──────────────────────────────────────── */
const heroAscii = document.getElementById('hero-ascii');
fetch('ascii-art.txt')
  .then(res => res.ok ? res.text() : Promise.reject(res.status))
  .then(text => { heroAscii.textContent = text; })
  .catch(() => { heroAscii.style.display = 'none'; });

/* ─── NAVBAR SCROLL ────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE NAV TOGGLE ───────────────────────────────────── */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = toggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = toggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ─── REVEAL ON SCROLL ────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── ACTIVE NAV LINK ─────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ─── ACTIVE NAV STYLE ────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = '.nav-links a.active { color: var(--accent) !important; }';
document.head.appendChild(style);

/* ─── TYPEWRITER HERO TITLE ───────────────────────────────── */
const heroTitle = document.querySelector('.hero-title');
let titleIndex = 0;
let charIndex = 0;
let deleting = false;
let paused = false;
let typewriterTimer = null;

function typeWriter() {
  if (paused) return;
  const titles = heroTitles[window.currentLang] || heroTitles.en;
  const current = titles[titleIndex % titles.length];

  if (!deleting) {
    heroTitle.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      paused = true;
      typewriterTimer = setTimeout(() => { paused = false; deleting = true; typeWriter(); }, 2800);
      return;
    }
    typewriterTimer = setTimeout(typeWriter, 55);
  } else {
    heroTitle.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }
    typewriterTimer = setTimeout(typeWriter, 30);
  }
}

// Restart the animation cleanly whenever the language switches
document.addEventListener('langchange', () => {
  clearTimeout(typewriterTimer);
  paused = false;
  deleting = false;
  charIndex = 0;
  titleIndex = 0;
  heroTitle.textContent = '';
  typeWriter();
});

// Start after initial reveal animation settles
setTimeout(typeWriter, 1200);

/* ─── SMOOTH HOVER TILT ON CARDS ──────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
