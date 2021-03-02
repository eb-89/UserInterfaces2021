/**
 * Class defining the functions for the product cards
 */
export default class Card {
    constructor() {}

    init = () => {};

    /**
     * Creates and returns a product card
     * @param {JSONObj} response
     * @param {isVip} boolean
     * @param {isStaff} boolean
     * @returns An product card element
     */
    createProductCard = (response, isVip, isStaff) => {
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

        // Expanded Description wrapper - Contains further information (activated by $(more_info_btn))

        let desc_expanded = $('<div class="product-desc-expand"></div>');

        let desc_expanded_header_wrp = $(
            '<div class="expanded-header-wrp"></div>'
        );

        let close_btn_wrp = $('<div class="desc-btn-wrp"></div>');
        let desc_close_btn = $('<div class="button-on-light">i</div>');
        $(close_btn_wrp).append(desc_close_btn);

        let desc_name_wrp = $('<div class="desc-name-wrp"></div>');
        let desc_expanded_title = $(
            '<div class="title bold"><span data-textid="prod-info"></span></div>'
        );
        $(desc_name_wrp).append(desc_expanded_title);

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

        let abv = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-strength"></span>:</div>' +
                '<div class="subtitle bold"> ' + response.alkoholhalt + '</div>' +
            '</div>'
        );

        let country = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-country"></span>:</div>' +
                '<div class="subtitle bold">' + response.land + '</div>' +
            '</div>'
        );

        let type = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-type"></span>:</div>' +
                '<div class="subtitle bold"> ' + response.varugrupp + '</div>' +
            '</div>'
        );

        let serving_type = $(
            '<div class="product-text-wrp">' +
                '<div class="subtitle bold"><span data-textid="prod-serving"></span>:</div>' +
                '<div class="subtitle bold"> ' + response.forpackning + '</div>' +
            '</div>'
        );

        // Append the information elements to the expansion element
        $(desc_expanded).append(abv);
        $(desc_expanded).append(country);
        $(desc_expanded).append(type);
        $(desc_expanded).append(serving_type);

        // Function for opening "More Info"
        $(desc_open_btn).on("click", function () {
            let card = $(this).closest(".product-card");
            let elem = $(this)
                .closest(".product-card")
                .find(".product-desc-expand");
            let anim_speed = 300;
            if ($(elem).hasClass("expanded")) {
                $(elem).removeClass("expanded");
                $(elem).animate({ height: 0 }, anim_speed);
            } else {
                $(elem).addClass("expanded");
                let currHeight = $(elem).height();
                $(elem).css("height", "auto");
                let autoHeight = $(card)
                    .find(".product-main-wrp")
                    .outerHeight(true);
                $(elem)
                    .height(currHeight)
                    .animate({ height: autoHeight }, anim_speed);
            }
        });
        $(inner_card).append(desc_expanded);
        $(card).append(inner_card);

        return card;
    };

    /**
     * Creates a button that adds a product to a shopping list
     */
    createAddButton = () => {};

    /**
     * Creates a button that removes an item from the menu temporarily (Disable the button)
     */
    createRemoveButton = () => {};
}
