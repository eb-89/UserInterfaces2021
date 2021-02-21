/**
 * Class for the header. This file is rendered on each view which uses a header
 */
export default class Header {
    constructor(activePage) {
        this.activePage = activePage;
    }

    init = () => {};

    // Renders all header
    render = () => {
        var header = $('<div class="header"></div>');
        var mainButton = $('<div class="header-button">Produkter</div>');
        $(mainButton).on("click", () => {
            history.pushState("Main", "/");
        });
        var aboutUsButton = $('<div class="header-button">Om oss</div>');
        $(aboutUsButton).on("click", () => {
            history.pushState("About us", "/om-oss");
        });
        var logInButton = $('<div class="header-button">Log in</div>');
        $(logInButton).on("click", () => {
            history.pushState("Log in", "/log-in");
        });
        var securityButton = $('<div class="header-button">Security</div>');
        $(securityButton).on("click", () => {
            history.pushState("Security", "/security");
        });
        var ordersButton = $('<div class="header-button">Orders</div>');
        $(ordersButton).on("click", () => {
            history.pushState("Orders", "/orders");
        });
        var productsButton = $('<div class="header-button">Products</div>');
        $(productsButton).on("click", () => {
            history.pushState("Products", "/products");
        });
        var menuVipButton = $('<div class="header-button">Menu VIP</div>');
        $(menuVipButton).on("click", () => {
            history.pushState("MenuVip", "/menu-vip");
        });
        var menuStaffButton = $('<div class="header-button">Menu Staff</div>');
        $(menuStaffButton).on("click", () => {
            history.pushState("MenuStaff", "/menu-staff");
        });

        // Decides which button in the header that is active at a give time
        switch (this.activePage) {
            case "main": {
                $(mainButton).addClass("active");
                break;
            }
            case "about us": {
                $(aboutUsButton).addClass("active");
                break;
            }
            case "log in": {
                $(logInButton).addClass("active");
                break;
            }
            case "security": {
                $(securityButton).addClass("active");
                break;
            }
            case "orders": {
                $(ordersButton).addClass("active");
                break;
            }
            case "products": {
                $(productsButton).addClass("active");
                break;
            }
            case "menu VIP": {
                $(menuVipButton).addClass("active");
                break;
            }
            case "menu Staff": {
                $(menuStaffButton).addClass("active");
                break;
            }
        }
        $(header).append(mainButton);
        $(header).append(aboutUsButton);
        $(header).append(logInButton);
        $(header).append(securityButton);
        $(header).append(ordersButton);
        $(header).append(productsButton);
        $(header).append(menuVipButton);
        $(header).append(menuStaffButton);
        return header;
    };
}
