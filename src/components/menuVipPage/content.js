/**
 * This page will create all the content of the Menu VIP-page (views/menuvip.js)
 */

export default class Content {
    constructor() {
    }

    init = () => {
        this.user = window.Database.DB.users[0] // TODO update the user id
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createInformationBox());
        return content;
    }

    createInformationBox = () => {

        const content = $('<div class="vip-page-container"></div>');

        let inner = $('<div class="inner-item"></div>');
        inner.append($('<div class="item-name title bold">Password of combination lock</div>'));
        inner.append($('<div class="item-desc title">' + this.getPassword() + '</div>'));

        $(content).append(inner);


        inner = $('<div class="inner-item"></div>');
        inner.append($('<div class="item-name title bold">Account balance</div>'));
        inner.append($('<div class="item-desc title">' + 1234 + '</div>'));

        $(content).append(inner);

        // var content = $('<div class="info-page-container">' +
        //                     '<p>Menu VIP test</p>'+
        //                 '</div>');

        return content;
    }

    getPassword = () => {
        const d = new Date();
        const month = d.getMonth()+1;
        const day = d.getDate();
        return (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day;
    }
}