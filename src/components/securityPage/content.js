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
        return content;
    }

    createSendButton = () => {
        var content = $('<div id="send-button" class="button-on-light bordered"> Send </div>').on("click",() => {
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
                '<p>Report security issue</p>  '+
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
        $('<div id="message" class="subtitle info success">success</div>').insertAfter('#send-button').fadeOut(800)

    }

    appendFailMessage = () => {
        $('#message').remove()
        $('<div id="message" class="subtitle info error">Please insert your grievance</div>').insertAfter('#send-button').fadeOut(800)
    }
}