/* ============================================
   POV INTERVISTE — Landing Page Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navbar scroll state --- */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));

  /* --- Contact form: visual feedback on submit --- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      // FormSubmit handles the actual POST — just show visual feedback
      const btn = form.querySelector('.btn-submit');
      btn.textContent = 'INVIO IN CORSO...';
      btn.style.opacity = '.7';
      btn.disabled = true;
    });
  }

  /* --- Counter animation for social proof --- */
  const statEl = document.querySelector('.proof-stat');
  if (statEl) {
    let animated = false;
    const statObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateCounter(statEl, 6, 1200);
        statObserver.unobserve(statEl);
      }
    }, { threshold: 0.5 });
    statObserver.observe(statEl);
  }

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      const current = Math.round(eased * target);
      el.textContent = `+${current} MILIONI DI UTENTI RAGGIUNTI OGNI MESE`;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  /* --- Hero logo 3D parallax effect --- */
  const heroLogo = document.querySelector('.hero-logo');
  const heroImg = heroLogo ? heroLogo.querySelector('img') : null;

  if (heroLogo && heroImg) {
    // Mouse tracking — 3D tilt
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateY = x * 18;  // max 9deg each side
      const rotateX = -y * 14; // max 7deg each side
      heroImg.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });

    // Scroll parallax — float up slightly as user scrolls
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.15;
      const scale = Math.max(1 - scrollY * 0.0008, 0.85);
      const opacity = Math.max(1 - scrollY * 0.002, 0);
      heroLogo.style.transform = `translateY(${offset}px) scale(${scale})`;
      heroLogo.style.opacity = opacity;
    }, { passive: true });
  }

  /* --- Duplicate logo track for infinite scroll --- */
  const track = document.querySelector('.logo-track');
  if (track) {
    const clone = track.innerHTML;
    track.innerHTML += clone;
  }

});
