/**
 * This is the main page: initializing and renders the page
 */
import Header from "../components/header.js";
import Page from "../components/page.js";

export default class MainPage {
    constructor() {
        this.header = new Header('main');
        this.page = new Page();
    }

    /**
     * Initializes relevant components to the page
     */
    init = () => {
        this.page.init();
        this.header.init();
    }

    /**
     * Run everything that has to do with rendering
     */
    render = () => {
        var page = this.page.render();
        page.append(this.header.render());
        return page;
    }
}