import Error404 from './components/error/Error404.js';
import Utils from './services/Utils.js';



// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
class Router {
    constructor(routes, el) {
        this.routes = routes;
        this.el = el;
        // Listen on hash change:     //window.addEventListener('hashchange', router);
        window.onhashchange = this.hashChanged.bind(this);
        // Listen on page load:      //window.addEventListener('load', router);
        this.hashChanged();
    }


    async show(pageName) {
        const content = null || document.getElementById('page_container');
        
        // Get the parsed URl from the addressbar
        let request = Utils.parseRequestURL();

        //// Parse the URL and if it has an id part, change it with the string ":id"
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');

        // Get the page from our hash of supported routes.
        // If the parsed URL is not in our list of supported routes, select the 404 page instead
        let page = this.routes[parsedURL] ? this.routes[parsedURL] : Error404;
        content.innerHTML = await page.render();
        await page.after_render();
    }

    async hashChanged(ev) {
        if (window.location.hash.length > 0) {
            const pageName = window.location.hash.substr(1);
            this.show(pageName);
        } else if (window.location.pathname === '/') {
            this.show('home');
        } else if (this.routes['#default']) {
            this.show('home');
        }
    }
}

export default Router;