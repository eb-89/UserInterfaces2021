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


        let item = $('<div class="item-inner"></div>');
        item.append($('<div class="item-name">Password of combination lock</div>'));
        item.append($('<div class="item-desc">' + this.getPassword() + '</div>'));
        $(content).append(item);

        item = $('<div class="item-inner"></div>');
        item.append($('<div class="item-name">account balance</div>'));
        item.append($('<div class="item-desc">' + 1234 + '</div>'));
        $(content).append(item);


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