/*
  photos-loader.js
  ─────────────────────────────────────────────────────────
  This script is used ONLY during Netlify deployment.
  
  When you export photos.json from the admin panel and place
  it in the project root, this loader fetches it and merges
  it with any locally stored photos so Sumayak sees them on
  her device even without accessing the admin panel.
  
  Include this script in index.html BEFORE script.js:
    <script src="photos-loader.js"></script>
  
  If photos.json doesn't exist, this script does nothing.
*/

(function () {
  const STORAGE_KEY = 'sumayak_photos';

  fetch('/photos.json')
    .then(res => {
      if (!res.ok) return null;
      return res.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data) || data.length === 0) return;

      // Merge with existing localStorage photos (avoid duplicates by src)
      let existing = [];
      try { existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch {}

      const existingSrcs = new Set(existing.map(p => p.src));
      const newPhotos    = data.filter(p => !existingSrcs.has(p.src));

      if (newPhotos.length > 0) {
        const merged = [...existing, ...newPhotos];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      }
    })
    .catch(() => {
      // photos.json not found — that's fine, site works without it
    });
})();
