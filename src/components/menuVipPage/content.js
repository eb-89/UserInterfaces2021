/**
 * This page will create all the content of the Menu VIP-page (views/menuvip.js)
 */

import Product from "../mainPage/content.js";

export default class Content {
    constructor() {
    }

    init = () => {
        this.user = window.Database.DB.users[0] // TODO update the user id
        this.product = new Product();
        this.product.init();
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createInformationBox());
        $(content).append(this.product.createFilteringOptions());
        $(content).append(this.product.createProductMenu());
        return content;
    }

    createInformationBox = () => {

        const content = $('<div class="vip-page-container"></div>');

        let inner = $('<div class="inner-item"></div>');
        inner.append($('<div class="item-name title bold">Password of combination lock</div>'));
        inner.append($('<div class="item-desc title">' + this.getPassword() + '</div>'));

        $(content).append(inner);

        let balance = JSON.parse(localStorage.getItem('loggedInUser')).balance;
        inner = $('<div class="inner-item"></div>');
        inner.append($('<div class="item-name title bold">Account balance</div>'));
        inner.append($('<div class="item-desc title">' + balance + '</div>'));

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