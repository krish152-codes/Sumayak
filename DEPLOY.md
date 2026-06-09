# 🎂 Sumayak Birthday Website — Deployment Guide

## How to deploy on Netlify (FREE, no coding needed)

---

## STEP 1 — Add your photos & media

Place your files in the correct folders before deploying:

```
sumayak-birthday/
├── images/
│   ├── sumayak1.jpg      ← replace with her actual photos
│   ├── sumayak2.jpg
│   ├── us1.jpg
│   ├── us2.jpg
│   └── memory1.jpg
├── gifs/
│   ├── clip1.gif         ← add funny GIFs here
│   └── clip2.gif
├── videos/
│   └── memory1.mp4       ← add video clips here
├── admin/
│   └── index.html        ← your secret admin panel
├── index.html
├── style.css
├── script.js
├── photos-loader.js
└── DEPLOY.md             ← this file
```

**Tips:**
- Rename your files to match the filenames in the code, OR open `index.html` and find the `src="images/..."` attributes and update them to your filenames.
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp` for images; `.gif` for GIFs; `.mp4` for videos.
- Keep file sizes reasonable: photos under 2MB each, videos under 20MB.

---

## STEP 2 — (Optional) Add photos via Admin Panel

If you want to add photos through the browser instead of dropping files in folders:

1. Open `admin/index.html` in your browser locally.
2. Upload photos and add captions.
3. Click **"Download photos.json"**.
4. Place the downloaded `photos.json` file in the project root (`sumayak-birthday/`).
5. The `photos-loader.js` will automatically inject those photos on any device.

---

## STEP 3 — Deploy on Netlify

### Option A: Drag & Drop (easiest, no account required)

1. Go to **https://netlify.com** and sign up for a free account.
2. After signing in, look for the **"Deploy manually"** section on the dashboard.
3. Open your `sumayak-birthday` folder in File Explorer / Finder.
4. **Drag the entire folder** and drop it onto the Netlify deploy area.
5. Wait ~30 seconds. Netlify gives you a URL like `https://random-name.netlify.app`.
6. Done! Share that URL with Sumayak 🎉

### Option B: GitHub (recommended for updates)

1. Create a free GitHub account at **https://github.com**.
2. Create a new repository (click the "+" icon → "New repository").
3. Upload all your project files to that repository.
4. Go to **https://netlify.com**, sign in, and click **"Add new site"** → **"Import from Git"**.
5. Connect your GitHub account and select your repository.
6. Leave all settings as default and click **"Deploy site"**.
7. Get your URL and share it 💗

---

## STEP 4 — Custom domain (optional, makes it feel extra special)

Netlify lets you set a custom subdomain for free:

1. In your Netlify dashboard, go to **"Domain settings"**.
2. Under "Custom domains", click **"Options"** → **"Edit site name"**.
3. Type something like `happy-birthday-sumayak` → your URL becomes `https://happy-birthday-sumayak.netlify.app`.
4. Share this link with Sumayak! 💗

---

## STEP 5 — Access your Admin Panel

Your admin panel lives at:
```
https://your-site-name.netlify.app/admin/
```

- This URL is NOT linked anywhere on the birthday website, so only you know about it.
- You can add photos from here — but since Netlify is a static host, photos uploaded via admin panel are saved in the browser only on that device.
- **For photos to appear on Sumayak's device:** use the `photos.json` export method (Step 2 above) and re-deploy.

---

## Updating the website after deploy

### If you used Drag & Drop:
1. Make your changes to the files.
2. Go to Netlify → your site → "Deploys".
3. Drag the updated folder again. It replaces the old version.

### If you used GitHub:
1. Edit/upload new files to your GitHub repository.
2. Netlify automatically re-deploys within a minute. ✨

---

## Quick file reference

| File | What it does |
|------|-------------|
| `index.html` | Main birthday website |
| `style.css` | All styles and animations |
| `script.js` | All interactivity (No button, transitions, gallery, etc.) |
| `photos-loader.js` | Loads `photos.json` into the gallery automatically |
| `admin/index.html` | Your private admin panel to manage photos |
| `images/` | Place her photos here |
| `gifs/` | Place GIF clips here |
| `videos/` | Place video clips here |
| `photos.json` | (optional) Export from admin panel to deploy photos |

---

## Troubleshooting

**Photos not showing?**
- Check filenames match exactly (case-sensitive on Netlify): `sumayak1.jpg` ≠ `Sumayak1.JPG`
- Make sure files are inside the `images/` folder

**Video not playing?**
- Use `.mp4` format (H.264 codec)
- Keep file under 20MB

**No button not moving on mobile?**
- It works — it moves when she tries to tap it! Test it yourself first 😄

**How to change the birthday text?**
- Open `index.html` and find the `<!-- BIRTHDAY MESSAGE -->` section
- Edit the `<p class="message-text">` paragraphs

---

Made with 💗 for Sumayak's 20th Birthday
