/**
 * This is the first javascript file that runs when entering the website, it controlls the flow
 */

import Router from "./views/router.js";
import MainPage from "./views/main.js"; // MainPage is the Product page since it's the home page.
import AboutUsPage from "./views/aboutus.js";
import LogInPage from "./views/login.js";
import SecurityPage from "./views/security.js";
import SecurityAdminPage from "./views/securityAdmin.js";
import OrdersPage from "./views/orders.js";
import ProductsPage from "./views/products.js";
import MenuVipPage from "./views/menuvip.js";
import MenuStaffPage from "./views/menustaff.js";
import { DB } from "./db/DBLoaded.js"; // the import {DB}/{DB2} is a new way of importing (constants) from ES6 which is the latest JavaScript
import { DB2 } from "./db/Beverages.js";
import SecurityData from "./db/SecurityData.js";
import Database from "./db/database.js";

import Lang from "./lang/lang.js";

window.Database = null;

export default class App {
    constructor() {
        this.router = new Router([
            { path: "/", component: MainPage, title: "Produkter" },
            { path: "/om-oss", component: AboutUsPage, title: "Om Oss" },
            { path: "/log-in", component: LogInPage, title: "Log in" },
            { path: "/security", component: SecurityPage, title: "Security" },
            { path: "/securityAdmin", component: SecurityAdminPage, title: "Security" },
            { path: "/orders", component: OrdersPage, title: "Orders" },
            { path: "/products", component: ProductsPage, title: "Products" },
            { path: "/menu-vip", component: MenuVipPage, title: "Menu VIP" },
            {
                path: "/menu-staff",
                component: MenuStaffPage,
                title: "Menu Staff",
            },
        ]);
        this.state = JSON.parse(localStorage.getItem("state")) || { users: DB };

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
