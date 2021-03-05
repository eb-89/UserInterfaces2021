/**
 * This page will create all the content of the Menu bartender/manager page (views/menustaff.js)
 */

import Pagination from "../pagination.js";
import Card from "../card.js";

export default class Content {
    constructor() {
        this.data = window.Database.allBeveragesMoreDetailed(); // Fetches the data from the JSON-obj. (Simulate how it would work in real world)
        this.products_per_page = 16; // Amount of products per page
        this.pagination = new Pagination(this.data.length, this.products_per_page); // Send length of data (this.data.length) and amounts of products (this.products_per_page) that will be visible per page
        this.card = new Card();
    }

    init = () => {
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createFilteringOptions());
        $(content).append(this.createProductMenu());
        return content;
    }

    /**
     * Creates the filtering option element
     * @returns Filtering option element
     */
    createFilteringOptions = () => {
        let filter_wrp = $('<div class="filter-wrp"></div>');
        let pagionation_wrp = $('<div class="pagination-wrp"></div>');
        $(filter_wrp).append(this.pagination.createPagination(pagionation_wrp, this.updateProductView));

        return filter_wrp;
    }

    /**
     * Creates the box containing all the product cards
     * @returns A box containing multiple product cards
     */
    createProductMenu = () => {
        let content = $('<div id="product-container"></div>');
        let pagination_settings = this.pagination.getSpan();
        for(let i = pagination_settings.from; i < pagination_settings.to; i++){
            $(content).append(this.card.createProductCard(this.data[i]));
        }
        return content;
    }

    /**
     * Updates the product view, which items to see when changing page
     * @param {int} from
     * @param {int} to 
     */
    updateProductView = (from, to) => {
        let elem = $('#product-container');
        let current_page_counter = $('#currPage');
        let next_btn = $('#nextPage');
        let prev_btn = $('#prevPage');
        $(elem).empty();
        $(current_page_counter).text(this.pagination.getPage());

        if(from == 0){
            $(prev_btn).addClass('disabled');
        }
        else{
            $(prev_btn).removeClass('disabled');
        }

        if(to == this.pagination.totalAmountPages()){
            $(next_btn).addClass('disabled');
        }
        else {
            $(next_btn).removeClass('disabled');
        }

        for(let i = from; i < to; i++){
            $(elem).append(this.card.createProductCard(this.data[i]));
        }
    }
}