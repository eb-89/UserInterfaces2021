/**
 * This page will create all the content of the Log in-page (views/login.js)
 */

export default class Content {
    constructor() {
        this.data = window.Database.allUserNamesPasswords();
    }

    init = () => {};

    render = () => {
        var content = $('<div class="content-container"></div>');
        $(content).append(this.createLoginForm());
        window.lang.generateStrings(content);
        return content;
    };

    createLoginForm = () => {
        let wrapper = $('<div class="container-wrapper"></div>');
        let cont_form = $('<div class="container-form"></div>');
        let line_form = $('<div class="line-form"></div>');
        let form = $('<div class="form"></div>');
        let form_content = $('<div class="form-content"></div>');

        $(cont_form).append(line_form);
        $(line_form).append(form);
        $(form).append(form_content);

        let login = $('<div id="login"><span data-textid="login-title"></span></div>');
        let cont_username = $('<div class="container-input"></div>');
        let cont_password = $('<div class="container-input"></div>');
        let cont_btn = $('<div id="container-btn"></div>');
        let btn_login = $('<div class="button-on-light" style="border: #f1e9cd 1px solid; margin: 0.2em"><span data-textid="login-loginbtn"></span></div>');

        $(form_content).append(login);
        $(form_content).append(cont_username);
        $(form_content).append(cont_password);
        $(form_content).append(cont_btn);
        $(cont_btn).append(btn_login);

        let label_username = $(
            '<label class="label" for="Username"><span data-textid="login-username"></label><br>'
        );
        let input_username = $(
            '<input class="input-txt" type="text" name="username" id="Username" required><br>'
        );
        let msg_username = $(
            '<div class="txt-hide"><span data-textid="login-errormsgusername"></div>'
        );

        $(cont_username).append(label_username);
        $(cont_username).append(input_username);
        $(cont_username).append(msg_username);

        let label_password = $(
            '<label class="label" for="Password"><span data-textid="login-password"></label><br>'
        );
        let input_password = $(
            '<input class="input-txt" type="password" name="password" id="Password" required><br>'
        );
        let msg_password = $(
            '<div class="txt-hide"><span data-textid="login-errormsgpassword"></div>'
        );

        $(cont_password).append(label_password);
        $(cont_password).append(input_password);
        $(cont_password).append(msg_password);

        $(input_username).on("click", () => {
            if (msg_username[0].classList == "txt-show") {
                msg_username[0].classList.remove("show");
                msg_username[0].classList.add("txt-hide");
            }
            if (msg_password[0].classList == "txt-show") {
                msg_password[0].classList.remove("show");
                msg_password[0].classList.add("txt-hide");
            }
        });

        $(input_password).on("click", () => {
            if (msg_password[0].classList == "txt-show") {
                msg_password[0].classList.remove("show");
                msg_password[0].classList.add("txt-hide");
            }
        });

        $(btn_login).on("click", () => {
            var i;
            for (i = 0; i < this.data.length; i++) {
                if (input_username[0].value == this.data[i].username) {
                    if (input_password[0].value == this.data[i].password) {
                        let userDetails = window.Database.userDetails(input_username[0].value);
                        userDetails = JSON.stringify(userDetails);
                        localStorage.setItem('loggedInUser', userDetails);
                        // Redirect to Menu VIP when successfully logged in
                        history.pushState("MenuVip", "/menu-vip");
                        break;
                    } else {
                        msg_password[0].classList.remove("txt-hide");
                        msg_password[0].classList.add("txt-show");
                        break;
                    }
                } else if (i == this.data.length - 1) {
                    msg_username[0].classList.remove("txt-hide");
                    msg_username[0].classList.add("txt-show");
                }
            }
        });
        $(wrapper).append(cont_form);
        return wrapper;
    };
}
