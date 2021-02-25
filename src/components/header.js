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
        let header = $('<div class="header-container"></div>');
        let header_title = this.createHeaderTitle();
        let navigation_wrp = this.createNavigation();

        $(header).append(header_title);
        $(header).append(navigation_wrp);

        const languageSelector = $('<select class="lang" id="lang-selector">' + 
            '<option value="en">en</option>' + 
            '<option value="sv">sv</option>' + 
            '</select>')

        languageSelector.find("option").each((inx, val) => {
            if ($(val).attr("value") === window.lang.getCurrentLanguage()) {
                $(val).attr("selected", "selected")
            }
        })

        languageSelector.change(() => {
                $("#lang-selector option:selected").each((idx, opt)=> {
                    window.lang.changeCurrentLanguage($(opt).val())
                    window.lang.generateStrings($("#root"))
                } )
            });
        $(header).prepend(languageSelector);
        window.lang.generateStrings(header);
        return header;
    };

    createHeaderTitle = () => {
        let title_wrp = $('<div id="header-title-wrp"></div>');

        let title = $('<div class="header-title noselect">The Flying Dutchman</div>');
        let logo = $('<div class="header-icon"></div>');

        $(title_wrp).append(logo);
        $(title_wrp).append(title);

        return title_wrp;
    };

    /**
     * Creates the hamburger-menu icon
     */
    createNavigation = () => {
        // Checks if the checkbox is checked when toggling menu
        let nav_icon = $(
            '<div id="nav-icon-wrp">' +
                '<input type="checkbox" />' +
                '<div class="bar1"></div>' +
                '<div class="bar2"></div>' +
                '<div class="bar3"></div>' +
            '</div>'
        );

        let menu_objects = this.createNavigationObjects();

        $(nav_icon).append(menu_objects);
        return nav_icon;
    };

    /**
     * Creates the list of menu objects.
     * It is only called from this.createNavigation()
     * @returns (elem) Menu wrapper that holds all objects
     */
    createNavigationObjects = () => {
        let menu_wrp = $('<ul id="menu"></ul>');

        let mainButton = $('<li class="menu-button"><span data-textid="nav-products"></span></li>');
        $(mainButton).on("click", () => {
            history.pushState("Main", "/");
        });
        let aboutUsButton = $('<li class="menu-button"><span data-textid="nav-aboutus"></span></li>');
        $(aboutUsButton).on("click", () => {
            history.pushState("About us", "/om-oss");
        });
        let logInButton = $('<li class="menu-button"><span data-textid="nav-login"></span></li>');
        $(logInButton).on("click", () => {
            history.pushState("Log in", "/log-in");
        });
        let securityButton = $('<li class="menu-button"><span data-textid="nav-security"></span></li>');
        $(securityButton).on("click", () => {
            history.pushState("Security", "/security");
        });
        let securityAdminButton = $('<li class="menu-button"><span data-textid="nav-securityAdmin"></span></li>');
        $(securityAdminButton).on("click", () => {
            history.pushState("SecurityAdmin", "/securityAdmin");
        });
        let ordersButton = $('<li class="menu-button"><span data-textid="nav-orders"></span></li>');
        $(ordersButton).on("click", () => {
            history.pushState("Orders", "/orders");
        });
        let productsButton = $('<li class="menu-button"><span data-textid="nav-products"></span></li>');
        $(productsButton).on("click", () => {
            history.pushState("Products", "/products");
        });
        let menuVipButton = $('<li class="menu-button"><span data-textid="nav-vip"></span></li>');
        $(menuVipButton).on("click", () => {
            history.pushState("MenuVip", "/menu-vip");
        });
        let menuStaffButton = $('<li class="menu-button"><span data-textid="nav-staff"></span></li>');
        $(menuStaffButton).on("click", () => {
            history.pushState("MenuStaff", "/menu-staff");
        });

        // Decides which button in the header that is active at a given time
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
            case "securityAdmin": {
                $(securityAdminButton).addClass("active");
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

        $(menu_wrp).append(mainButton);
        $(menu_wrp).append(aboutUsButton);
        $(menu_wrp).append(logInButton);
        $(menu_wrp).append(securityButton);
        $(menu_wrp).append(securityAdminButton);
        $(menu_wrp).append(ordersButton);
        $(menu_wrp).append(productsButton);
        $(menu_wrp).append(menuVipButton);
        $(menu_wrp).append(menuStaffButton);

        return menu_wrp;
    };
}
