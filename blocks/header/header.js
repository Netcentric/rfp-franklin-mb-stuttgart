import template from './template.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.innerHTML = template();

  const homeLink = { path: '/', title: 'Homepage' };
  const linksPath = '/offers/query-index.json';
  const linksResponse = await fetch(linksPath);
  const linksData = await linksResponse.json();
  const links = [homeLink, ...linksData.data];

  block.innerHTML = template({ links });
}
