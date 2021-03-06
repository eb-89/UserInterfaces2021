/**
 * This page will create all the content of the Products-page (views/products.js)
 * This page is used for the manager to manage the products (Refill/Revise/Removal/Add etc)
 */

export default class Content {
    constructor() {
    }

    init = () => {
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createInformationBox());
        return content;
    }

    createInformationBox = () => {
        var content = $('<div class="info-page-container">' +
                            '<p>Products test</p>'+
                        '</div>');
        return content;
    }
}