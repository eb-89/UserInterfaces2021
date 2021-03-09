/**
 * This page will create all the content of the mainPage (main.js)
 */
import Pagination from "../pagination.js";
import Card from "../card.js";

export default class Content {
    constructor() {
        this.data = window.Database.allBeveragesMoreDetailed(); // Fetches the data from the JSON-obj. (Simulate how it would work in real world)
        this.drink_types = window.Database.beverageTypes(); // Fetches the different drink types
        this.products_per_page = 15; // Amount of products per page
        this.pagination = new Pagination(
            this.data.length,
            this.products_per_page
        ); // Send length of data (this.data.length) and amounts of products (this.products_per_page) that will be visible per page
        this.card = new Card();
    }

    init = () => {
        this.pagination.createSwipe(this.updateProductView);
    };

    render = () => {
        let content = $('<div class="content-container"></div>');
        $(content).append(this.createFiltering());
        $(content).append(this.createContentBox());
        return content;
    };

    createContentBox = () => {
        let content = $('<div class="main-content-wrp"></div>');

        let pagination_left = $('<div id="pagination-left"></div>');
        let pagination_right = $('<div id="pagination-right"></div>');

        $(content).append(
            this.pagination.createPrev(pagination_left, this.updateProductView)
        );
        $(content).append(this.createProductMenu());
        $(content).append(
            this.pagination.createNext(pagination_right, this.updateProductView)
        );

        return content;
    };

    /**
     * Creates the filtering option element
     * @returns Filtering option element
     */
    createFiltering = () => {
        let filter_wrp = $('<div class="filter-wrp"></div>');
        let page_counter = $('<div id="page-counter" class="pagination-wrp"></div>');

        $(filter_wrp).append(this.createProductsPerPage());

        $(filter_wrp).append(this.pagination.createPageCounter(page_counter));

        $(filter_wrp).append(this.createFilteringOptions());

        $(filter_wrp).append(this.createResetFiltering());

        return filter_wrp;
    };

    createResetFiltering = () => {
        let reset_btn = $(
            '<div class="dropdown-btn noselect"><span data-textid="dropdown-reset"></span></div>'
        );

        $(reset_btn).on('click', () => {
            this.data = window.Database.allBeveragesMoreDetailed();
            this.products_per_page = 15;
            this.pagination.updateTotalProducts(this.data.length);
            this.pagination.updateProductsPerPage(this.products_per_page);

            setTimeout( () => {
                this.updateProductView(0, this.getProductsPerPage());
            }, 150); // Bad solution to achieve the wanted effect of making the system wait for the products to filter
        });

        window.lang.generateStrings(reset_btn);

        return reset_btn;
    }

    /**
     * Creates the dropdown for filtering on beverage types
     * @returns Dropdown with filtering options on beverages
     */
    createFilteringOptions = () => {
        let dropdown = $('<div class="dropdown-wrp"></div>');
        let dropdown_btn = $(
            '<div class="dropdown-btn noselect"><span data-textid="dropdown-filter"></span></div>'
        );
        let dropdown_content = $(
            '<div id="dropdown-filter" class="dropdown-content scrollable">' +
                '<input type="text" placeholder="Search.." id="dropdown-search"/>'+
            '</div>'
        );

        for(let i = 0; i < this.drink_types.length; i++){
            let dropdown_option = $('<div value="' + this.drink_types[i] + '" class="dropdown-text">'+ this.drink_types[i] +'</div>');
            $(dropdown_content).append(dropdown_option);
        }
        $(dropdown).append(dropdown_btn);
        $(dropdown).append(dropdown_content);

        $(dropdown_btn).on("click", function () {
            if ($(dropdown_content).hasClass("show")) {
                $(dropdown_content).removeClass("show");
            } else {
                $(dropdown_content).addClass("show");
            }
        });

        $(dropdown_content).find('#dropdown-search').on('keyup', () => {
            let input = $(dropdown_content).find('#dropdown-search');
            let filter = $(input).val().toUpperCase();
            let options = $(dropdown_content).children('div');
            for(let i = 0; i < options.length; i++){
                let textValue = options[i].textContent || options[i].innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    options[i].style.display = "";
                } else {
                    options[i].style.display = "none";
                }
            }
        });

        $(dropdown_content).find('.dropdown-text').on('click', (event) => {
            let value = $(event.currentTarget).attr('value');
            this.data = window.Database.allBeveragesMoreDetailed(value);
            this.pagination.updateTotalProducts(this.data.length);
            setTimeout( () => {
                this.updateProductView(0, this.getProductsPerPage());
                $(dropdown_content).removeClass('show');
            }, 150); // Bad solution to achieve the wanted effect of making the system wait for the products to filter
        });

        window.lang.generateStrings(dropdown);
        return dropdown;
    };

    /**
     * Creates the dropdown for choosing the amount of products visible on the page
     * @returns Dropdown with choosing visible product amount
     */
    createProductsPerPage = () => {
        let dropdown = $('<div class="dropdown-wrp"></div>');
        let dropdown_btn = $(
            '<div class="dropdown-btn noselect"><span data-textid="dropdown-products"></span></div>'
        );
        let dropdown_content = $(
            '<div class="dropdown-content">' +
                '<div value="10" class="dropdown-text">10</div>' +
                '<div value="15" class="dropdown-text">15</div>' +
                '<div value="20" class="dropdown-text">20</div>' +
                '<div value="25" class="dropdown-text">25</div>' +
            '</div>'
        );
        $(dropdown).append(dropdown_btn);
        $(dropdown).append(dropdown_content);

        $(dropdown_btn).on("click", function () {
            if ($(dropdown_content).hasClass("show")) {
                $(dropdown_content).removeClass("show");
            } else {
                $(dropdown_content).addClass("show");
            }
        });

        $(dropdown_content).find('.dropdown-text').on('click', (event) => {
            let productsPerPage = Number($(event.currentTarget).attr('value'))
            this.setProductsPerPage(productsPerPage);
            this.pagination.updateProductsPerPage(productsPerPage);
            setTimeout( () => {
                this.updateProductView(0, productsPerPage);
                $(dropdown_content).removeClass('show');
            }, 50); // Bad solution to achieve the wanted effect of making the system wait for the variables (products_per_page) to be updated on both pagination.js and here.
        });

        window.lang.generateStrings(dropdown);
        return dropdown;
    };

    setProductsPerPage = (value) => {
        this.products_per_page = value;
    };

    getProductsPerPage = () => {
        return this.products_per_page;
    };

    /**
     * Creates the box containing all the product cards
     * @returns A box containing multiple product cards
     */
    createProductMenu = () => {
        let content = $('<div id="product-container"></div>');
        let pagination_settings = this.pagination.getSpan();
        for (
            let i = pagination_settings.from;
            i < pagination_settings.to;
            i++
        ) {
            $(content).append(this.card.createProductCard(this.data[i]));
        }
        return content;
    };

    /**
     * Updates the product view, which items to see when changing page
     * @param {int} from
     * @param {int} to
     */
    updateProductView = (from, to) => {
        let elem = $("#product-container");
        let current_page_counter = $("#currPage");
        let page_counter = $("#page-counter");
        let next_btn = $("#nextPage");
        let prev_btn = $("#prevPage");

        $(page_counter).empty();
        $(page_counter).append(this.pagination.createPageCounter(page_counter));
        $(elem).empty();
        $(current_page_counter).text(this.pagination.getPage());

        if (from == 0) {
            $(prev_btn).addClass("disabled");
        } else {
            $(prev_btn).removeClass("disabled");
        }

        if (to == this.pagination.totalAmountPages()) {
            $(next_btn).addClass("disabled");
        } else {
            $(next_btn).removeClass("disabled");
        }

        for (let i = from; i < to; i++) {
            $(elem).append(this.card.createProductCard(this.data[i]));
        }
    };
}