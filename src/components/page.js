/**
 * Class for the page, which contains only a div. The contents of this div is changed depending on which view we are currently on
 */
export default class Page{
    constructor() {
    }

    init = () => {

    }

    render = () => {
        var page = $('<div class="page"></div>')
        return page;
    }
} 