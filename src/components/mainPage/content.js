/**
 * This page will create all the content of the mainPage (main.js)
 */

export default class Content {
    constructor() {
    }

    init = () => {
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createProductBox());
        return content;
    }

    createProductBox = () => {
        var content = $('<div class="product-list"></div>');
        return content;
    }
}