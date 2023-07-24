import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

const arrowTopIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.566 9.192l1.414-1.414 7.071 7.07-1.414 1.415z"></path><path d="M4.949 14.808l7.07-7.07 1.415 1.414-7.07 7.07z"></path></svg>';

function getScrollToTopBlock() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('scrollToTop__wrapper');

  const button = document.createElement('button');
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  button.innerHTML = `
    <div>
      <div>
        ${arrowTopIcon}
      </div>
      <div><span>Nach Oben</span></div>
    </div>
    `;

  wrapper.append(button);

  return wrapper;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);

    const scrollToTopBlock = getScrollToTopBlock();
    footer.prepend(scrollToTopBlock);

    block.append(footer);
  }
}
