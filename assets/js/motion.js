(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;

  // Progressive enhancement: content stays visible if observers are unavailable.
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.intro:not(.about-intro), .hero, .section-heading, .card, .about > div, .contact, .project-images img, .about-intro > *, .about-profile figure, .about-profile > div > *, .resume-section > div:first-child, .background-items > article, .tool-groups > div, .tool-list > li');
  document.querySelectorAll('.about-intro, .about-profile > div, .tool-groups, .tool-list').forEach(group => {
    Array.from(group.children).forEach((child,index) => {
      child.style.setProperty('--reveal-delay',`${Math.min(index*80,320)}ms`);
    });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  function reveal(element) {
    if (element.dataset.motionReady) return;
    element.dataset.motionReady = 'true';
    element.classList.add('reveal');
    observer.observe(element);
  }
  targets.forEach(reveal);

  // Filtering replaces cards; observe those new elements as well.
  const grid = document.querySelector('#project-grid');
  const mutations = grid ? new MutationObserver(() => grid.querySelectorAll('.card').forEach(reveal)) : null;
  mutations?.observe(grid, { childList: true });

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    mutations?.disconnect();
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  });
})();
