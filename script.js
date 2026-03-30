/* =============================================
   Landing Page — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // --- Cookie Banner (#6) ---
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAccept = document.getElementById('cookie-accept');

  if (localStorage.getItem('cookie-accepted')) {
    cookieBanner.classList.add('dismissed');
  }

  cookieAccept.addEventListener('click', function () {
    cookieBanner.classList.add('dismissed');
    localStorage.setItem('cookie-accepted', '1');
  });

  // --- Mobile Hamburger Menu ---
  var hamburger = document.getElementById('hamburger');
  var navMobile = document.getElementById('nav-mobile');

  hamburger.addEventListener('click', function () {
    var isOpen = navMobile.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when a link is clicked
  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // --- #5 Multi-Step Form ---
  var form = document.getElementById('lead-form');
  var step1 = document.getElementById('form-step-1');
  var step2 = document.getElementById('form-step-2');
  var success = document.getElementById('form-success');
  var btnStep1 = document.getElementById('btn-step1');
  var fullnameInput = document.getElementById('fullname');
  var phoneInput = document.getElementById('phone');

  btnStep1.addEventListener('click', function () {
    var valid = true;

    fullnameInput.classList.remove('error');
    phoneInput.classList.remove('error');

    if (!fullnameInput.value.trim()) {
      fullnameInput.classList.add('error');
      fullnameInput.focus();
      valid = false;
    } else if (!phoneInput.value.trim() || !/^[0-9\-+\s]{9,15}$/.test(phoneInput.value.trim())) {
      phoneInput.classList.add('error');
      phoneInput.focus();
      valid = false;
    }

    if (valid) {
      // Track step 1 completion
      if (typeof gtag === 'function') {
        gtag('event', 'lead_form_step1', {
          event_category: 'form',
          event_label: 'name_phone_submitted'
        });
      }

      step1.classList.add('hidden');
      step2.classList.remove('hidden');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Track form submission
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        event_category: 'form',
        event_label: 'form_complete'
      });
    }

    step2.classList.add('hidden');
    success.classList.remove('hidden');

    // In production: send data to server here
    var formData = {
      name: fullnameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: document.getElementById('email').value.trim(),
      track: document.getElementById('track').value
    };
    console.log('Lead submitted:', formData);
  });

  // --- Testimonials Dots ---
  var track = document.getElementById('testimonials-track');
  var dotsContainer = document.getElementById('testimonials-dots');
  var cards = track.querySelectorAll('.testimonial-card');
  var dotCount = Math.min(cards.length, 6);

  for (var i = 0; i < dotCount; i++) {
    var dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', function () {
      var idx = parseInt(this.dataset.index);
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsContainer.appendChild(dot);
  }

  // Update active dot on scroll
  var scrollTimer;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var scrollLeft = track.scrollLeft;
      var cardWidth = cards[0].offsetWidth + 24; // gap
      // RTL: scrollLeft is negative in some browsers
      var absScroll = Math.abs(scrollLeft);
      var activeIdx = Math.round(absScroll / cardWidth);
      activeIdx = Math.max(0, Math.min(activeIdx, dotCount - 1));

      dotsContainer.querySelectorAll('.dot').forEach(function (d, i) {
        d.classList.toggle('active', i === activeIdx);
      });
    }, 100);
  });

  // --- #15 Exit Intent Popup ---
  var exitPopup = document.getElementById('exit-popup');
  var exitOverlay = document.getElementById('exit-overlay');
  var exitClose = document.getElementById('exit-close');
  var exitForm = document.getElementById('exit-form');
  var exitShown = false;

  function showExitPopup() {
    if (exitShown || localStorage.getItem('exit-popup-shown')) return;
    exitShown = true;
    exitPopup.classList.remove('hidden');
    localStorage.setItem('exit-popup-shown', '1');
  }

  function closeExitPopup() {
    exitPopup.classList.add('hidden');
  }

  // Desktop: mouse leaves viewport from top
  document.addEventListener('mouseout', function (e) {
    if (e.clientY <= 0) {
      showExitPopup();
    }
  });

  // Mobile: detect rapid scroll up (back intent)
  var lastScrollY = window.scrollY;
  var scrollUpDistance = 0;

  window.addEventListener('scroll', function () {
    var currentY = window.scrollY;
    if (currentY < lastScrollY) {
      scrollUpDistance += (lastScrollY - currentY);
      if (scrollUpDistance > 600 && currentY < 200) {
        showExitPopup();
        scrollUpDistance = 0;
      }
    } else {
      scrollUpDistance = 0;
    }
    lastScrollY = currentY;
  });

  exitClose.addEventListener('click', closeExitPopup);
  exitOverlay.addEventListener('click', closeExitPopup);

  exitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var phone = this.querySelector('input').value.trim();
    if (phone) {
      if (typeof gtag === 'function') {
        gtag('event', 'exit_intent_lead', {
          event_category: 'form',
          event_label: 'exit_popup'
        });
      }
      console.log('Exit intent lead:', phone);
      closeExitPopup();
    }
  });

  // --- Smooth scroll for all anchor links (#1 fix dead clicks) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Nav dropdowns: keyboard accessible ---
  document.querySelectorAll('.nav-dropdown .nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  });

});
