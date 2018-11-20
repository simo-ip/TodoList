import * as ko from 'knockout';
import * as History from 'history';
import { Route, Router } from '../../router';
import navMenu from '../nav-menu/nav-menu';

// Declare the client-side routing configuration
const routes: Route[] = [
    { url: '',              params: { page: 'home-page' } },
    { url: 'about',       params: { page: 'about' } },
    { url: 'contact',    params: { page: 'contact' } },
    { url: 'todo/{:id}',          params: { page: 'todo-list' } }
];

class AppRootViewModel {
    public route: KnockoutObservable<Route>;
    public router: Router;

    constructor(params: { history: History.History, basename: string }) {
        // Activate the client-side router
        this.router = new Router(params.history, routes, params.basename);
        this.route = this.router.currentRoute;

        // Load and register all the KO components needed to handle the routes
        // The optional 'bundle-loader?lazy!' prefix is a Webpack feature that causes the referenced modules
        // to be split into separate files that are then loaded on demand.
        // For docs, see https://github.com/webpack/bundle-loader
        ko.components.register('nav-menu', navMenu);
        ko.components.register('home-page', require('bundle-loader?lazy!../home-page/home-page'));
        ko.components.register('about', require('bundle-loader?lazy!../about/about'));
        ko.components.register('contact', require('bundle-loader?lazy!../contact/contact'));
        ko.components.register('todo-list', require('bundle-loader?lazy!../todo-list/todo-list'));
    }

    // To support hot module replacement, this method unregisters the router and KO components.
    // In production scenarios where hot module replacement is disabled, this would not be invoked.
    public dispose() {
        this.router.dispose();

        // TODO: Need a better API for this
        Object.getOwnPropertyNames((<any>ko).components._allRegisteredComponents).forEach(componentName => {
            ko.components.unregister(componentName);
        });
    }
}

export default { viewModel: AppRootViewModel, template: require('./app-root.html') };
