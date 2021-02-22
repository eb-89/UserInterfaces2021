/**
 * This page will create all the content of the SecurityAdmin-page (views/security.js)
 */

export default class Content {
    constructor() {
    }

    init = () => {
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createInformationBox());

        let sec = window.SecurityData;

        let ret = sec.registerInsertCallback(() => {
            console.log("from callback")
        })
        ret.unsubscribe()

        return content;
    }

    createInformationBox = () => {
        var content = $('<div class="info-page-container">' +
                            '<p>Products dasdasd</p>'+
                        '</div>');
        return content;
    }
}