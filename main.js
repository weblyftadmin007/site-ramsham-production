// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

// Gallery filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentGalleryItem = null;
let currentItems = [];

function initLightbox() {
  galleryItems.forEach(item => {
    const img = item.querySelector('.gallery-img');
    if (img) {
      item.addEventListener('click', () => {
        currentGalleryItem = item;
        currentItems = Array.from(galleryItems).filter(i => i.style.display !== 'none' || i.parentElement === document.querySelector('.gallery-grid'));
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

document.addEventListener('keydown', e => {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
});

function navigateLightbox(direction) {
  if (currentItems.length === 0) return;
  
  const currentIndex = currentItems.indexOf(currentGalleryItem);
  let nextIndex = currentIndex + direction;
  
  if (nextIndex < 0) nextIndex = currentItems.length - 1;
  if (nextIndex >= currentItems.length) nextIndex = 0;
  
  currentGalleryItem = currentItems[nextIndex];
  const img = currentGalleryItem.querySelector('.gallery-img');
  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => navigateLightbox(1));
}

document.addEventListener('DOMContentLoaded', initLightbox);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
