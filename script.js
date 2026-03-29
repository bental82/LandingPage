/* ========================================
   Landing Page Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item.active').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Form Validation & Submit ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fullname = form.querySelector('[name="fullname"]');
      const phone = form.querySelector('[name="phone"]');
      const email = form.querySelector('[name="email"]');

      // Reset
      [fullname, phone, email].forEach(el => el.classList.remove('error'));

      // Name: at least two words
      if (!fullname.value.trim() || !/^\S+\s+\S+/.test(fullname.value.trim())) {
        fullname.classList.add('error');
        valid = false;
      }

      // Phone: Israeli mobile
      if (!phone.value.trim() || !/^05[0-9]{8}$/.test(phone.value.replace(/[-\s]/g, ''))) {
        phone.classList.add('error');
        valid = false;
      }

      // Email
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.classList.add('error');
        valid = false;
      }

      if (!valid) {
        // Shake effect
        form.closest('.form-card').style.animation = 'none';
        requestAnimationFrame(() => {
          form.closest('.form-card').style.animation = '';
        });
        return;
      }

      // Show thank you
      const thankyou = document.getElementById('form-thankyou');
      if (thankyou) {
        thankyou.hidden = false;
      }
    });
  }

  // --- Mobile sticky CTA visibility ---
  const mobileCta = document.getElementById('mobile-cta');
  if (mobileCta) {
    let lastScroll = 0;
    const showAfter = 400;

    const updateMobileCta = () => {
      const scrollY = window.scrollY;
      if (scrollY > showAfter) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
      lastScroll = scrollY;
    };

    window.addEventListener('scroll', updateMobileCta, { passive: true });
  }

  // --- Scroll reveal ---
  const revealElements = document.querySelectorAll('.section');
  if (revealElements.length && 'IntersectionObserver' in window) {
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // --- Stat counter animation ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));
  }

  function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString('he-IL');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
