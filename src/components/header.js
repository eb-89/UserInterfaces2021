
export default class Header{
    constructor(activePage) {
        this.activePage = activePage
    }

    init = () => {

    }

    render = () => {
        var header = $('<div class="header"></div>')
        var mainButton = $('<div class="header-button">Produkter</div>')
        $(mainButton).on('click', () => {
            history.pushState('Main', '/');
        })
        var aboutUsButton = $('<div class="header-button">Om oss</div>')
        $(aboutUsButton).on('click', () => {
            history.pushState('About us', '/om-oss');
        })

        // Decides which button in the header that is active at a give time
        switch(this.activePage) {
            case "main": {
                 $(mainButton).addClass("active");
                 break;
            }
            case "about us": {
                $(aboutUsButton).addClass("active");
                break;
            }
        }
        $(header).append(mainButton);
        $(header).append(aboutUsButton);
        return header;
    }
} 