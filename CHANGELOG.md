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

---

## Round 2 — multi-agent review fixes (CRO / a11y / perf / JS / mobile / copy lenses)
**Bugs:** RTL testimonial dots now track correctly (`Math.abs(scrollLeft)` + stride math) · marquee logo set duplicated so the loop is seamless · exit popup no longer re-fires after close · granular consent persisted as JSON and restored on return (accept-all vs. granular honored) · past-deadline badge no longer shows a stale date · HubSpot fallback form submits via fetch instead of navigating to a JSON page.
**Perf:** HubSpot loader deferred (`onload/onerror` → render) · Vimeo iframe deferred to post-load +1.2s and skipped under reduced-motion · hero poster no longer fetched on desktop (JS-assigned, mobile-only) · 899→899.98px breakpoint gap closed.
**A11y:** `<main>` landmark + skip link · exit popup focus trap/Escape/restore · sr-only labels on exit + fallback inputs · `prefers-reduced-motion` block · contrast fixes (`.program .tag` → mint-ink, `--blue` → #2a6cb0) · testimonial track keyboard-scrollable, dot hit targets 24px · safe-area-inset on bottom bars · cookie prefs UI matches the all-denied default.
**CRO/copy:** sticky bar gains "השאירו פרטים" and shows at 20% scroll · icon-only phone in mobile header · form heading aligned to the CTA promise ("בדקו אם מגיע לכם הפטור") + מועצה להשכלה גבוהה trust line · exit popup leads with the waiver · H1 typo fixed (לפסל → לפסוח על) · absolute og:image + canonical/og:url · `*` on the sourced #1 stat · "תואר פלוס" naming unified · program cards carry `data-program` into `cta_click`.
**Deferred (needs owner input):** WhatsApp number is still landline-derived (TODO) · two GTM containers both load (possible GA4 double-count if the property is also a GTM tag — check container configs) · "30,000+ / 93%" stats unsourced · program cards still link to the form, not program pages.
**Verified (headless Chromium, mobile + desktop):** zero JS errors, zero overflow, RTL dot sync ✓, consent accept-all and granular both persist + restore correctly ✓, marquee duplicated ✓, exit popup focus ✓.

---

## Round 3 — degree navigation menu
Header gains a degree menu: **תואר ראשון** (8 BA programs, same names/`data-program` values as the program cards) and **תואר שני** (4 MBA specialization tracks — list marked TODO to verify). Desktop (≥900px): hover/focus/click dropdowns. Mobile: hamburger (☰/✕) opens a fixed panel under the header with expandable groups. All degree links reuse the existing `#form-section` smooth-scroll + `cta_click` handler, so advisors get the chosen program per lead. Escape closes; menu closes on link tap. Header CTA no longer wraps on small phones.

---

## Round 4 — testimonial carousel fix
Reported "carousel doesn't work": on desktop there was no way to navigate (no swipe, no arrows — only dots). Added prev/next arrows (desktop, ≥768px) and mouse-drag scrolling on the track. Note: the first arrow attempt nested `#tNext` inside the scroll track, so its clicks fed the drag handler and scroll-snap cancelled the scroll — buttons must be direct children of `.t-wrap`. Verified: real mouse clicks step both directions, drag works, mobile dots/swipe unchanged.

---

## Round 5 — "מה לומדים?" becomes a tabbed degree explorer, moved under testimonials
The programs section is now interactive: **תארים ראשונים** (8 BA cards) / **תארים שניים** (4 MBA cards, `data-program` values matching the header menu). ARIA tablist pattern (roles, aria-selected, arrow-key support), `degree_tab_switch` dataLayer event. Section relocated to sit between testimonials and the final CTA. Card hrefs still scroll to the form — single TODO to point them at the degree sub-pages once those ship.

---

## Round 6 — copy pivot: from fee-waiver hook to consultation-meeting funnel
All "פטור מדמי רישום" framing removed. Every CTA now sells the meeting with an advisor who guides enrollment: hero/final/sticky CTAs → "קבעו שיחת ייעוץ", form card → "קבעו שיחת ייעוץ אישית" with advisor-guides-enrollment note, exit popup → "עוד לא דיברתם עם יועץ לימודים?", badge now counts down to registration close (was waiver deadline), title/meta/OG updated. 18 strings rewritten; zero "פטור" left on the page.

---

## Round 7 — real program names, תואר פלוס plug, miluim rewrite, layout fixes
- Program names now match pac.ac.il's actual menu: BA cards/nav → מנהל עסקים (B.A), משפטים (LL.B), מדעי ההתנהגות (B.A), תקשורת (B.A), מערכות מידע ניהוליות (B.A), מנהל מערכות בריאות (B.A — fixes wrong "ניהול שירותי בריאות"), ניהול משאבי אנוש (B.A), מדעי התזונה (B.Sc). MA → the real 5: מנהל עסקים (MBA), פסיכולוגיה חינוכית (M.A), ייעוץ ופיתוח ארגוני (M.A), ניהול משאבי אנוש (M.A), משפטים (M.A). Replaces the 4 invented MBA tracks. data-program values updated everywhere (nav + cards, 13/13 match).
- Degree tabs renamed תארים ראשונים/שניים → תואר ראשון/תואר שני.
- Mid-page CTA is now a "תואר פלוס" plug (logo + "תואר אקדמי ועם תעודה מקצועית — ללא עלות נוספת" + "לפרטים נוספים קבעו פגישת ייעוץ").
- Miluim band moved below the תואר פלוס block; copy rewritten: headline "במילואים? אנחנו איתכם." (old phrasing wasn't idiomatic), false "מלגות ייעודיות למשרתי מילואים" bullet removed, "כל השיעורים משודרים בלייב בזום" added.
- Benefits sub: למשתלם → למבוקש.
- Mobile: benefit icons now inline with card titles; small-phone header spacing fixed (brand text hidden ≤480px, SVG carries the wordmark) so the phone icon can't overlap the logo.

---

## Round 8 — first degree sub-page prototype: `business.html` (B.A מנהל עסקים)
Standalone degree page, content sourced from the old peres-pac.co.il/business2021 page, rebuilt on the v2 design system. Structure: hero (breadcrumb + degree H1 "אפשר גם בשנתיים" + degree stats + same HubSpot form) → employer trust bar → 11 scannable benefit cards distilled from the old page's long paragraphs (תואר בשנתיים, ראשון+שני ב-3 שנים, INFINITY, תואר פלוס+, היברידי, בוקר/ערב, LEVEL UP, AI BOOTCAMP, דו-חוגי, מרכז קריירה, מעונות) → תואר פלוס 4-certificate grid (נדל״ן, eCommerce, שיווק דיגיטלי AI, מגשר — real SVG icons) → 5 specializations as a native `<details>` accordion (zero-JS, keyboard/screen-reader accessible, full old-page texts preserved) → navy LEVEL UP band with logos + מסלול החברות chips (UMD לאומית, כללית, AYALON, קפלן, רן רהב) → mint mid-CTA → miluim band (old page's own bullet list) → 6 business-degree testimonials (3 with real photos: ביטון, לוין, ופנר; 3 with initial-fallback avatars, TODO-marked) → final CTA. All machinery identical to index.html: same HubSpot portal/form IDs, GTM×2 + GA4 deferred, Consent Mode v2 cookie bar, sticky mobile bar, exit popup, deadline countdown; `cta_click`/`generate_lead` events now carry `program: 'B.A מנהל עסקים'`. Added `Course` JSON-LD. index.html: header nav + program card for מנהל עסקים now link to `business.html` (other programs still scroll to the form — TODO as their pages ship).
**TODOs:** real LEVEL UP participant logos (currently reused employer assets) · photos for תשובה/אביטל/גפנר · dedicated og share image.
