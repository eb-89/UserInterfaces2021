/**
 * This is the first javascript file that runs when entering the website, it controlls the flow
 */

import Router from "./views/router.js";
import MainPage from "./views/main.js";
import ProductsPage from "./views/aboutus.js";

export default class App {
    constructor() {
        this.router = new Router([
            {path: '/', component: MainPage, title: "Produkter"},
            {path: '/om-oss', component: ProductsPage, title: "Om Oss"},
        ]);
        this.state = JSON.parse(localStorage.getItem('state')) || {};
    }

    init = () => {
        this.router.init();

        window.onbeforeunload = () =>  {
            localStorage.setItem('state', JSON.stringify(this.state));
        }
    }
}