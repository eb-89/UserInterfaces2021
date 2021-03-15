/**
 * This page will create all the content of the Help-page (views/aboutus.js)
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

    /**
     *  Creates the page title
     */
    createTitle = () => {
        var content = $(
            '<div class="heading light">' +
                '<p><span data-textid="help-title"></span></p>  '+
            '</div>')
        return content
    }
    /**
     *  Creates container for the help section
     */
    createHelpContainer = () => {
        var content = $(
            '<div class="help-container"></div>')

        content.append(this.createSubnavigator())
        content.append(this.createHelpBody())
        return content
    }
    /**
     *  Creates help body
     */
    createHelpBody = () => {
        var content = $(
            '<div id="help-body">' + 
                '<div>' + 
                    '<span data-textid="help-general-string1"></span> <br><br>' + 
                    '<span data-textid="help-general-string2"></span> <br><br>' + 
                ' </div>' +
            '</div>')
        return content
    }
    /**
     *  Creates sublinks for the subnavigation
     */
    createSublink(string) {

        let HTMLBody;
        let headerString;
        switch (string) {
            case "general":
                headerString = "<span data-textid='help-general-header'></span>"
                HTMLBody = 
                '<div>' + 
                    '<span data-textid="help-general-string1"></span> <br><br>' + 
                    '<span data-textid="help-general-string2"></span> <br><br>' + 
                ' </div>'
                break;
            case "VIP":
                headerString = '<span data-textid="help-vip-header"></span>'
                HTMLBody = 
                '<div>' + 
                    '<span data-textid="help-vip-string1"></span> <br><br> ' + 
                    '<span data-textid="help-vip-string2"></span> <br><br> ' + 
                    '<span data-textid="help-vip-string3"></span> <br><br> ' + 
                ' </div>'
                break;
            case "staff":
                headerString = '<span data-textid="help-staff-header"></span>'
                HTMLBody = 
                '<div>' + 
                    '<span data-textid="help-staff-string1"></span> <br><br> ' + 
                    '<span data-textid="help-staff-string2"></span> <br><br> ' + 
                    '<span data-textid="help-staff-string3"></span> <br><br> ' + 
                    '<span data-textid="help-staff-string4"></span> <br><br> ' + 
                ' </div>'
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

    /**
     *  Creates subnavigation
     */
    createSubnavigator = () => {
        var content = $(
          '<div class="help-nav"></div>'
        )
        content.append(this.createSublink("general"))
        content.append(this.createSublink("VIP"))
        content.append(this.createSublink("staff"))
        return content;
    }
}