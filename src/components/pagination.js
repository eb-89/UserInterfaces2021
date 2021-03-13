/**
 * This file creates the pagination functionality
 *
 * Inspiration for solution: http://jsfiddle.net/Lzp0dw83/
 */

import Swipe from "./swipe.js";

export default class Pagination {
    constructor(total_products, per_page) {
        this.current_page = 1;
        this.total_products = total_products;
        this.products_per_page = per_page;
        this.swiper = new Swipe('#root');
    }

    // Reduces the current page
    previousPage = () => {
        if (this.current_page > 1) {
            this.current_page -= 1;
        }
    };

    // Iterates the current page
    nextPage = () => {
        if (this.current_page < this.totalAmountPages()) {
            this.current_page += 1;
        }
    };

    // Calculates and returns the total amount of pages
    totalAmountPages = () => {
        return Math.ceil(this.total_products / this.products_per_page);
    };

    // Returns the current page
    getPage = () => {
        return this.current_page;
    };

    // Returns the span of the indices to render
    getSpan = () => {
        let from = Number((this.current_page - 1) * this.products_per_page);
        let to = Number(this.current_page * this.products_per_page);

        return { from: from, to: to };
    };
    
    // Update the total products amount
    updateTotalProducts = (value) => {
        this.total_products = value;
    }

    // Update the amount of products visible on the page
    updateProductsPerPage = (value) => {
        this.products_per_page = value;
    }

    /**
     * Creates the pagination options on a page
     * @param {element} elem 
     * @param {function} prev_func 
     * @param {function} next_func
     * @returns The pagination element
     */
    createPageCounter = (elem) => {
        let counter_wrp = $('<div class="page-counter-text-wrp"></div>')

        let currPage = this.getPage();
        let totalPages = this.totalAmountPages();

        let page_counter = $('<div id="currPage" class="page-counter-text">' + currPage + '</div>...<div class="page-counter-text">' + totalPages + '</div>');

        $(counter_wrp).append(page_counter);

        $(elem).append(counter_wrp);

        return elem;
    }

    /**
     * Creates the element that changes page to the previous one
     * @param {element} elem 
     * @param {function} func 
     * @returns The PREVIOUSPAGE button
     */
    createPrev = (elem, func) => {
        let prev_page_btn = $('<div id="prevPage" class="pagination-button noselect button-on-dark title disabled"><span data-textid="pagination-prev"></span></div>');

        window.lang.generateStrings(prev_page_btn);

        this.createSwipe(func, this.previousPage, null, this.getSpan);

        $(prev_page_btn).on('click', () => {
            this.previousPage();
            let pagination_settings = this.getSpan();
            func(pagination_settings.from, pagination_settings.to);
        });


        $(elem).append(prev_page_btn);
        return elem;
    }
    /**
     * Creates the element that changes page to the next one
     * @param {element} elem 
     * @param {function} func 
     * @returns The NEXTPAGE button
     */
    createNext = (elem, func) => {
        let next_page_btn = $('<div id="nextPage" class="pagination-button noselect button-on-dark title"><span data-textid="pagination-next"></span></div>');

        window.lang.generateStrings(next_page_btn);

        this.createSwipe(func, null, this.nextPage, this.getSpan);

        $(next_page_btn).on('click', () => {
            this.nextPage();
            let pagination_settings = this.getSpan();
            func(pagination_settings.from, pagination_settings.to);
        });

        $(elem).append(next_page_btn);
        return elem;
    }
    /**
     * Creates the functionality to switch page by swiping the screen
     * @param {function} func 
     * @param {function} prev_func 
     * @param {function} next_func 
     * @param {function} getspan_func 
     * @returns nothing
     */
    createSwipe = (func, prev_func, next_func, getspan_func) => {
        if(prev_func != null){
            this.swiper.onRight(function() {
                prev_func();
                let pagination_settings = getspan_func();
                func(pagination_settings.from, pagination_settings.to);
            });
        }

        if(next_func != null){
            this.swiper.onLeft(function() { 
                next_func();
                let pagination_settings = getspan_func();
                func(pagination_settings.from, pagination_settings.to);
            });
        }
        this.swiper.run();
    }
}
