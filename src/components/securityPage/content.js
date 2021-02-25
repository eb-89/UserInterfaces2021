/**
 * This page will create all the content of the Security-page (views/security.js)
 */

export default class Content {
    constructor() {
    }

    init = () => {
    }

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createTitle());
        $(content).append(this.createForm());
        $(content).append(this.createSendButton())
        window.lang.generateStrings(content);
        return content;
    }

    createSendButton = () => {
        var content = $('<div id="send-button" class="button-on-light bordered" >'+
                    '<span data-textid="send-sec-msg"></span>'+ 
                '</div>')
            .on("click",() => {
            let textmessage = $('#securityText').val()
            if (textmessage) {
                window.SecurityData.addItem( { time: new Date(Date.now()), msg: textmessage }, (item) => {
                    this.appendSuccessMessage()
                })
            } else {
                this.appendFailMessage()
            }
        });

        return content
    } 

    createTitle = () => {
        var content = $(
            '<div class="heading light">' +
                '<p><span data-textid="sec-title"></span></p>  '+
            '</div>')
        return content
    }

    createForm  = () => {
        var content = $(
            '<div class="security-form-container" id="security-form">' +
                '<textarea id="securityText" class="dbordered light"></textarea>'+
            '</div>')
        return content;
    }

    appendSuccessMessage = () => {
        $('#message').remove()
        const content = $('<div id="message" class="subtitle info success"><span data-textid="sec-success-msg"></span></div>')
        window.lang.generateStrings(content);
        content.insertAfter('#send-button').fadeOut(800)
    }

    appendFailMessage = () => {
        $('#message').remove()
        const div = $('<div id="message" class="subtitle info error"><span data-textid="sec-error-msg"></span</div>')
        window.lang.generateStrings(div)
        div.insertAfter('#send-button').fadeOut(800)
    }
}