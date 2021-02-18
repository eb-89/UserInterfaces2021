/**
 * This page will create all the content of the About Us-page (views/aboutus.js)
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
                            '<p>Detta är ett projekt i Gränssnittsprogrammering av 5 studenter på Uppsala Universitet.</p>'+
                        '</div>');
        return content;
    }
}