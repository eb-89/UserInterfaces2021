/**
 * This page will create all the content of the SecurityAdmin-page (views/securityAdmin.js)
 */

export default class Content {
    constructor() {
        this.secObject = window.SecurityData;
        this.currentItem;
    }

    init = () => {
        // If needed, most likely we will never use this.
        const handle = this.secObject.registerInsertCallback((item) => {
            $("#sec-list").append("<div>" + item.msg + "</div>")
        })
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createTitle());
        $(content).append(this.createAdminContainer());
        return content;
    }


    createSidebar = () => { 
        var content = $('<div id="sec-list" class="area col dbordered light"></div>');

        const allItems = this.secObject.getAllItems();

        for (let item of allItems) {
            const listItem = $(
                    "<div class='security-item' id='sec-item-" + item.id +  "'></div>")
                .on("click", () => {
                    $("#sec-content").empty()
                    $("#sec-content").append("<div>" + item.msg + " </div>")

                    $("[id^=sec-item-]").removeClass("selected")
                    $(`#sec-item-${item.id}`).addClass("selected")
                    this.currentItem = item.id;
            })

            const header = $('<div class="security-item-header">'+ 
                    item.time.getHours() + ":" +  
                    (item.time.getMinutes().toString().length === 1 ? "0"+item.time.getMinutes() : item.time.getMinutes()) + ":" +  
                    (item.time.getSeconds().toString().length === 1 ? "0"+item.time.getSeconds() : item.time.getSeconds()) +
                    '</div>'
            )

            const preview = $('<div class="security-item-preview">'+ item.msg + '</div>'
            )

            const removeBtn = $('<div class="button-remove">X</div>').on('click', () => {
                this.secObject = window.SecurityData.removeItem(item);
                $(`#sec-item-${item.id}`).remove();
                if (this.currentItem === item.id) {
                    $("#sec-content").empty()
                }
            })

            $(header).append(removeBtn)
            $(listItem).append(header)
            $(listItem).append(preview)
            $(content).append(listItem)
        }

        return content;
    }

    createTitle = () => {
        var content = $(
            '<div class="heading light">' +
                '<p>Security issues</p>  '+
            '</div>')
        return content
    }

    createDisplay = () => { 
        var content = $('<div id="sec-content" class="area show dbordered light"></div>');
        return content;
    }

    createAdminContainer = () => {
        var content = $('<div class="security-flex-container"></div>');
        $(content).append(this.createSidebar());
        $(content).append(this.createDisplay());

        return content;
    }
}