/**
 * This page will create all the content of the Log in-page (views/login.js)
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
                            '<p>Log in test</p>'+
                        '</div>');
        return content;
    }
}