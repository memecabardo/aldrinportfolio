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
  'Data Organization',
  'Record Management',
  'MS Excel & MS Word',
  'Documentation',
  'Report Preparation',
  'Detail-Oriented',
  'Fast Learner',
  'Team Collaborator',
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
  '.project-card, .uni-card, .contact-card, .about-grid, .hero-content, .hero-image, .about-image, .about-content, .contact-form'
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

// ===== PROJECT IMAGE SLIDERS =====
function initSliders() {
  document.querySelectorAll('.project-slider').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const dots   = slider.querySelectorAll('.dot');
    let current  = 0;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    slider.querySelector('.slide-prev').addEventListener('click', () => goTo(current - 1));
    slider.querySelector('.slide-next').addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  });
}
initSliders();

// ===== PROJECT LIGHTBOX =====
const projLightbox      = document.getElementById('projLightbox');
const projLightboxImg   = document.getElementById('projLightboxImg');
const projLightboxTitle = document.getElementById('projLightboxTitle');
const projLightboxDesc  = document.getElementById('projLightboxDesc');
const projLightboxClose = document.getElementById('projLightboxClose');
const projLbPrev        = document.getElementById('projLbPrev');
const projLbNext        = document.getElementById('projLbNext');

let projImages  = [];
let projCurrent = 0;

function openProjLightbox(images, startIndex, title, desc) {
  projImages  = images;
  projCurrent = startIndex;
  projLightboxTitle.textContent = title;
  projLightboxDesc.textContent  = desc;
  projLightboxImg.src = images[projCurrent];
  projLbPrev.classList.toggle('hidden', images.length <= 1);
  projLbNext.classList.toggle('hidden', images.length <= 1);
  projLightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjLightbox() {
  projLightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function projLbGo(dir) {
  projCurrent = (projCurrent + dir + projImages.length) % projImages.length;
  projLightboxImg.src = projImages[projCurrent];
}

projLbPrev.addEventListener('click', () => projLbGo(-1));
projLbNext.addEventListener('click', () => projLbGo(1));
projLightboxClose.addEventListener('click', closeProjLightbox);
projLightbox.addEventListener('click', (e) => { if (e.target === projLightbox) closeProjLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!projLightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeProjLightbox();
  if (e.key === 'ArrowLeft')   projLbGo(-1);
  if (e.key === 'ArrowRight')  projLbGo(1);
});

// Attach click to each project card overlay
document.querySelectorAll('.proj-view-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    e.stopPropagation();
    const card   = overlay.closest('.project-card');
    const title  = card.dataset.projTitle  || '';
    const desc   = card.dataset.projDesc   || '';
    const imgs   = Array.from(card.querySelectorAll('.project-img img, .project-slider img.slide, .project-img > img'))
      .filter((img, idx, arr) => arr.indexOf(img) === idx)
      .map(img => img.src);
    // dedupe
    const unique = [...new Set(imgs)];
    // find which slide is currently active (start from it)
    const activeSlide = card.querySelector('.slide.active, .project-img > img');
    const startIdx = activeSlide ? unique.indexOf(activeSlide.src) : 0;
    openProjLightbox(unique, Math.max(0, startIdx), title, desc);
  });
});

// ===== AWARDS TAB FILTER =====
document.querySelectorAll('.awards-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.awards-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    document.querySelectorAll('.uni-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const to      = 'luzon.aldrinjay@dnsc.edu.ph';
  const body    = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto  = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  formStatus.textContent = '✅ Your email client has been opened. Please send the message from there.';
  formStatus.style.color = '#4caf50';
  contactForm.reset();
  setTimeout(() => { formStatus.textContent = ''; }, 6000);
});
