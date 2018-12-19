import Page from './page.js';
import Router from './router.js';


const r = new Router(
  {
    about: new Page('about.html'),
    home: new Page('home.html'),
    '#default': new Page('menu.html')
  },
  document.querySelector('main')
);
