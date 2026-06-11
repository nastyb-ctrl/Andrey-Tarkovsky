const revealItems = document.querySelectorAll('.section-intro, .section-title, .text-card, .quote-section, .cassette-stage, .timeline, .timeline-item, .visual-card, .hero-copy, .hero-photo, .fact-archive');
revealItems.forEach((item) => item.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const light = document.querySelector('.cursor-light');
window.addEventListener('mousemove', (event) => {
  light.style.left = `${event.clientX}px`;
  light.style.top = `${event.clientY}px`;
});

document.querySelectorAll('.cassette').forEach((cassette) => {
  cassette.querySelector('.cassette-shell').addEventListener('click', () => {
    document.querySelectorAll('.cassette').forEach((item) => item.classList.remove('active'));
    cassette.classList.add('active');
  });
});

document.querySelectorAll('.fact-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.fact-card').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxTitle = lightbox.querySelector('p');
const closeLightbox = document.querySelector('.lightbox-close');

document.querySelectorAll('.image-open').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const image = button.dataset.image;
    const title = button.dataset.title || '';
    if (!image) return;
    lightboxImage.src = image;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

function hideLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) hideLightbox();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideLightbox();
});


// Soft scroll parallax for barely visible gradient orbs
const orbs = document.querySelectorAll('.orb');

function moveOrbs() {
  const y = window.scrollY || 0;
  orbs.forEach((orb, index) => {
    const speed = 0.025 + index * 0.012;
    const side = index % 2 === 0 ? 1 : -1;
    orb.style.translate = `${side * y * speed}px ${-y * speed * 1.35}px`;
  });
}

window.addEventListener('scroll', moveOrbs, { passive: true });
moveOrbs();


// V3 smooth fact cards
document.querySelectorAll('.fact-card-v3').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.fact-card-v3').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
  });
});

// V3 include restored visual cards in reveal animation
document.querySelectorAll('.visual-title-v3, .visual-card-v3, .fact-archive-v3').forEach((item) => {
  item.classList.add('reveal');
  if (typeof observer !== 'undefined') observer.observe(item);
});
