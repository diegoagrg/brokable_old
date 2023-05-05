var menu_nav = [];

menu_nav.init = function() {
    menu_nav.set_names();
}

menu_nav.set_names = function() {
    menu_nav.main_nav = jQuery('header.navbar-default');
    menu_nav.top_bar  = jQuery('.top_bar');
    menu_nav.sticky = new sticky_element(
        'header.navbar-default',
        menu_nav.top_bar.height()
    );
}

jQuery(function() {
    menu_nav.init();
})
