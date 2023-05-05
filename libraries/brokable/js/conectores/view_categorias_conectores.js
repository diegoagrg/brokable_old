var categorias_con = [];

categorias_con.init = function() {
  categorias_con.set_names();
  categorias_con.set_events();
}

categorias_con.set_names = function() {
  categorias_con.container  =   jQuery('.view-categorias-conectores');
  categorias_con.content    =   jQuery('.view-categorias-conectores .view-content');
  categorias_con.trigger    =   jQuery('.view-categorias-conectores .view-header .header-trigger');
}

categorias_con.set_events = function() {
    categorias_con.trigger.on('click', function() {
        categorias_con.toggleView();
    });
}

categorias_con.toggleView = function() {
  categorias_con.container.toggleClass('closed-section')
  categorias_con.content.slideToggle();
}

jQuery(function() {
    categorias_con.init();
});
