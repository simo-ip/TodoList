import Home from './components/home/home.js';
import About from './components/about/about.js';
import Contact from './components/contact/contact.js';
import Todo from './components/todo/todo.js';

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home
    , '/about': About
    , '/contact': Contact
    , '/todo': Todo
    , '/todo/:id': Todo
    , '/default': Home
};
export default routes;