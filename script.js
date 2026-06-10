document.addEventListener('DOMContentLoaded',function(){
/* === Safe storage (incognito / blocked storage) === */
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
/* === Vimeo lazy load (desktop only, 6s timeout) === */
var vimeoIframe=document.querySelector('.hero-video-bg iframe[data-src]');if(vimeoIframe&&window.innerWidth>768){var vimeoLoaded=false;function loadVimeo(){if(vimeoLoaded)return;vimeoLoaded=true;vimeoIframe.src=vimeoIframe.getAttribute('data-src');}
var iev=['scroll','mousemove','touchstart','keydown'];function onInt(){loadVimeo();iev.forEach(function(e){window.removeEventListener(e,onInt);});}
iev.forEach(function(e){window.addEventListener(e,onInt,{once:true,passive:true});});setTimeout(loadVimeo,6000);}
/* === Consent (deferred via rIC) === */
var ric=window.requestIdleCallback||function(cb){setTimeout(cb,1);};
ric(function(){
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','functionality_storage':'granted','security_storage':'granted'});
var savedChoice=lsGet('cookie-choice');var savedStats=lsGet('cookie-stats');
if(savedChoice==='accepted'){var sg=savedStats!=='denied';gtag('consent','update',{'analytics_storage':sg?'granted':'denied','ad_storage':sg?'granted':'denied','ad_user_data':sg?'granted':'denied','ad_personalization':sg?'granted':'denied'});}
window.gtag=gtag;
var cb=document.getElementById('cookie-banner');var ca=document.getElementById('cookie-accept');var cd=document.getElementById('cookie-decline');var cm=document.getElementById('cookie-manage');var cc=document.getElementById('cookie-close');var cp=document.getElementById('cookie-prefs');var cs=document.getElementById('cookie-stats');
if(!cb)return;
if(savedChoice==='accepted'||savedChoice==='declined'){cb.classList.add('dismissed');cb.style.visibility='visible';}else{setTimeout(function(){cb.style.visibility='visible';},1000);}
if(savedStats==='denied'&&cs)cs.checked=false;
function dismiss(ch){cb.classList.add('dismissed');lsSet('cookie-choice',ch);var sa=cs&&cs.checked;lsSet('cookie-stats',sa?'granted':'denied');if(ch==='accepted'){gtag('consent','update',{'analytics_storage':sa?'granted':'denied','ad_storage':sa?'granted':'denied','ad_user_data':sa?'granted':'denied','ad_personalization':sa?'granted':'denied'});}else{gtag('consent','update',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied'});}}
if(ca)ca.addEventListener('click',function(){dismiss('accepted');});if(cd)cd.addEventListener('click',function(){dismiss('declined');});if(cc)cc.addEventListener('click',function(){cb.classList.add('dismissed');});if(cm)cm.addEventListener('click',function(){cp.classList.toggle('hidden');this.textContent=cp.classList.contains('hidden')?'ניהול העדפות':'שמור העדפות';});
});
/* === HubSpot form init — with hbspt guard, retry and fallback === */
var exitShown=false;
function hsReady(){return typeof window.hbspt!=='undefined'&&window.hbspt.forms;}
function whenHS(cb){if(hsReady()){cb();return;}window.addEventListener('hsformsready',function(){if(hsReady())cb();},{once:true});}
function decorateForm($form){var ph={'full_name_he':'שם מלא','phone':'טלפון','email':'מייל'};$form.querySelectorAll('.hs-input').forEach(function(inp){var n=inp.name;if(ph[n])inp.placeholder=ph[n];if(n==='phone'){inp.setAttribute('inputmode','tel');inp.setAttribute('autocomplete','tel');}if(n==='email'){inp.setAttribute('inputmode','email');inp.setAttribute('autocomplete','email');}if(n==='full_name_he')inp.setAttribute('autocomplete','name');});var nf=$form.querySelector('.hs_full_name_he');var pf=$form.querySelector('.hs_phone');var ef=$form.querySelector('.hs_email');var con=$form.querySelector('.legal-consent-container');var sub=$form.querySelector('.hs_submit');if(nf)$form.appendChild(nf);if(pf)$form.appendChild(pf);if(ef)$form.appendChild(ef);if(con){var ct=con.querySelector('p');if(ct)ct.textContent='בלחיצה את/ה מאשר/ת לקבל מידע מהמרכז האקדמי פרס. ניתן לבטל בכל עת.';$form.appendChild(con);}if(sub)$form.appendChild(sub);var btn=$form.querySelector('.hs-button');if(btn)btn.value='← תחזרו אליי';}
function submittingState($form){$form.style.opacity='0.5';$form.style.pointerEvents='none';var btn=$form.querySelector('.hs-button');if(btn){btn.value='שולח...';btn.disabled=true;}}
function initHSForm(){whenHS(function(){try{hbspt.forms.create({region:'eu1',portalId:'143688847',formId:'5acc9316-e04d-4d87-a352-f7cf317c9b62',target:'#hs-lead-form',onFormReady:function($form){$form.querySelectorAll('.hs-input:not([type="hidden"]):not([type="checkbox"])').forEach(function(inp){inp.value='';});decorateForm($form);},onFormSubmit:submittingState,onFormSubmitted:function(){if(typeof gtag==='function'){gtag('event','generate_lead',{event_category:'form',event_label:'form_complete'});}document.getElementById('hs-lead-form').classList.add('hidden');document.getElementById('form-success').classList.remove('hidden');var b=document.querySelector('.form-badge');var t=document.querySelector('.form-title');if(b)b.classList.add('hidden');if(t)t.classList.add('hidden');exitShown=true;lsSet('exit-popup-shown','1');}});}catch(e){showFormFallback();}});}
function showFormFallback(){var c=document.getElementById('hs-lead-form');if(!c||c.querySelector('.hs-form')||c.querySelector('.form-fallback'))return;c.innerHTML='<div class="form-fallback" style="text-align:center;padding:1rem 0"><p style="font-size:1rem;color:#000F37;margin-bottom:1rem">הטופס לא נטען? התקשרו אלינו ישירות:</p><a href="tel:08-3006090" style="display:block;background:#5DE8B0;color:#000F37;padding:0.95rem;border-radius:8px;font-size:1.15rem;font-weight:800;text-align:center">☎ 08-3006090</a></div>';}
initHSForm();
/* Fallback: if SDK still missing after 12s, show phone CTA instead of empty box */
setTimeout(function(){if(!hsReady()){var c=document.getElementById('hs-lead-form');if(c&&!c.querySelector('.hs-form'))showFormFallback();}},12000);
/* === Carousels (deferred to after paint) === */
requestAnimationFrame(function(){setTimeout(function(){
/* Cert shuffle with DocumentFragment */
var certTrack=document.getElementById('certificates-track');if(certTrack){var certCards=Array.from(certTrack.querySelectorAll('.cert-card'));var frag=document.createDocumentFragment();for(var i=certCards.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=certCards[i];certCards[i]=certCards[j];certCards[j]=t;}certCards.forEach(function(c){frag.appendChild(c);});certTrack.appendChild(frag);}
function setupCarouselArrows(tid,rid,lid){var tr=document.getElementById(tid);var rb=document.getElementById(rid);var lb=document.getElementById(lid);if(!tr||!rb||!lb)return;var sa=280;rb.addEventListener('click',function(){if(tr.scrollLeft>=-10){tr.style.scrollBehavior='auto';tr.scrollLeft=-(tr.scrollWidth-tr.clientWidth);tr.style.scrollBehavior='smooth';setTimeout(function(){tr.scrollLeft+=sa;},50);}else{tr.scrollLeft+=sa;}});lb.addEventListener('click',function(){var ms=tr.scrollWidth-tr.clientWidth;if(tr.scrollLeft<=-(ms-10)){tr.style.scrollBehavior='auto';tr.scrollLeft=0;tr.style.scrollBehavior='smooth';setTimeout(function(){tr.scrollLeft-=sa;},50);}else{tr.scrollLeft-=sa;}});}
setupCarouselArrows('certificates-track','cert-arrow-right','cert-arrow-left');setupCarouselArrows('employers-track','emp-arrow-right','emp-arrow-left');setupCarouselArrows('testimonials-track','test-arrow-right','test-arrow-left');
/* Cert cards: clicking scrolls to form (were dead clicks) */
if(certTrack){certTrack.addEventListener('click',function(e){var card=e.target.closest('.cert-card');if(card){var f=document.getElementById('form-section');if(f)f.scrollIntoView({behavior:'smooth',block:'center'});}});}
/* Dots with DocumentFragment */
var track=document.getElementById('testimonials-track');var dotsC=document.getElementById('testimonials-dots');if(track&&dotsC){var cards=track.querySelectorAll('.testimonial-card');var dc=Math.min(cards.length,6);var dotFrag=document.createDocumentFragment();for(var i=0;i<dc;i++){var dot=document.createElement('button');dot.type='button';dot.className='dot'+(i===0?' active':'');dot.dataset.index=i;dot.setAttribute('aria-label','ביקורת '+(i+1));dot.addEventListener('click',function(){cards[parseInt(this.dataset.index)].scrollIntoView({behavior:'smooth',inline:'start',block:'nearest'});});dotFrag.appendChild(dot);}dotsC.appendChild(dotFrag);
/* Scroll dots - cache cardWidth */
var cachedCardWidth=0;var scrollTimer;track.addEventListener('scroll',function(){clearTimeout(scrollTimer);scrollTimer=setTimeout(function(){var sl=track.scrollLeft;if(!cachedCardWidth)cachedCardWidth=cards[0].offsetWidth+24;var idx=Math.round(Math.abs(sl)/cachedCardWidth);idx=Math.max(0,Math.min(idx,dc-1));dotsC.querySelectorAll('.dot').forEach(function(d,i){d.classList.toggle('active',i===idx);});},150);},{passive:true});}
},0);});
/* === Exit popup (deferred) === */
var exitPopup=document.getElementById('exit-popup');var exitOverlay=document.getElementById('exit-overlay');var exitClose=document.getElementById('exit-close');
function showExitPopup(){if(exitShown||lsGet('exit-popup-shown'))return;if(!hsReady())return;exitShown=true;exitPopup.classList.remove('hidden');lsSet('exit-popup-shown','1');try{hbspt.forms.create({region:'eu1',portalId:'143688847',formId:'5acc9316-e04d-4d87-a352-f7cf317c9b62',target:'#hs-exit-form',onFormReady:function($form){$form.style.transition='opacity 0.3s';decorateForm($form);},onFormSubmit:submittingState,onFormSubmitted:function(){if(typeof gtag==='function')gtag('event','exit_intent_lead',{event_category:'form',event_label:'exit_popup'});document.getElementById('hs-exit-form').classList.add('hidden');document.querySelector('.exit-popup-content h3').classList.add('hidden');document.querySelector('.exit-popup-content p').classList.add('hidden');document.getElementById('exit-success').classList.remove('hidden');setTimeout(closeExitPopup,2500);}});}catch(e){closeExitPopup();}}
function closeExitPopup(){exitPopup.classList.add('hidden');}
document.addEventListener('mouseout',function(e){if(e.clientY<=0)showExitPopup();});
var lastScrollY=window.scrollY;var scrollUpDist=0;var pageLoad=Date.now();var maxScroll=0;var cachedSH=0;
window.addEventListener('scroll',function(){var cy=window.scrollY;if(cy>maxScroll)maxScroll=cy;if(cy<lastScrollY){scrollUpDist+=(lastScrollY-cy);var tp=(Date.now()-pageLoad)/1000;if(!cachedSH)cachedSH=document.documentElement.scrollHeight;if(scrollUpDist>1200&&cy<150&&tp>30&&maxScroll>cachedSH*0.5){showExitPopup();scrollUpDist=0;}}else{scrollUpDist=0;}lastScrollY=cy;},{passive:true});
exitClose.addEventListener('click',closeExitPopup);exitOverlay.addEventListener('click',closeExitPopup);
/* === Smooth scroll links === */
document.querySelectorAll('a[href^="#"]').forEach(function(l){l.addEventListener('click',function(e){var t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});
/* === Proof stats: scroll to form on tap (were dead clicks) === */
document.querySelectorAll('.proof-item').forEach(function(p){p.addEventListener('click',function(){var f=document.getElementById('form-section');if(f)f.scrollIntoView({behavior:'smooth',block:'center'});});});
});