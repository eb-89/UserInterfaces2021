/**
 * This file creates the pagination functionality
 *
 * Inspiration for solution: http://jsfiddle.net/Lzp0dw83/
 */

export default class Pagination {
    constructor(total_products, per_page) {
        this.current_page = 1;
        this.total_products = total_products;
        this.products_per_page = per_page;
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

    /**
     * Creates the pagination options on a page
     * @param {element} elem 
     * @param {function} prev_func 
     * @param {function} next_func
     * @returns The pagination element
     */
    createPagination = (elem, func) => {
        let counter_wrp = $('<div class="page-counter-text-wrp"></div>')

        let currPage = this.getPage();
        let totalPages = this.totalAmountPages();

        let prev_page_btn = $('<div id="prevPage" class="button noselect button-on-dark title disabled">Prev</div>');
        let page_counter = $('<div id="currPage" class="page-counter-text">' + currPage + '</div>...<div class="page-counter-text">' + totalPages + '</div>');
        let next_page_btn = $('<div id="nextPage" class="button noselect button-on-dark title">Next</div>');

        $(counter_wrp).append(page_counter);

        $(next_page_btn).on('click', () => {
            this.nextPage();
            let pagination_settings = this.getSpan();
            func(pagination_settings.from, pagination_settings.to);
        });

        $(prev_page_btn).on('click', () => {
            this.previousPage();
            let pagination_settings = this.getSpan();
            func(pagination_settings.from, pagination_settings.to);
        });

        $(elem).append(prev_page_btn);
        $(elem).append(counter_wrp);
        $(elem).append(next_page_btn);

        return elem;
    }
}
