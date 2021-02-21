/**
 * This page will create all the content of the mainPage (main.js)
 */
import Pagination from "../pagination.js";

export default class Content {
    constructor() {
        this.data = window.Database.allBeveragesMoreDetailed(); // Fetches the data from the JSON-obj. (Simulate how it would work in real world)
        this.products_per_page = 12; // Amount of products per page
        this.pagination = new Pagination(this.data.length, this.products_per_page); // Send length of data and amounts of products that will be visible per page
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
        let btn_wrp = $('<div class="btn-wrp"></div>');
        let text_wrp = $('<div class="page-counter-text-wrp"></div>')

        let currPage = this.pagination.getPage();
        let totalPages = this.pagination.totalAmountPages();

        let prev_page_btn = $('<div id="prevPage" class="button subtitle change-page-btn disabled">Prev</div>');
        let page_counter = $('<div id="currPage" class="page-counter-text">' + currPage + '</div>...<div class="page-counter-text">' + totalPages + '</div>');
        let next_page_btn = $('<div id="nextPage" class="button subtitle change-page-btn">Next</div>');

        $(text_wrp).append(page_counter);

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

        $(btn_wrp).append(prev_page_btn);
        $(btn_wrp).append(text_wrp);
        $(btn_wrp).append(next_page_btn);

        return btn_wrp;
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
        let card = $('<div class="product-card card"></div>');
        let main_wrp = $('<div class="product-main-wrp"></div>');
        let desc_wrp = $('<div class="product-desc-wrp"></div>');

        let image = $('<div class="product-image"></div>');
        let title_wrp = $('<div class="product-title"></div>');
        let title = $('<div class="title ellipsis" title="' + response.namn + '">' + response.namn + '</div>');

        $(title_wrp).append(title);


        let info_wrp = $('<div class="product-info-wrp"></div>')
        let price_title = $('<div class="product-subtitle subtitle bold">Pris:</div>');
        let price_value = $('<div class="product-subtitle">' + response.pris + ';-</div>');

        $(info_wrp).append(price_title);
        $(info_wrp).append(price_value);


        let button_wrp = $('<div class="product-btn-wrp"></div>');
        let dropdown_btn = $('<div class="clickable button">Mer info</div>');

        let desc_expanded = $('<div class="product-desc-expand"></div>');
        let desc_expanded_title = $('<div class="subtitle">Information</div>');
        $(desc_expanded).append(desc_expanded_title);

        let abv = $('<div class="product-text-wrp">'+
                        '<div class="product-subtitle" title="Pris inklusive moms">Alkoholhalt:</div>'+
                        '<div class="product-subtitle"> ' + response.alkoholhalt + '</div>'+
                    '</div>');
        
        let country = $('<div class="product-text-wrp">'+
                            '<div class="product-subtitle">Land:</div>'+
                            '<div class="product-subtitle">' + response.land + '</div>'+
                        '</div>');
        
        let type = $('<div class="product-text-wrp">'+
                        '<div class="product-subtitle">Typ:</div>'+
                        '<div class="product-subtitle"> ' + response.varugrupp + '</div>'+
                     '</div>');
        
        let serving_type = $('<div class="product-text-wrp">'+
                                '<div class="product-subtitle">Servering i:</div>'+
                                '<div class="product-subtitle"> ' + response.forpackning + '</div>'+
                            '</div>');

        $(desc_expanded).append(abv);
        $(desc_expanded).append(country);
        $(desc_expanded).append(type);
        $(desc_expanded).append(serving_type);

        // Creating an anonymous function surrounding the onClick event, it didn't find $('.clickable') without it. Probably because without it, it was binding the click-event to the button before the button existed.
        $(dropdown_btn).on('click', function(event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            let card = $(this).closest('.product-card');
            let elem = $(this).closest('.product-card').find('.product-desc-expand');
            let anim_speed = 350;
            if($(elem).hasClass('expanded')){
                $(card).removeClass('elevated');
                $(elem).removeClass('expanded')
                $(elem).animate({height: 0}, anim_speed);
            }
            else {
                $(card).addClass('elevated');
                $(elem).addClass('expanded');
                let currHeight = $(elem).height();
                $(elem).css('height', 'auto');
                let autoHeight = $(card).find('.product-main-wrp').outerHeight(true);
                $(elem).height(currHeight).animate({height: autoHeight}, anim_speed);
            }
        });

        $(button_wrp).append(dropdown_btn);

        $(desc_wrp).append(info_wrp);
        $(desc_wrp).append(button_wrp);

        $(main_wrp).append(image);
        $(main_wrp).append(title_wrp);

        $(card).append(main_wrp);
        $(card).append(desc_wrp);
        $(card).append(desc_expanded);

        return card;
    }
}