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
        $(content).append(this.createForm());
        $(content).append(this.createSendButton())
        return content;
    }

    createSendButton = () => {
        var content = $('<div class="button"> Send </div>').on("click",() => {
            let textmessage = $('#securityText').val()

            if (textmessage) {
                window.SecurityData.addItem( { msg: textmessage }, (item) => {
                    this.appendSuccessMessage()
                })
            } else {
                this.appendFailMessage()
            }
        });

        return content
    } 

    createForm  = () => {
        var content = $(
            '<div class="security-form-container" id="security-form">' +
                '<textarea id="securityText"></textarea>'+
            '</div>')
        return content;
    }

    appendSuccessMessage = () => {
        $('.message').remove()
        $('<div class="message success">success</div>').insertAfter('#security-form')
    }

    appendFailMessage = () => {
        $('.message').remove()
        $('<div class="message error">Please insert your grievance</div>').insertAfter('#security-form')
    }
}