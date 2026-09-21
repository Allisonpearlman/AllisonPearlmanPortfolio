# Allison Pearlman Portfolio

Personal portfolio site for **Allison Pearlman** — Aspiring Creative Director.
Static HTML/CSS/JS, designed for **GitHub Pages**.

Suggested repository name: **`AllisonPearlmanPortfolio`**

Live path pattern after deploy:

`https://<username>.github.io/AllisonPearlmanPortfolio/`

---

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
# Python
python3 -m http.server 8080

# or Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## Deploy to GitHub Pages

1. Create a new GitHub repository named **`AllisonPearlmanPortfolio`** (public).
2. Push this folder to the repo root (do **not** nest another folder):

   ```bash
   cd allison-pearlman-portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/AllisonPearlmanPortfolio.git
   git push -u origin main
   ```

3. In the repo on GitHub: **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Branch: **`main`** / folder: **`/ (root)`** → Save.
6. Wait a minute, then open:

   `https://<YOUR_USERNAME>.github.io/AllisonPearlmanPortfolio/`

If the site is in a project Pages URL (not a custom domain / user site), asset paths are already relative (`styles.css`, `assets/...`) and will work without a `<base>` tag.

---

## Site structure

| File / folder | Purpose |
|---|---|
| `index.html` | Single-page site (hero, GCA, WantLocker, Campus Closet, VS Wear Test, About, Contact) |
| `styles.css` | Layout & editorial styling |
| `script.js` | Sticky nav, mobile menu, active section, video helpers |
| `assets/images/` | Headshot, Nöz still, WantLocker grid |
| `assets/closet/` | Campus Closet floor photos (before/after labeled) |
| `assets/video/` | Compressed MP4 walkthroughs |

---

## Design notes

- Background ivory `#F7F4EF`, text charcoal `#1C1C1C`, accent taupe `#A89F91`
- Type: **Cormorant Garamond** (display) + **DM Sans** (UI/body) via Google Fonts
- Sticky nav + smooth scroll between sections
- Pure static files — no build step

---

## License

Portfolio content © Allison Pearlman. All rights reserved.
