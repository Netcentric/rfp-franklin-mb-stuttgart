const arrowIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 11.263V8.737h15.152L8.207 1.793 10 0l10 10-10 10-1.793-1.793 6.945-6.944z"></path></svg>';

function getIcon(iconKey) {
  switch (iconKey) {
    case 'contact':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.4 46"><path d="M32.9 21.1.9 0h64.6L32.9 21.1zM0 4.8l32.9 21.8L66.4 4.7V46H0V4.8z"></path></svg>';
    case 'service-appointment':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.464 92"><path d="M117.795 51.685a17.86 17.86 0 0 0 3.869-5.292l4.818-10.307-2.212-2.124-8.118 8.213-.005.005a9.275 9.275 0 0 1-13.107-13.103l.005-.005 8.165-8.165-2.077-2.165-10.3 4.824a17.9 17.9 0 0 0-5.3 3.862l-.013-.013a16.23 16.23 0 0 0-3.44 17.318L55.359 79.454a7.36 7.36 0 1 0 10.408 10.408l34.719-34.719A16.232 16.232 0 0 0 117.8 51.7zM58.426.018h5.466v10.629h-5.466zm-21.865 0h5.365v10.629h-5.365z"></path><path d="M78.267 48.856V6.091h-10.73v7.693H54.782V6.091H45.57v7.693H32.816V6.091H23.6v7.693H10.849V6.091H.017v56.486h64.529zm-56.992 6.432H10.849v-8.3h10.426zm0-11.844H10.849v-8.5h10.426zm0-11.945H10.849V23.2h10.426zm15.286 23.789H26.236v-8.3h10.325zm0-11.844H26.236v-8.5h10.325zm0-11.945H26.236V23.2h10.325zm15.387 23.789H41.42v-8.3h10.528zm0-11.844H41.42v-8.5h10.528zm0-11.945H41.42V23.2h10.528zm4.859-8.3h10.325v8.3H56.806zm0 11.742h10.325v8.5H56.806z"></path><path d="M14.594.018h5.365v10.629h-5.365z"></path></svg>';
    case 'login':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.3 69.2"><path d="M35.7 50.9v7.6h22.1V10.7H35.7v7.1L25.5 10V0h42.8v69.2H25.5V58.7l10.2-7.8zM19 28.1h6.5v-9l20.3 15.3-20.3 15.3V40h-7.8C9.2 40 3.2 41.1.9 47.9H0c0-10 6.6-19.8 19-19.8z"></path></svg>';
    default:
      return '';
  }
}

function getLink(element) {
  return (element && element.getAttribute('href')) || '';
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    const anchor = document.createElement('a');

    const content = row.children[1].innerHTML;
    const linkHref = getLink(row.children[0].querySelector('a'));

    anchor.setAttribute('href', linkHref);

    anchor.innerHTML = `
    <div class="list__icon">
      ${getIcon(row.children[0].textContent)}
    </div>
    <div class="list__content">
      ${content}
    </div>
    <div class="list__arrow-icon">${arrowIcon}</div>
    `;

    li.append(anchor);

    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
