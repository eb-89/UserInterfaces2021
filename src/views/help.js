/**
 * This is the About us-page: initializing and renders the content of the page
 */
import Header from "../components/header.js";
import Page from "../components/page.js";
import Content from "../components/helpPage/content.js";

export default class AboutUsPage {
    constructor() {
        this.header = new Header('Help');
        this.page = new Page();
        this.content = new Content();
    }

    init = () => {
        this.page.init();
        this.header.init();
        this.content.init();
    }

    render = () => {
        var page = this.page.render();
        page.append(this.header.render());
        page.append(this.content.render());
        return page;
    }
}