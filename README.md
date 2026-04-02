# POV INTERVISTE — Landing Page

## Quick Start

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

---

## What to Replace

### Hero Section
| Item | File / Location | Notes |
|------|----------------|-------|
| Background video | `assets/hero-video.mp4` | Autoplay, muted, looping. Keep under 10MB for fast load. |
| Video poster | `assets/hero-poster.jpg` | Fallback image shown before video loads |
| Founder image | `assets/founder.jpg` | Circular crop, min 400x400px |

### Team Photos
| Item | File |
|------|------|
| Federico Pasini | `assets/team-federico.jpg` |
| Samuel Diac | `assets/team-samuel.jpg` |

Square images, min 400x400px. They will be cropped to circles.

### Social Links
Search for these URLs in `index.html` and update:
- `https://instagram.com/pov.interviste`
- `https://tiktok.com/@pov.interviste`
- `https://facebook.com/pov.interviste`

### WhatsApp Contact
Search for `wa.me/393331234567` in `index.html` and replace with your actual WhatsApp number.

### Social Feed Images
In the **Social Integration** section, replace the placeholder `<div class="placeholder">` blocks inside `.social-grid-item` with actual `<img>` tags:
```html
<div class="social-grid-item">
  <img src="assets/ig-1.jpg" alt="Post">
</div>
```

### Client/Venue Logos
In the **Clients** section, replace text items with logo images:
```html
<div class="logo-item">
  <img src="assets/logos/club-name.png" alt="Club Name" style="height:40px">
</div>
```

### Open Graph Image
Replace `assets/og-image.jpg` with a 1200x630px image for social sharing previews (Meta ads).

### Form Submission
The form currently logs to console. To connect it to a backend:
1. Update the `form.addEventListener('submit', ...)` handler in `js/script.js`
2. Or add a `action` attribute to the `<form>` tag
3. Services like Formspree, Netlify Forms, or Google Forms work well for simple setups

---

## File Structure

```
SITOPOV/
├── index.html          # Main landing page
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # Interactions & animations
├── assets/             # Place your media files here
│   ├── hero-video.mp4
│   ├── hero-poster.jpg
│   ├── founder.jpg
│   ├── team-federico.jpg
│   ├── team-samuel.jpg
│   ├── og-image.jpg
│   └── logos/          # Venue logos
└── README.md
```

## Performance Notes

- No external JS libraries — vanilla only
- Google Fonts loaded with `display=swap` for fast render
- CSS animations use `transform` and `opacity` only (GPU-accelerated)
- Grain overlay uses inline SVG (no extra network request)
- Video should be compressed (H.264, 720p max recommended)
