// Overrides the default history.pushState (from using 3 arguments when calling it, to 2 arguments since we will probably not use 3 arguments)
(function(history){
    var pushState = history.pushState;
    history.pushState = function(state, path) {
        if (typeof history.onpushstate == "function") {
            history.onpushstate({state, title: state, path});
        }
        return pushState.apply(history, [state, state, path]);
    };
})(window.history);

// Handles route changes and rendering for the current route
export default class Router {
    constructor(routes) {
        this.path = "";
        this.routes = routes
    }

    init = () => {
        this.path = window.location.pathname;
        this.render();

        // Arrowfunction does not bind a new 'this'
        // Subscribes on pushstate
        history.onpushstate = this.handleRouteChange;
        window.onpopstate = (e) => {
            this.handleRouteChange({state: e.state, title: e.state, path: e.target.location.pathname});
        }
    }

    // Handles route changes
    handleRouteChange = e => {
        if (e.path && e.path !== this.path) {
            this.path = e.path;
            this.render();
        }
    }

    // Updates the title when changing page
    updateTitle = title => {
        document.title = title + " - The Flying Dutchman";
    }

    // Renders the current route
    render = () => {
        // Clears the screen
        $('#root').empty();
        var content = $('<div>404 unkown path ' + this.path + ' </div>');

        // Loops all the routes and check if any matches the current path
        for(var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            if(route.path === this.path) {
                // Initializes the route's component
                var page = new route.component();
                if(typeof page.init == "function") {
                    page.init();
                }
                content = page.render();
                this.updateTitle(route.title);
            }
        }

        // Renders to the screen
        $('#root').append(content);
    }
}