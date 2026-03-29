/* ========================================
   Landing Page — Dynamic Content Loader
   Loads all content from content.json
   ======================================== */

// --- SVG Icon Library ---
const ICONS = {
  shield: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  award: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
  phone: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>',
  graduation: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/></svg>',
  ai: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3 4-4 3 3"/></svg>',
  placement: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="1.5"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>',
  hybrid: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>',
  military: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  infinity: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
  data: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
  code: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  monitor: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  check: '<svg width="ICO_SIZE" height="ICO_SIZE" viewBox="0 0 24 24" fill="none" stroke="ICO_COLOR" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
};

function icon(name, size = 16, color = 'currentColor') {
  const svg = ICONS[name] || '';
  return svg.replace(/ICO_SIZE/g, size).replace(/ICO_COLOR/g, color);
}

// --- Escape HTML for safe text rendering ---
function esc(str) {
  const el = document.createElement('span');
  el.textContent = str;
  return el.innerHTML;
}

// --- Main App ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('content.json');
    const data = await res.json();
    renderPage(data);
    initInteractions();
  } catch (err) {
    console.error('Failed to load content:', err);
  }
});

function renderPage(data) {
  renderTrustBar(data);
  renderHero(data);
  renderForm(data);
  renderValueProps(data);
  renderCertifications(data);
  renderAccordion(data);
  renderStats(data);
  renderGraduates(data);
  renderFinalCta(data);
  renderFooter(data);
}

// --- Renderers ---

function renderTrustBar(data) {
  const el = document.getElementById('trust-bar-content');
  const items = data.trust_bar.map(item =>
    `<span class="trust-item">${icon(item.icon, 16)} ${esc(item.text)}</span>`
  ).join('<span class="trust-divider"></span>');

  el.innerHTML = items +
    `<span class="trust-divider"></span>
     <span class="trust-item trust-phone">
       ${icon('phone', 16)}
       ייעוץ לימודים: <a href="tel:${esc(data.site.phone)}">${esc(data.site.phone)}</a>
     </span>`;
}

function renderHero(data) {
  const h = data.hero;
  const el = document.getElementById('hero-content');
  const microTrust = h.micro_trust.map(t => `<span>${esc(t)}</span>`).join('<span class="dot"></span>');

  el.innerHTML = `
    <span class="hero-tag">${esc(h.tag)}</span>
    <h1>${esc(h.title_prefix)} <span class="highlight">${esc(h.title_highlight)}</span> ${esc(h.title_suffix)}</h1>
    <p class="hero-subtitle">${esc(h.subtitle)}</p>
    <a href="#lead-form" class="cta-button hero-cta">${esc(h.cta_text)}</a>
    <div class="hero-micro-trust">${microTrust}</div>`;
}

function renderForm(data) {
  const f = data.form;
  document.getElementById('form-header').innerHTML = `
    <h3>${esc(f.title)}</h3>
    <p class="form-subtitle">${esc(f.subtitle)}</p>
    <p class="form-incentive">${f.incentive}</p>`;
  document.getElementById('form-btn-text').textContent = f.submit_text;
  document.getElementById('form-btn-sub').textContent = f.submit_sub;
  document.getElementById('thankyou-title').textContent = f.thankyou_title;
  document.getElementById('thankyou-text').textContent = f.thankyou_text;

  const phoneLink = document.getElementById('form-phone-link');
  phoneLink.href = `tel:${data.site.phone}`;
  phoneLink.textContent = data.site.phone;
}

function renderValueProps(data) {
  const vp = data.value_props;
  const el = document.getElementById('value-props-section');
  const cards = vp.items.map(item => `
    <div class="prop-card">
      <div class="prop-icon">${icon(item.icon, 32, 'var(--accent)')}</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
    </div>`).join('');

  el.innerHTML = `
    <h2 class="section-title">${esc(vp.title)}</h2>
    <div class="props-grid">${cards}</div>`;
}

function renderCertifications(data) {
  const c = data.certifications;
  const el = document.getElementById('certs-section');
  const items = c.items.map(item => `
    <div class="cert-item">
      <div class="cert-icon">${icon(item.icon, 24, 'var(--accent)')}</div>
      <span>${esc(item.text)}</span>
    </div>`).join('');

  el.innerHTML = `
    <h2 class="section-title">${esc(c.title)}</h2>
    <p class="section-subtitle">${esc(c.subtitle)}</p>
    <div class="cert-grid">${items}</div>`;
}

function renderAccordion(data) {
  const a = data.accordion;
  const el = document.getElementById('accordion-section');
  const items = a.items.map(item => `
    <div class="accordion-item">
      <button class="accordion-header" aria-expanded="false">
        <span>${esc(item.question)}</span>
        <span class="accordion-icon"></span>
      </button>
      <div class="accordion-body">
        <div>${item.answer}</div>
      </div>
    </div>`).join('');

  el.innerHTML = `
    <h2 class="section-title">${esc(a.title)}</h2>
    <div class="accordion">${items}</div>`;
}

function renderStats(data) {
  const el = document.getElementById('stats-section');
  const items = data.stats.map(stat => {
    if (stat.value !== null) {
      return `
        <div class="stat-item">
          <div><span class="stat-number" data-target="${stat.value}">0</span><span class="stat-suffix">${esc(stat.suffix)}</span></div>
          <span class="stat-label">${esc(stat.label)}</span>
        </div>`;
    } else {
      return `
        <div class="stat-item">
          <span class="stat-number-static">${esc(stat.display)}</span>
          <span class="stat-label">${esc(stat.label)}${stat.sublabel ? `<br><small>${esc(stat.sublabel)}</small>` : ''}</span>
        </div>`;
    }
  }).join('');

  el.innerHTML = `<div class="stats-grid">${items}</div>`;
}

function renderGraduates(data) {
  const g = data.graduates;
  const el = document.getElementById('graduates-section');
  const cards = g.items.map(grad => `
    <div class="graduate-card">
      <div class="graduate-top">
        <div class="graduate-avatar">${esc(grad.initials)}</div>
        <div class="graduate-info">
          <h4>${esc(grad.name)}</h4>
          <p class="graduate-role">${esc(grad.role)}</p>
          <p class="graduate-company">${esc(grad.company)}</p>
        </div>
      </div>
      <blockquote class="graduate-quote">"${esc(grad.quote)}"</blockquote>
    </div>`).join('');

  el.innerHTML = `
    <h2 class="section-title">${esc(g.title)}</h2>
    <div class="graduates-grid">${cards}</div>`;
}

function renderFinalCta(data) {
  const fc = data.final_cta;
  const el = document.getElementById('final-cta-section');
  el.innerHTML = `
    <h2>${esc(fc.title)}</h2>
    <p>${esc(fc.text)}</p>
    <a href="#lead-form" class="cta-button">${esc(fc.button_text)}</a>
    <p class="final-cta-phone">או חייגו: <a href="tel:${esc(data.site.phone)}">${esc(data.site.phone)}</a></p>`;
}

function renderFooter(data) {
  const s = data.site;
  document.getElementById('footer').innerHTML = `
    <div class="container footer-inner">
      <div class="footer-brand">
        <strong>${esc(s.institution)}</strong>
        <p>${esc(s.address)}</p>
      </div>
      <div class="footer-trust">
        <span>מוסד מוכר ע״י המועצה להשכלה גבוהה (מל״ג)</span>
        <span class="footer-sep">|</span>
        <span>תואר מוכר ${esc(s.degree_type)}</span>
      </div>
      <div class="footer-terms"><p>${esc(s.disclaimer)}</p></div>
      <div class="footer-links">
        <a href="#hero">חזרה למעלה</a>
        <a href="tel:${esc(s.phone)}">${esc(s.phone)}</a>
        <a href="#">נגישות</a>
      </div>
    </div>`;
}

// ========================================
// Interactions (after render)
// ========================================

function initInteractions() {
  initAccordion();
  initFormValidation();
  initMobileCta();
  initScrollReveal();
  initStatCounters();
  initSmoothScroll();
}

function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.accordion-item.active').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const fullname = form.querySelector('[name="fullname"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');

    [fullname, phone, email].forEach(el => el.classList.remove('error'));

    if (!fullname.value.trim() || !/^\S+\s+\S+/.test(fullname.value.trim())) {
      fullname.classList.add('error');
      valid = false;
    }
    if (!phone.value.trim() || !/^05[0-9]{8}$/.test(phone.value.replace(/[-\s]/g, ''))) {
      phone.classList.add('error');
      valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add('error');
      valid = false;
    }

    if (valid) {
      document.getElementById('form-thankyou').hidden = false;
    }
  });
}

function initMobileCta() {
  const mobileCta = document.getElementById('mobile-cta');
  if (!mobileCta) return;
  window.addEventListener('scroll', () => {
    mobileCta.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

function initScrollReveal() {
  const els = document.querySelectorAll('.section');
  if (!els.length || !('IntersectionObserver' in window)) return;
  els.forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

function initStatCounters() {
  const nums = document.querySelectorAll('.stat-number[data-target]');
  if (!nums.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.target, 10));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(el => obs.observe(el));
}

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('he-IL');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
