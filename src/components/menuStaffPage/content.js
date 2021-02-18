/**
 * This page will create all the content of the Menu bartender/manager page (views/menustaff.js)
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
                            '<p>Menu Staff test</p>'+
                        '</div>');
        return content;
    }
}