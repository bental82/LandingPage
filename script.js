/* =============================================
   Landing Page — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // --- Lazy-load Vimeo iframe (performance: avoid render-blocking) ---
  var vimeoIframe = document.querySelector('.hero-video-bg iframe[data-src]');
  if (vimeoIframe && window.innerWidth > 768) {
    // Load after a short delay to prioritize LCP
    setTimeout(function () {
      vimeoIframe.src = vimeoIframe.getAttribute('data-src');
    }, 1500);
  }

  // --- GTM Consent Mode v2 — default state ---
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  // Restore consent from previous choice
  var savedChoice = localStorage.getItem('cookie-choice');
  var savedStats = localStorage.getItem('cookie-stats');
  if (savedChoice === 'accepted') {
    var statsGranted = savedStats !== 'denied';
    gtag('consent', 'update', {
      'analytics_storage': statsGranted ? 'granted' : 'denied',
      'ad_storage': statsGranted ? 'granted' : 'denied',
      'ad_user_data': statsGranted ? 'granted' : 'denied',
      'ad_personalization': statsGranted ? 'granted' : 'denied'
    });
  }

  // --- Cookie Consent Modal — GDPR with preferences ---
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieOverlay = document.getElementById('cookie-overlay');
  var cookieAccept = document.getElementById('cookie-accept');
  var cookieDecline = document.getElementById('cookie-decline');
  var cookieManage = document.getElementById('cookie-manage');
  var cookieClose = document.getElementById('cookie-close');
  var cookiePrefs = document.getElementById('cookie-prefs');
  var cookieStatsCheckbox = document.getElementById('cookie-stats');

  // Only hide permanently if user accepted or declined
  var cookieChoice = localStorage.getItem('cookie-choice');
  if (cookieChoice === 'accepted' || cookieChoice === 'declined') {
    cookieBanner.classList.add('dismissed');
    cookieOverlay.classList.add('hidden');
  } else {
    cookieOverlay.classList.remove('hidden');
  }

  // Restore checkbox state
  if (savedStats === 'denied' && cookieStatsCheckbox) {
    cookieStatsCheckbox.checked = false;
  }

  function dismissCookies(choice) {
    cookieBanner.classList.add('dismissed');
    cookieOverlay.classList.add('hidden');
    localStorage.setItem('cookie-choice', choice);

    var statsAllowed = cookieStatsCheckbox && cookieStatsCheckbox.checked;
    localStorage.setItem('cookie-stats', statsAllowed ? 'granted' : 'denied');

    if (choice === 'accepted') {
      gtag('consent', 'update', {
        'analytics_storage': statsAllowed ? 'granted' : 'denied',
        'ad_storage': statsAllowed ? 'granted' : 'denied',
        'ad_user_data': statsAllowed ? 'granted' : 'denied',
        'ad_personalization': statsAllowed ? 'granted' : 'denied'
      });
    } else {
      // Declined — deny all
      gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  }

  cookieAccept.addEventListener('click', function () {
    dismissCookies('accepted');
  });

  cookieDecline.addEventListener('click', function () {
    dismissCookies('declined');
  });

  cookieClose.addEventListener('click', function () {
    // Just hide for this session, will show again next visit
    cookieBanner.classList.add('dismissed');
    cookieOverlay.classList.add('hidden');
  });

  cookieManage.addEventListener('click', function () {
    cookiePrefs.classList.toggle('hidden');
    this.textContent = cookiePrefs.classList.contains('hidden') ? 'ניהול העדפות' : 'שמור העדפות';
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
      var emailInput = document.getElementById('email');
      if (!emailInput.value.trim() || !emailInput.validity.valid) {
        emailInput.classList.add('error');
        emailInput.focus();
        return;
      }

      if (typeof gtag === 'function') {
        gtag('event', 'lead_form_step1', {
          event_category: 'form',
          event_label: 'name_phone_email_submitted'
        });
      }

      step1.classList.add('hidden');
      step2.classList.remove('hidden');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        event_category: 'form',
        event_label: 'form_complete'
      });
    }

    step2.classList.add('hidden');
    success.classList.remove('hidden');

    var formData = {
      name: fullnameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: document.getElementById('email').value.trim(),
      track: document.getElementById('track').value
    };
    console.log('Lead submitted:', formData);
  });

  // --- Certificates: shuffle and show 5 random ---
  var certTrack = document.getElementById('certificates-track');
  if (certTrack) {
    var certCards = Array.from(certTrack.querySelectorAll('.cert-card'));
    // Fisher-Yates shuffle
    for (var i = certCards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      certTrack.appendChild(certCards[j]);
      var temp = certCards[i];
      certCards[i] = certCards[j];
      certCards[j] = temp;
    }
  }

  // --- Carousel Arrow Navigation (with wrap-around) ---
  function setupCarouselArrows(trackId, rightBtnId, leftBtnId) {
    var trackEl = document.getElementById(trackId);
    var rightBtn = document.getElementById(rightBtnId);
    var leftBtn = document.getElementById(leftBtnId);
    if (!trackEl || !rightBtn || !leftBtn) return;

    var scrollAmount = 280;
    trackEl.style.scrollBehavior = 'smooth';

    // In RTL: scrollLeft is 0 at rightmost (start), negative going left
    // Right arrow (‹) = reveal items to the right = scrollLeft goes more positive
    // Left arrow (›) = reveal items to the left = scrollLeft goes more negative

    rightBtn.addEventListener('click', function () {
      // If already at start (scrollLeft ~0), wrap to end
      if (trackEl.scrollLeft >= -10) {
        var maxNeg = -(trackEl.scrollWidth - trackEl.clientWidth);
        trackEl.style.scrollBehavior = 'auto';
        trackEl.scrollLeft = maxNeg;
        trackEl.style.scrollBehavior = 'smooth';
        setTimeout(function() { trackEl.scrollLeft += scrollAmount; }, 50);
      } else {
        trackEl.scrollLeft += scrollAmount;
      }
    });

    leftBtn.addEventListener('click', function () {
      // If already at end (scrollLeft is very negative), wrap to start
      var maxScroll = trackEl.scrollWidth - trackEl.clientWidth;
      if (trackEl.scrollLeft <= -(maxScroll - 10)) {
        trackEl.style.scrollBehavior = 'auto';
        trackEl.scrollLeft = 0;
        trackEl.style.scrollBehavior = 'smooth';
        setTimeout(function() { trackEl.scrollLeft -= scrollAmount; }, 50);
      } else {
        trackEl.scrollLeft -= scrollAmount;
      }
    });
  }

  setupCarouselArrows('certificates-track', 'cert-arrow-right', 'cert-arrow-left');
  setupCarouselArrows('employers-track', 'emp-arrow-right', 'emp-arrow-left');
  setupCarouselArrows('testimonials-track', 'test-arrow-right', 'test-arrow-left');

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

  var scrollTimer;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var scrollLeft = track.scrollLeft;
      var cardWidth = cards[0].offsetWidth + 24;
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

  // --- Smooth scroll for all anchor links ---
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
