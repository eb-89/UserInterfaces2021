/**
 * This is the menu VIP page: initializing and renders the page
 */
import Header from "../components/header.js";
import Page from "../components/page.js";
import Content from "../components/menuVipPage/content.js";
import Product from "../components/mainPage/content.js";

export default class MenuVipPage {
    constructor() {
        this.header = new Header('menu VIP');
        this.page = new Page();
        this.content = new Content();
        this.product = new Product();
    }

    /**
     * Initializes relevant components to the page
     */
    init = () => {
        this.page.init();
        this.header.init();
        this.content.init();
        this.product.init();
    }

    /**
     * Run everything that has to do with rendering
     */
    render = () => {
        var page = this.page.render();
        page.append(this.header.render());
        page.append(this.content.render());
        page.append(this.product.render());
        return page;
    }
}