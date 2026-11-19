(() => {
  const dropdown = document.querySelector('.download-dropdown');
  if (!dropdown) return;
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) dropdown.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !dropdown.open) return;
    const restoreFocus = dropdown.contains(document.activeElement);
    dropdown.open = false;
    if (restoreFocus) dropdown.querySelector('summary').focus();
  });
  dropdown.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => { dropdown.open = false; });
  });
  document.querySelector('#menu').addEventListener('click', () => {
    dropdown.open = false;
  });
})();
