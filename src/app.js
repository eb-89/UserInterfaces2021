/**
 * This is the first javascript file that runs when entering the website, it controlls the flow
 */


import Router from "./views/router.js"; // Handles switching between pages
import MainPage from "./views/main.js"; // MainPage is the Product page since it's the home page. The product page is run by card.js, which writes the content based on the user logged in
import HelpPage from "./views/help.js"; // Help-page, place where you can learn how to use the system
import LogInPage from "./views/login.js"; // The page where you login
import SecurityPage from "./views/security.js"; // Report a security issue
import SecurityAdminPage from "./views/securityAdmin.js"; // See the reported security issues
import OrdersPage from "./views/orders.js"; // See and manage current orders
import ProductsPage from "./views/products.js"; // The manager can manage the products (order refill, revise stock, add/remove products etc)

import { DB } from "./db/DBLoaded.js"; // database containing user data
import { DB2 } from "./db/Beverages.js"; // database containing beverages
import SecurityData from "./db/SecurityData.js"; // database containing reported security issues
import Database from "./db/database.js"; // database functions
import OrdersData from "./db/OrdersData.js";

import Lang from "./lang/lang.js";

window.Database = null;

export default class App {
    constructor() {
        this.router = new Router([
            { path: "/", component: MainPage, title: "Produkter" },
            { path: "/help", component: HelpPage, title: "Hjälp" },
            { path: "/log-in", component: LogInPage, title: "Log in" },
            { path: "/security", component: SecurityPage, title: "Security" },
            { path: "/securityAdmin", component: SecurityAdminPage, title: "Security" },
            { path: "/orders", component: OrdersPage, title: "Orders" },
            { path: "/products", component: ProductsPage, title: "Products" },
        ]);
        this.state = JSON.parse(localStorage.getItem("state")) || { users: DB };

        /**
         * Sets the localstorage variable 'loggedInUser' to empty string from the beginning.
         */
        localStorage.setItem('loggedInUser', '');

        /**
         * Sets a global variable "window.Database" which holds the functions that communicates with the DB/DB2-files.
         * Needs to be executed in the constructor, because if main.js wanted to access the Database it started executing main.js before it executed app.init() (the init-function of app.js)
         */
        window.Database = new Database(this.state.users, DB2);

        /**
         * Security Data
         */
        window.SecurityData = new SecurityData();

        /**
         * Orders Data
         */
        window.OrdersData = new OrdersData();

        /**
         * Language object
         */
        window.lang = new Lang();
    }

    init = () => {
        this.router.init();

        window.onbeforeunload = () => {
            localStorage.setItem("state", JSON.stringify(this.state));
        };
    };
}
