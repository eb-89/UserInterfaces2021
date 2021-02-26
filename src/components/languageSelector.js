
/**
 * Class for the language select component
 */


export default class LanguageSelector {
    constructor() {}


    createSelector = () => {

        let languageMenu = $('<div id="lang-menu"></div>')

        const languageSelector = $('<div id="lang-selector" class="lang-tile">'+ 
            `<img src="../img/${window.lang.getCurrentLanguage()}_flag.png" />` + 
            `<span data-textid="lang-${window.lang.getCurrentLanguage()}" />` +
        '</div>')

        const options = $(
            '<div class="lang-options">' +
                '<div class="lang-option lang-tile" data-lang="sv">'+
                    '<span data-textid="lang-sv"></span>'+ 
                    `<img src="../img/sv_flag.png" />` + 
                '</div>' +
                '<div class="lang-option lang-tile" data-lang="en">'+
                    '<span data-textid="lang-en"></span>' +
                    `<img src="../img/en_flag.png" />` + 
                '</div>' +
             "</div>"
        )
        this.updateLanguageSelector("en")

        $(options).addClass("hidden")

        // Little cheaty but I need the 'this' in the callback, while keeping the 'this' of the Jquery constant
        let that = this;
        $(options).find(".lang-option").click( function(ev)  {
           let lang = $(this).attr("data-lang");
           that.updateLanguageSelector(lang)
           
           $(".lang-options").toggleClass("hidden")

           window.lang.changeCurrentLanguage(lang)
           window.lang.generateStrings($("#root"))
        })

        $(languageSelector).click(function() {
            $(".lang-options").toggleClass("hidden")
        })

        languageMenu
            .append(languageSelector)
            .append(options)
        return languageMenu

    }

    updateLanguageSelector = (lang) => {
        let img = $('#lang-selector').find("img")
        let span = $('#lang-selector').find("span")

        img.attr("src", `../img/${lang}_flag.png`)
        span.attr("data-textid",  `lang-${lang}`)
        window.lang.generateStrings(span);
    }


}












