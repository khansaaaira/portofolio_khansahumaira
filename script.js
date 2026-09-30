// Loader / transisi halaman
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 500);
});

// Scroll animations (AOS)
if (window.AOS) AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });

// Typing effect
const phrases = ['Siswi TKJ 💻', 'Network Enthusiast 🌐', 'Cyber Security Learner 🔐', 'MikroTik & Cisco Explorer 📡'];
const typed = document.getElementById('typed');
let p = 0, c = 0, deleting = false;
(function type() {
  const word = phrases[p];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else { deleting = false; p = (p + 1) % phrases.length; }
  setTimeout(type, deleting ? 40 : 90);
})();

// Navbar: efek scroll, menu mobile, link aktif, tombol ke atas
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');
const toTop = document.getElementById('toTop');
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));

document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
links.forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 30);
  toTop.classList.toggle('show', scrollY > 500);
  const pos = scrollY + 140;
  sections.forEach((s, i) => links[i].classList.toggle('active', s.offsetTop <= pos && s.offsetTop + s.offsetHeight > pos));
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// Lightbox galeri
const box = document.getElementById('lightbox');
const boxImg = box.querySelector('img');
const boxCap = box.querySelector('p');
document.querySelectorAll('.masonry figure').forEach(fig => {
  fig.addEventListener('click', () => {
    boxImg.src = fig.querySelector('img').src;
    boxCap.textContent = fig.querySelector('figcaption').textContent;
    box.classList.add('open');
  });
});
box.addEventListener('click', () => box.classList.remove('open'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('open'); });
