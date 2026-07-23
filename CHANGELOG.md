# PAC Landing Page v2 — Changelog
**Base:** production enroll.pac.ac.il → **this:** new standalone `index.html` (new branch, production untouched)
**Inputs:** Clarity behavioral brief + 5-agent critique + real-device mobile audit

## Clarity brief → implementation

| # | Clarity finding | Implementation in v2 |
|---|---|---|
| 1 | 23% of first mobile interactions wasted on cookie banner | Slim bottom cookie **bar** (was: tall overlay card), delayed until first engagement (30% scroll / form focus / 6s max), never overlaps the form's submit button; sticky bar auto-hides while cookie bar is visible |
| 2 | 23% mobile drop-off in hero (desktop ~8%) | Mobile hero compacted; **form card moved directly under the sub-headline** (before stats) via JS reorder — fields now visible in viewport #1 |
| 3 | Testimonials = 25% of attention but sit at 85% scroll depth | Employer trust bar moved **directly below hero**; testimonials moved up to ~60% depth (after certificates) |
| 4 | Users skim 15–45% zone | Benefits rewritten as 4 scannable bullet cards, zero paragraphs |
| 5 | 18% of all clicks on certificate carousel arrows | Carousel **removed** → static 6-card mini-grid (Cyber, AI Bootcamp, Digital Marketing, eCommerce, Tech Entrepreneurship, B2B Sales) |
| 6 | No mid-page conversion trigger | Sticky mobile bottom bar (Call + WhatsApp) appears after 40% scroll, auto-hides near the form and final CTA |

## Critique fixes → implementation

| Finding | Implementation |
|---|---|
| H1 was brand name only | New outcome H1: "תואר ראשון **בשנתיים.** בלי לפסל את העבודה והחיים." |
| No degree programs listed | New "מה לומדים?" section: 8 real BA programs (Business Admin, Law, Behavioral Sci, Communications, Mgmt Info Systems, Health Services Mgmt, HRM, Nutrition) with outcome framing |
| Miluim advantage buried | Full navy band: "במילואים? אנחנו עליכם" — recordings, exam deferrals, personal mentor, grants + pikadon line |
| No WhatsApp channel | WhatsApp CTAs in hero, sticky bar, final CTA (wa.me deep link with prefilled text) |
| Fee waiver without urgency | Deadline badge + live countdown in hero ("נותרו X ימים"), editable `DEADLINE` const |
| Unsourced stats claims | Source footnote under stats (National Student Union survey 2024) |
| © 2026 hardcoded | Dynamic year via JS |
| No OG tags (WhatsApp shares) | Full og:/twitter meta block |
| Exit popup fires on scroll-up (mobile risk) | Kept for desktop mouse-exit only; **disabled on touch devices**, once per session |
| Cookie/consent logic | localStorage consent with GTM `consent_granted/denied` dataLayer events + pixel hook comment |

## Preserved from production (do not lose)
- **HubSpot form**: same portal `143688847`, form `5acc9316-e04d-4d87-a352-f7cf317c9b62`, region eu1 — embedded via official loader with a native fallback posting to the same endpoint. Leads/UTMs/workflows untouched.
- **GTM-KT5TP6N** and **GA4 G-C565158BPQ** (Clarity keeps loading via GTM)
- **Vimeo hero background** (video 1149314717) — desktop only, lazy-loaded; mobile gets the poster image (saves ~2MB on cellular)
- Phone 08-3006090 everywhere

## TODOs for the team (marked `TODO` in code)
1. Replace 2 placeholder young-graduate testimonial cards with real stories + photos (marked clearly)
2. Confirm WhatsApp Business number (currently derived from landline: 97283006090)
3. Set real waiver `DEADLINE` date constant
4. Verify exact survey citation wording ("#1 in satisfaction")
5. Confirm miluim grant terms + pikadon mechanics with finance
6. Link each program card to its program page; verify current program list
7. Privacy/accessibility URLs in footer + cookie bar
8. Create `assets/og-share.jpg` (1200×630)
9. Drop images into `assets/` (see assets/README.md — original filenames preserved; every img has a graceful fallback)

## Verified in headless mobile emulation (390×844)
✓ No horizontal overflow ✓ Form in viewport #1 ✓ Sticky bar shows after 40%, hides near form/footer ✓ Cookie bar delayed + never covers submit ✓ Sticky/cookie never overlap ✓ RTL correct throughout ✓ Fallback form renders if HubSpot is blocked

---

# kimi-redesign-impv — merge with cro-optimization-brief + fixes
**Base:** `Kimi-redesign` (v2 above) → **this:** best-of-both merge with `cro-optimization-brief`

## Adopted from cro-optimization-brief
| Element | Notes |
|---|---|
| 6 REAL testimonials with photos | Ido Einbinder, Hava Atias, Kobi Kanti, Ido Vafner, Nitzan Levin, Daniel Biton (`images/testimonials/`) — replaces the 2 placeholder "young grad" cards (TODO #1 done) |
| 16 real certificate SVG icons | `images/certificates/`; 6 shown by default, 10 more via "כל התעודות (16)" expand toggle |
| Mid-page CTA band | Mint band after certificates: "רוצים לדעת איזו תעודה מתאימה לכם?" |
| Granular cookie preferences | "העדפות" button opens analytics/ads checkboxes, wired to Consent Mode v2 `gtag('consent','update')` |
| Inline form in exit popup | Name/phone/email, POSTs to the SAME HubSpot endpoint as the hero form (cro's version showed success without submitting — fixed here) |
| Brand logos in benefits | INFINITY + תואר פלוס logos on the matching benefit cards |
| Form disclaimer microcopy | "בשליחת הטופס אני מאשר/ת…" under the form |

## Kept from Kimi-redesign (stronger than cro)
Outcome H1, deadline countdown badge, miluim band, 8-program grid, employer logo marquee, mobile form-first reorder, slim delayed cookie bar (cro's was a modal), HubSpot embedded form (cro's form never submitted anywhere), sticky mobile bar logic, exit popup suppressed on touch.

## Fixes applied while merging
- Hero poster `<img>` pointed at non-existent `assets/caps-1-poster.webp` → now `images/mobile/caps-1-poster.webp` (matches the LCP preload; was a broken LCP image)
- All 12 employer logos pointed at empty `assets/` dir → real paths under `images/` / `images/employers/`
- Production GTM (GTM-KT5TP6N) + GA4 (G-C565158BPQ) loaded eagerly at page end, bypassing Consent Mode defaults → now deferred on first interaction / 5s, same pattern as the head GTM; IDs unchanged
- Footer privacy/accessibility links → local `privacy.html` / `accessibility.html` (were external TODO URLs); added white logo
- Returning visitors' stored consent is now re-applied to Consent Mode on load

## Verified in headless Chromium (390×844 mobile + 1440×900 desktop)
✓ No horizontal overflow ✓ No JS errors ✓ Cert toggle expands ✓ Cookie prefs open + consent update fires ✓ Exit form renders ✓ Real testimonial photos render ✓ Form in viewport #1 on mobile ✓ RTL correct
