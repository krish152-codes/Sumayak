/* ============================================================
   SUMAYAK BIRTHDAY WEBSITE — script.js
============================================================ */

const $ = id => document.getElementById(id);
const rand = (min, max) => Math.random() * (max - min) + min;

/* ── FLOATING DECORATIONS ── */
const FLOATERS_LANDING = ['💗','🌸','✨','💕','🎈','🎀','💖','🩷','⭐','🫧'];
const FLOATERS_ENDING  = ['💗','💕','❤️','🌸','✨','💫','🩷'];

function spawnFloaters(container, emojis, count = 18) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'float-item';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left             = rand(0, 95) + '%';
    el.style.bottom           = rand(-20, -5) + '%';
    el.style.fontSize         = rand(1.1, 2.2) + 'rem';
    el.style.animationDuration = rand(5, 11) + 's';
    el.style.animationDelay   = rand(0, 8) + 's';
    container.appendChild(el);
  }
}

spawnFloaters($('floaters'), FLOATERS_LANDING, 22);

/* ── SECTION 1 → 2 ── */
$('openSurpriseBtn').addEventListener('click', () => {
  $('landing').classList.add('hidden');
  $('confirmation').classList.remove('hidden');
});

/* ── NO BUTTON — runs away ── */
const noBtn    = $('noBtn');
const funnyMsg = $('funnyMsg');

const FUNNY_MESSAGES = [
  'Wrong answer, Sumayak 😭',
  'Try again, dumb friend 😂',
  'No is not an option today',
  'Be honest and click Yes 😌',
  "Nope, that's not how this works 💀",
  'Okay but like... no? 😂',
  'Did you really just try that again 💅',
  'The audacity omg 😭',
];
let funnyIndex = 0;

function moveNoButton() {
  const card = document.querySelector('.confirm-card');
  const maxX = Math.max(10, card.offsetWidth  - noBtn.offsetWidth  - 20);
  const maxY = Math.max(10, card.offsetHeight - noBtn.offsetHeight - 20);

  noBtn.style.position = 'absolute';
  noBtn.style.left     = rand(10, maxX) + 'px';
  noBtn.style.top      = rand(10, maxY) + 'px';
  noBtn.style.right    = 'auto';
  noBtn.style.bottom   = 'auto';

  funnyMsg.textContent = FUNNY_MESSAGES[funnyIndex % FUNNY_MESSAGES.length];
  funnyMsg.style.animation = 'none';
  void funnyMsg.offsetWidth;
  funnyMsg.style.animation = 'shakeMsg 0.4s ease';
  funnyIndex++;
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', e => { e.preventDefault(); moveNoButton(); }, { passive: false });
noBtn.addEventListener('click', moveNoButton);

/* ── YES BUTTON ── */
$('yesBtn').addEventListener('click', () => {
  launchConfetti();
  funnyMsg.textContent = "🎉 That's my girl! 💗";
  setTimeout(() => {
    $('confirmation').classList.add('hidden');
    $('mainPage').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
    initMainPage();
  }, 1600);
});

/* ── CONFETTI ── */
const CONFETTI_COLORS = ['#ff85b3','#ffd6e7','#f9c74f','#ff99cc','#fff','#ffb3cf','#e8639a'];

function launchConfetti() {
  const container = $('yesConfetti');
  for (let i = 0; i < 90; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left              = rand(5, 95) + 'vw';
    p.style.top               = rand(-10, 20) + 'px';
    p.style.background        = CONFETTI_COLORS[Math.floor(rand(0, CONFETTI_COLORS.length))];
    p.style.width             = rand(7, 14) + 'px';
    p.style.height            = rand(7, 14) + 'px';
    p.style.borderRadius      = Math.random() > 0.5 ? '50%' : '2px';
    p.style.animationDuration = rand(1.2, 2.4) + 's';
    p.style.animationDelay    = rand(0, 0.6) + 's';
    container.appendChild(p);
  }
  setTimeout(() => { container.innerHTML = ''; }, 3000);
}

/* ── MAIN PAGE INIT ── */
function initMainPage() {
  spawnFloaters($('subtleFloaters'), ['🌸','💗','✨','💕'], 14);
  $('endingHearts').textContent = '💗 💕 💖 💗 💕';
  spawnFloaters($('endingFloaters'), FLOATERS_ENDING, 18);
  injectAllMedia();
  initScrollObserver();
  initLightbox();
}

/* ── SCROLL OBSERVER ── */
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(t => observer.observe(t));
}

function observeNewElements(els) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

/* ── LIGHTBOX ── */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lbImg    = $('lightboxImg');

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  };

  $('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function attachLightbox(polaroids) {
  const lightbox = document.querySelector('.lightbox');
  const lbImg    = $('lightboxImg');
  polaroids.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

/* ── ESCAPE HTML ── */
function esc(str) {
  return String(str || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ============================================================
   MEDIA INJECTION
   Reads from localStorage key 'sumayak_media'
   Photos → polaroid gallery
   GIFs + Videos → clips section
============================================================ */
function injectAllMedia() {
  let all = [];

  // Primary storage key (new admin panel)
  try { all = JSON.parse(localStorage.getItem('sumayak_media')) || []; } catch { all = []; }

  // Backwards-compat: old key
  try {
    const old = JSON.parse(localStorage.getItem('sumayak_photos')) || [];
    old.forEach(p => { if (!p.type) p.type = 'photo'; });
    // Merge only if not already present
    const srcs = new Set(all.map(m => m.src));
    old.forEach(p => { if (!srcs.has(p.src)) all.push(p); });
  } catch {}

  const photos = all.filter(m => m.type === 'photo');
  const media  = all.filter(m => m.type === 'gif' || m.type === 'video');

  injectPhotos(photos);
  injectMedia(media);
}

function injectPhotos(photos) {
  const gallery  = $('photoGallery');
  const emptyMsg = $('emptyGallery');
  const rots     = [-3, 2, -2, 3, -1, 1, -4, 4];

  // Clear existing polaroids (keep empty msg node)
  gallery.querySelectorAll('.polaroid').forEach(el => el.remove());

  if (photos.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';

  photos.forEach((photo, i) => {
    const div = document.createElement('div');
    div.className = 'polaroid fade-up';
    div.style.setProperty('--rot', rots[i % rots.length] + 'deg');
    div.innerHTML = `
      <div class="polaroid-img-wrap">
        <img src="${esc(photo.src)}" alt="${esc(photo.caption || 'Memory')}" />
      </div>
      <p class="caption">${esc(photo.caption || 'A beautiful memory 💕')}</p>
    `;
    gallery.appendChild(div);
  });

  const newPolaroids = gallery.querySelectorAll('.polaroid');
  observeNewElements(newPolaroids);
  attachLightbox(newPolaroids);
}

function injectMedia(mediaItems) {
  const grid     = $('mediaGrid');
  const emptyMsg = $('emptyMedia');

  grid.querySelectorAll('.media-card').forEach(el => el.remove());

  if (mediaItems.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';

  mediaItems.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'media-card fade-up';
    if (i === 1) card.classList.add('delay-1');
    if (i === 2) card.classList.add('delay-2');

    if (item.type === 'gif') {
      card.innerHTML = `
        <img src="${esc(item.src)}" alt="${esc(item.caption || 'Clip')}" class="media-gif" />
        <p class="media-caption">${esc(item.caption || 'That iconic moment 😂')}</p>
      `;
    } else {
      card.innerHTML = `
        <video class="media-video" controls preload="metadata" playsinline>
          <source src="${esc(item.src)}" type="video/mp4" />
        </video>
        <p class="media-caption">${esc(item.caption || 'This one hits different 🥺')}</p>
      `;
    }
    grid.appendChild(card);
  });

  observeNewElements(grid.querySelectorAll('.media-card'));
}

/* ── REPLAY ── */
$('replayBtn').addEventListener('click', () => {
  $('mainPage').classList.add('hidden');
  $('confirmation').classList.add('hidden');
  $('landing').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'instant' });
  noBtn.style.left = '';
  noBtn.style.top  = '';
  noBtn.style.position = '';
  funnyMsg.textContent = '';
  funnyIndex = 0;
});
