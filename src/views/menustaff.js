/**
 * This is the menu staff page: initializing and renders the page
 */
import Header from "../components/header.js";
import Page from "../components/page.js";
import Content from "../components/menuStaffPage/content.js";

export default class MenuStaffPage {
    constructor() {
        this.header = new Header('menu Staff');
        this.page = new Page();
        this.content = new Content();
    }

    /**
     * Initializes relevant components to the page
     */
    init = () => {
        this.page.init();
        this.header.init();
        this.content.init();
    }

    /**
     * Run everything that has to do with rendering
     */
    render = () => {
        var page = this.page.render();
        page.append(this.header.render());
        page.append(this.content.render());
        return page;
    }
}