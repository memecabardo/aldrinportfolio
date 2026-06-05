// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== TYPED TEXT EFFECT =====
const typedEl = document.getElementById('typedText');
const phrases = [
  'IT Student',
  'Web Developer',
  'Python Programmer',
  'UI/UX Enthusiast',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 1800;
    } else {
      typingDelay = 100;
    }
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400;
    } else {
      typingDelay = 60;
    }
  }
  setTimeout(typeEffect, typingDelay);
}
typeEffect();

// ===== FADE-IN ON SCROLL =====
const fadeEls = document.querySelectorAll(
  '.project-card, .award-card, .contact-card, .about-grid, .hero-content, .hero-image, .about-image, .about-content, .contact-form'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Award "View Certificate" buttons
document.querySelectorAll('.award-view-btn').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.src, btn.dataset.alt));
});

// Gallery "View Photo" buttons
document.querySelectorAll('.gallery-view-btn').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.src, btn.dataset.alt));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  // Simulate send (replace with actual backend/EmailJS integration)
  setTimeout(() => {
    formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formStatus.style.color = '#4caf50';
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    setTimeout(() => { formStatus.textContent = ''; }, 5000);
  }, 1500);
});
