let observer: MutationObserver | undefined;
const dismissed = new WeakSet<Element>();

const closeDropdown = (searchbox: Element) => {
  const input = searchbox.querySelector<HTMLInputElement>('.pf-searchbox-input[aria-expanded="true"]');
  if (!input) return;
  dismissed.add(searchbox);
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
};

const sizeDropdown = (searchbox: Element) => {
  const container = searchbox.closest<HTMLElement>('.aw-search-container');
  const input = searchbox.querySelector<HTMLInputElement>('.pf-searchbox-input');
  if (!container || !input) return;
  const viewport = window.visualViewport;
  const bottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
  container.style.setProperty('--aw-search-available-height', `${Math.max(0, bottom - input.getBoundingClientRect().bottom - 8)}px`);
};

const observeSearchbox = () => {
  observer?.disconnect();
  const searchbox = document.querySelector('pagefind-searchbox');
  if (!searchbox) return;

  observer = new MutationObserver(() => {
    if (dismissed.has(searchbox)) closeDropdown(searchbox);
    else sizeDropdown(searchbox);
  });
  observer.observe(searchbox, { subtree: true, attributes: true, attributeFilter: ['class'] });
  sizeDropdown(searchbox);
};

document.addEventListener('astro:page-load', observeSearchbox);
document.addEventListener('astro:before-swap', () => observer?.disconnect());

document.addEventListener('input', (event) => {
  if (event.target instanceof Element) {
    const searchbox = event.target.closest('pagefind-searchbox');
    if (searchbox) dismissed.delete(searchbox);
  }
}, true);

document.addEventListener('keydown', (event) => {
  if (!(event.target instanceof Element) || event.isComposing) return;
  const searchbox = event.target.closest('pagefind-searchbox');
  if (!searchbox) return;
  if (event.key === 'Escape') dismissed.add(searchbox);
  if (event.key === 'ArrowDown' || event.key === 'Enter') dismissed.delete(searchbox);
}, true);

document.addEventListener('click', (event) => {
  const searchbox = document.querySelector('pagefind-searchbox');
  if (searchbox && event.target instanceof Node && !searchbox.contains(event.target)) {
    closeDropdown(searchbox);
  }
}, true);

window.addEventListener('scroll', () => {
  const searchbox = document.querySelector('pagefind-searchbox');
  if (searchbox) closeDropdown(searchbox);
}, { passive: true });

const resizeDropdown = () => {
  const searchbox = document.querySelector('pagefind-searchbox');
  if (searchbox) sizeDropdown(searchbox);
};

window.addEventListener('resize', resizeDropdown, { passive: true });
window.visualViewport?.addEventListener('resize', resizeDropdown, { passive: true });
window.visualViewport?.addEventListener('scroll', resizeDropdown, { passive: true });
