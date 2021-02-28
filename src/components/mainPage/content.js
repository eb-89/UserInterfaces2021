/**
 * This page will create all the content of the mainPage (main.js)
 */
import Pagination from "../pagination.js";

export default class Content {
    constructor() {
        this.data = window.Database.allBeveragesMoreDetailed(); // Fetches the data from the JSON-obj. (Simulate how it would work in real world)
        this.products_per_page = 12; // Amount of products per page
        this.pagination = new Pagination(this.data.length, this.products_per_page); // Send length of data (this.data.length) and amounts of products (this.products_per_page) that will be visible per page
    }

    init = () => {
    }

    render = () => {
        let content = $('<div class="content-container"></div>');
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
        $(filter_wrp).append(this.createPagination());

        return filter_wrp;
    }

    /**
     * Creates the pagination selections
     * @returns Element that holds the pagination selectors
     */
    createPagination = () => {
        let pagionation_wrp = $('<div class="pagination-wrp"></div>');
        let counter_wrp = $('<div class="page-counter-text-wrp"></div>')

        let currPage = this.pagination.getPage();
        let totalPages = this.pagination.totalAmountPages();

        let prev_page_btn = $('<div id="prevPage" class="button noselect button-on-dark title disabled">Prev</div>');
        let page_counter = $('<div id="currPage" class="page-counter-text">' + currPage + '</div>...<div class="page-counter-text">' + totalPages + '</div>');
        let next_page_btn = $('<div id="nextPage" class="button noselect button-on-dark title">Next</div>');

        $(counter_wrp).append(page_counter);

        $(next_page_btn).on('click', () => {
            this.pagination.nextPage();
            let pagination_settings = this.pagination.getSpan();
            this.updateProductView(pagination_settings.from, pagination_settings.to);
        });

        $(prev_page_btn).on('click', () => {
            this.pagination.previousPage();
            let pagination_settings = this.pagination.getSpan();
            this.updateProductView(pagination_settings.from, pagination_settings.to);
        });

        $(pagionation_wrp).append(prev_page_btn);
        $(pagionation_wrp).append(counter_wrp);
        $(pagionation_wrp).append(next_page_btn);

        return pagionation_wrp;
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
            $(elem).append(this.createProductCard(this.data[i]));
        }
    }

    // 
    /**
     * Creates the box containing all the product cards
     * @returns A box containing multiple product cards
     */
    createProductMenu = () => {
        let content = $('<div id="product-container"></div>');
        let pagination_settings = this.pagination.getSpan();
        for(let i = pagination_settings.from; i < pagination_settings.to; i++){
            $(content).append(this.createProductCard(this.data[i]));
        }
        return content;
    }

    
    /**
     * Creates and returns a product card
     * @param {JSONObj} response 
     * @returns An product card element
     */
    createProductCard = (response) => {
        // Big wrappers inside the card
        let card = $('<div class="product-card card"></div>');
        let inner_card = $('<div class="inner-card"></div>');
        let card_content_wrp = $('<div class="card-content-wrp"></div>');

        $(inner_card).append(card_content_wrp);

        // Main wrapper - Contains Image and MoreInfo-button
        let main_wrp = $('<div class="product-main-wrp"></div>');
        $(card_content_wrp).append(main_wrp);

        let button_wrp = $('<div class="main-btn-wrp"></div>');
        let desc_open_btn = $('<div class="button-on-light">i</div>');
        $(button_wrp).append(desc_open_btn);

        // Function for expanding "More Info"
        $(desc_open_btn).on('click', function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            let card = $(this).closest('.product-card');
            let elem = $(this).closest('.product-card').find('.product-desc-expand');
            let anim_speed = 300;
            $(elem).addClass('expanded');
            let currHeight = $(elem).height();
            $(elem).css('height', 'auto');
            let autoHeight = $(card).find('.product-main-wrp').outerHeight(true);
            $(elem).height(currHeight).animate({height: autoHeight}, anim_speed);
        });

        let image_wrp = $('<div class="product-image-wrp"></div>');
        let image = $('<div class="product-image"></div>');
        $(image_wrp).append(image);

        $(main_wrp).append(button_wrp);
        $(main_wrp).append(image_wrp);

        // Description wrapper - Contains Name and Price tag
        let desc_wrp = $('<div class="product-desc-wrp"></div>');
        $(card_content_wrp).append(desc_wrp);

        let name_wrp = $('<div class="product-title"></div>');
        let name = $('<div class="title ellipsis bold" title="' + response.namn + '">' + response.namn + '</div>');
        let line = $('<div class="product-line"></div>');

        $(name_wrp).append(name);
        $(name_wrp).append(line);

        let price = $('<div class="title">' + response.pris + 'kr</div>');

        $(desc_wrp).append(name_wrp);
        $(desc_wrp).append(price);

        // Expanded Description wrapper - Contains further information (activated by $(more_info_btn))

        let desc_expanded = $('<div class="product-desc-expand"></div>');

        let desc_expanded_header_wrp = $('<div class="expanded-header-wrp"></div>');

        let close_btn_wrp = $('<div class="desc-btn-wrp"></div>');
        let desc_close_btn = $('<div class="button-on-light">i</div>');
        $(close_btn_wrp).append(desc_close_btn);

        let desc_name_wrp = $('<div class="desc-name-wrp"></div>');
        let desc_expanded_title = $('<div class="title bold">Information</div>');
        $(desc_name_wrp).append(desc_expanded_title);

        // Function for closing "More Info"
        $(desc_close_btn).on('click', function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            let elem = $(this).closest('.product-card').find('.product-desc-expand');
            let anim_speed = 300;
            $(elem).removeClass('expanded')
            $(elem).animate({height: 0}, anim_speed);
        });

        $(desc_expanded_header_wrp).append(close_btn_wrp);
        $(desc_expanded_header_wrp).append(desc_name_wrp);

        $(desc_expanded).append(desc_expanded_header_wrp);

        let abv = $('<div class="product-text-wrp">'+
                        '<div class="subtitle bold" title="Pris inklusive moms">Alkoholhalt:</div>'+
                        '<div class="subtitle bold"> ' + response.alkoholhalt + '</div>'+
                    '</div>');
        
        let country = $('<div class="product-text-wrp">'+
                            '<div class="subtitle bold">Land:</div>'+
                            '<div class="subtitle bold">' + response.land + '</div>'+
                        '</div>');
        
        let type = $('<div class="product-text-wrp">'+
                        '<div class="subtitle bold">Typ:</div>'+
                        '<div class="subtitle bold"> ' + response.varugrupp + '</div>'+
                     '</div>');
        
        let serving_type = $('<div class="product-text-wrp">'+
                                '<div class="subtitle bold">Servering i:</div>'+
                                '<div class="subtitle bold"> ' + response.forpackning + '</div>'+
                            '</div>');

        $(desc_expanded).append(abv);
        $(desc_expanded).append(country);
        $(desc_expanded).append(type);
        $(desc_expanded).append(serving_type);

        // Function for opening "More Info"
        $(desc_open_btn).on('click', function() {
            let card = $(this).closest('.product-card');
            let elem = $(this).closest('.product-card').find('.product-desc-expand');
            let anim_speed = 300;
            if($(elem).hasClass('expanded')){
                $(elem).removeClass('expanded');
                $(elem).animate({height: 0}, anim_speed);
            }
            else {
                $(elem).addClass('expanded');
                let currHeight = $(elem).height();
                $(elem).css('height', 'auto');
                let autoHeight = $(card).find('.product-main-wrp').outerHeight(true);
                $(elem).height(currHeight).animate({height: autoHeight}, anim_speed);
            }
        });
        $(inner_card).append(desc_expanded);
        $(card).append(inner_card);

        return card;
    }
}