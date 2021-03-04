/**
 * Class defining the functions for the product cards
 */
export default class Card {
    constructor() {
        this.isVip = false;
        this.isStaff = true;
        if(localStorage.getItem('loggedInUser') != ''){
            this.isVip = JSON.parse(localStorage.getItem('loggedInUser')).credentials == 3;
            this.isStaff = JSON.parse(localStorage.getItem('loggedInUser')).credentials == 0;
        }
    }

    init = () => {};

    /**
     * Creates and returns a product card
     * @param {JSONObj} response
     * @param {isVip} boolean
     * @param {isStaff} boolean
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
        let desc_open_btn = $('<div class="expansion-button open"></div>');
        $(button_wrp).append(desc_open_btn);

        // Function for expanding "More Info"
        $(desc_open_btn).on("click", function (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            let card = $(this).closest(".product-card");
            let elem = $(this)
                .closest(".product-card")
                .find(".product-desc-expand");
            
            window.lang.generateStrings(card); // Generate the language strings

            let anim_speed = 300;
            $(elem).addClass("expanded");
            let currHeight = $(elem).height();
            $(elem).css("height", "auto");
            let autoHeight = $(card)
                .find(".product-main-wrp")
                .outerHeight(true);
            $(elem)
                .height(currHeight)
                .animate({ height: autoHeight }, anim_speed);
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
        let name = $(
            '<div class="title ellipsis bold" title="' + response.namn + '">' +
                response.namn +
            '</div>'
        );

        $(name_wrp).append(name);

        let price = $('<div class="title">' + response.pris + "kr</div>");

        $(desc_wrp).append(name_wrp);
        $(desc_wrp).append(price);

        // Expanded Description wrapper - Contains further information (activated by $(desc_open_btn))

        let desc_expanded = $('<div class="product-desc-expand"></div>');

        $(inner_card).append(this.createExpandedInfo(desc_expanded, response));

        $(card).append(inner_card);

        return card;
    };
    
    /**
     * Creates the more information element
     * @param {element} desc_expanded 
     * @returns The DOM element that contains information about the beverage
     */
    createExpandedInfo = (desc_expanded, response) => {
        let desc_expanded_header_wrp = $(
            '<div class="expanded-header-wrp"></div>'
        );

        let desc_name_wrp = $('<div class="desc-name-wrp"></div>');
        let desc_expanded_title = $(
            '<div class="title bold"><span data-textid="prod-info"></span></div>'
        );
        $(desc_name_wrp).append(desc_expanded_title);

        let close_btn_wrp = $('<div class="desc-btn-wrp"></div>');

        let desc_close_btn = $('<div class="expansion-button close"></div>');
        $(close_btn_wrp).append(desc_close_btn);
        // Function for closing "More Info"
        $(desc_close_btn).on("click", function (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            let elem = $(this)
                .closest(".product-card")
                .find(".product-desc-expand");
            let anim_speed = 300;
            $(elem).removeClass("expanded");
            $(elem).animate({ height: 0 }, anim_speed);
        });

        $(desc_expanded_header_wrp).append(close_btn_wrp);

        $(desc_expanded_header_wrp).append(desc_name_wrp);
        $(desc_expanded).append(desc_expanded_header_wrp);

        this.__createExpandedInfo(desc_expanded, response);

        return desc_expanded;
    }

    /**
     * Help function to this.createExpandedInfo(), creating the content in the expansion card
     * @param {element} desc_expanded 
     * @param {JSONObj} response
     * @returns nothing
     */
    __createExpandedInfo = (desc_expanded, response) => {
        let abv = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-strength"></span>:</div>' +
                '<div class="subtitle bold"> ' + response.alkoholhalt + '</div>' +
            '</div>'
        );
        $(desc_expanded).append(abv);

        let country = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-country"></span>:</div>' +
                '<div class="subtitle bold">' + response.land + '</div>' +
            '</div>'
        );
        $(desc_expanded).append(country);

        let type = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-type"></span>:</div>' +
                '<div class="subtitle bold"> ' + response.varugrupp + '</div>' +
            '</div>'
        );
        $(desc_expanded).append(type);

        let serving_type = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-serving"></span>:</div>' +
                '<div class="subtitle bold"> ' + response.forpackning + '</div>' +
            '</div>'
        );
        $(desc_expanded).append(serving_type);

        if(this.isStaff){
            let stock_amount = $(
                '<div class="product-text-wrp">' +
                    '<div class="subtitle bold"><span data-textid="prod-stock"></span>:</div>' +
                    '<form id="' + response.id + '"><input type="text" name="stock_amount" class="stock-amount-input" value="10" disabled /></form>'+
                '</div>'
            );

            let btn_wrp = $('<div class="expanded-btn-wrp"></div>');

            let remove_btn = $('<div class="button-mar button-on-light"><span data-textid="prod-disable"></span></div>');
            $(btn_wrp).append(remove_btn);

            $(remove_btn).on('click', function() {
                let elem = $(this).closest(".product-card");
                if($(elem).hasClass('disabled')){
                    $(elem).removeClass('disabled');
                    $(remove_btn).find('span').attr('data-textid', 'prod-disable');
                }
                else{
                    $(elem).addClass('disabled');
                    $(remove_btn).find('span').attr('data-textid', 'prod-enable');
                }
                window.lang.generateStrings(elem);
            });


            let change_stk = $('<div class="button-mar button-on-light"><span data-textid="prod-change_stk"></span></div>')
            $(btn_wrp).append(change_stk);

            $(change_stk).on('click', function() {
                if($(stock_amount).find("#" + response.id).find('input').prop('disabled')){
                    $(stock_amount).find("#" + response.id).find('input').prop('disabled', false);
                    $(change_stk).find('span').attr('data-textid', 'prod-change_stk-conf');
                }
                else{
                    $(stock_amount).find("#" + response.id).find('input').prop('disabled', true);
                    $(change_stk).find('span').attr('data-textid', 'prod-change_stk');
                }
                window.lang.generateStrings(change_stk);
            });

            $(desc_expanded).append(stock_amount);
            $(desc_expanded).append(btn_wrp);
        }

        if(this.isVip){

        }
    }

    /**
     * Create STAFF functionality
     */
    createStaffCard = () => {
        let options_btn = $('<div class="options-button button-on-light"></div>');

        $(options_btn).on('click', function(){
            if($(options_btn).hasClass('active')){
                $(options_btn).removeClass('active');
                $(options_btn).removeClass('show-options');
            }
            else{
                $(options_btn).addClass('active');
                $(options_btn).addClass('show-options');
            }
        });

        return options_btn;
    };

    /**
     * Create VIP functionality
     */
    createVipCard = (elem) => {};
}
