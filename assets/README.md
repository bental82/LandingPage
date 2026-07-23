# Assets folder

Drop the production images here using the SAME filenames referenced in index.html
(all of them already exist in your repo / S3 — these are the filenames found in the current production page):

## Required
- logo-main.svg — header logo
- caps-1-poster.webp — hero video poster (mobile hero background)
- og-share.jpg — NEW: 1200×630 image for WhatsApp/social link previews (to create)

## Employer logos (trust bar)
- לוגו_אסם.webp, לוגו_שטראוס.webp, לוגו_LOREAL.webp, לוגו_AHAVA.webp,
  unilever.webp, tnuva-optimized.webp, mizrahi-tefahot-optimized.webp,
  israel-electric-optimized.webp, לוגו_DHL.webp, מכון_ויצמן_למדע.webp,
  בית_חולים_איכילוב.webp, לוגו_כאן_-_תאגיד_השידור_הישראלי.webp

## Testimonial avatars
- kobi-kanti.webp, nitzan-levin.webp (+ photos for the 2 new young-graduate cards)

Every <img> has an onerror text/initials fallback, so the page degrades gracefully
while assets are being wired. The Vimeo hero video (id 1149314717) loads directly
from Vimeo — desktop only, lazy.
