// Bhaarat Studio Production - Interactive Wedding Photography Website
document.addEventListener('DOMContentLoaded', () => {
  // Reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        if (prefersReducedMotion.matches) {
          window.scrollTo(0, target.offsetTop);
        } else {
          const startY = window.pageYOffset;
          const endY = target.offsetTop;
          const distance = endY - startY;
          const duration = 1000;
          const startTime = performance.now();

          function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            window.scrollTo(0, startY + (distance * ease));
            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          }
          requestAnimationFrame(animateScroll);
        }
      }
    });
  });

  // Nav background on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (prefersReducedMotion.matches) return;

    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Subtle hover effects for service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion.matches) {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.06)';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // Gallery filter with subtle effects
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
            // Add subtle scale-in
            setTimeout(() => {
              item.style.transform = '';
              item.style.transition = 'transform 0.3s ease';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Stats counter animation with intersection observer
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          
          statNumbers.forEach(num => {
            const target = parseInt(num.dataset.count) || 0;
            const suffix = target > 100 ? '+' : '';
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            if (prefersReducedMotion.matches) {
              num.textContent = target + suffix;
              return;
            }

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                num.textContent = target + suffix;
                clearInterval(timer);
              } else {
                num.textContent = Math.floor(current) + suffix;
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.5 });

    // Observe the first stat number's parent to trigger
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statObserver.observe(statsSection);
    }
  }

  // Subtle CTA button ripple effect
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        width: 12px;
        height: 12px;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
      `;

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add keyframes for ripple if not exists
  if (!document.getElementById('ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `
      @keyframes ripple {
        to { 
          transform: scale(4); 
          opacity: 0; 
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Image lazy loading with subtle fade-in
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transition = 'opacity 0.3s ease forwards';
        
        setTimeout(() => {
          entry.target.style.opacity = '1';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Nav link underline effect
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.style.position = 'relative';
    link.style.overflow = 'hidden';

    const underline = document.createElement('span');
    underline.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
      pointer-events: none;
    `;
    link.appendChild(underline);

    link.addEventListener('mouseenter', () => {
      underline.style.transform = 'scaleX(1)';
    });

    link.addEventListener('mouseleave', () => {
      underline.style.transform = 'scaleX(0)';
    });
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.service-card, .about-content, .gallery-item, .stat-item');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
});