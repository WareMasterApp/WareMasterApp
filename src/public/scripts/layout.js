import { getLastUpdate, getYear } from './utils.js';

const handleMenu = () => {
  const menu = document.getElementById('menu');
  const icon = document.getElementById('menu-icon');
  if (menu.classList.contains('menu-open')) {
    menu.classList.remove('menu-open');
    icon.innerHTML = 'menu';
  } else {
    menu.classList.add('menu-open');
    icon.innerHTML = 'close';
  }
};

document.getElementById('menu-btn').addEventListener('click', handleMenu);

// Footer
document.getElementById('current-year').innerHTML = getYear();
document.getElementById(
  'last-modified'
).innerHTML = `Last Modification: ${getLastUpdate()}`;
