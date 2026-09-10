const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.site-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideos = [...document.querySelectorAll('.hero-video')];

const applyMotionPreference = () => {
  heroVideos.forEach((video) => {
    if (reduceMotion.matches) {
      video.pause();
      video.currentTime = 0;
    } else {
      video.play().catch(() => {});
    }
  });
};

applyMotionPreference();
reduceMotion.addEventListener?.('change', applyMotionPreference);

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.archive-card')];
const noResults = document.querySelector('.no-results');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    let visible = 0;
    cards.forEach((card) => {
      const categories = (card.dataset.categories || '').split(',');
      const show = filter === 'all' || categories.includes(filter);
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (noResults) noResults.hidden = visible !== 0;
  });
});
