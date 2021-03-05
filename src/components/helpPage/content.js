/**
 * This page will create all the content of the About Us-page (views/aboutus.js)
 */

export default class Content {
    constructor() {
        this.currentSection = "sum"
    }

    init = () => {
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createTitle());
        $(content).append(this.createHelpContainer());
        window.lang.generateStrings(content)
        return content;
    }

    createTitle = () => {
        var content = $(
            '<div class="heading light">' +
                '<p><span data-textid="help-title"></span></p>  '+
            '</div>')
        return content
    }

    createHelpContainer = () => {
        var content = $(
            '<div class="help-container"></div>')

        content.append(this.createSubnavigator())
        content.append(this.createHelpBody())
        return content
    }

    createHelpBody = () => {
        var content = $(
            '<div id="help-body"></div>')
        return content
    }

    createSublink(string) {

        let HTMLBody;
        let headerString;
        switch (string) {
            case "howtoorder":
                headerString = "How to order"
                HTMLBody = $('<div><span data-textid="help-order-string"></span></div>')
                break;
            case "security":
                HTMLBody = $('<div><span data-textid="help-security-string"></span></div>')
                headerString = "Security"
                break;
            case "staff":
                headerString = "Staff"
                HTMLBody = '<div><span data-textid="help-staff-string"></span></div>'
                break;
            default:
                headerString = ""
                HTMLBody = ""
                break;
        }
        
        let link = $('<div class="link"> ' + headerString + "</div>").on('click',function () {
            $("#help-body").empty()
            let obj = $(HTMLBody)
            window.lang.generateStrings(obj)
            $("#help-body").append(obj)
        })

        return link;
    }

    createSubnavigator = () => {
        var content = $(
          '<div class="help-nav"></div>'
        )
        content.append(this.createSublink("howtoorder"))
        content.append(this.createSublink("security"))
        content.append(this.createSublink("staff"))
        return content;
    }
}