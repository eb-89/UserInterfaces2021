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
}
