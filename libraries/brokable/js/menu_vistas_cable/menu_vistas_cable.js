var menu_vistas_cables = [];

menu_vistas_cables.init = function() {
  menu_vistas_cables.set_names();
  menu_vistas_cables.set_events();
  menu_vistas_cables.colocar();
  menu_vistas_cables.tarjetas();
}

menu_vistas_cables.set_names = function() {
  menu_vistas_cables.target = jQuery('.lista_de_vistas_de_cables').parent();
  menu_vistas_cables.contanedor = jQuery('.menu_cables');
  menu_vistas_cables.activador = jQuery('.seleccion_de_vista_menu_cables');
  menu_vistas_cables.vistas = jQuery('.vista_menu_cables');
}

menu_vistas_cables.set_events = function() {
  menu_vistas_cables.activador.on('click', function() {
    menu_vistas_cables.mostrar_vista(jQuery(this));
  });
}

menu_vistas_cables.colocar = function() {
  menu_vistas_cables.target.html(menu_vistas_cables.contanedor);
  menu_vistas_cables.vistas.not(':eq(0)').hide();
}

menu_vistas_cables.mostrar_vista = function(activador) {
  menu_vistas_cables.vistas.hide('fast');
  menu_vistas_cables.activador.removeClass('active');
  activador.addClass('active');
  var vista_menu = activador.attr('vista_menu');
  var vista = jQuery('.vista_menu_cables[vista_menu="' + vista_menu + '"]');
  vista.show('fast');
}

menu_vistas_cables.tarjetas = function () {
  jQuery('.card-body').each(function() {
    var text = jQuery(this).find('.card-title > div a:last-child').text();
    if (text == ' ') jQuery(this).hide();
  });
}

jQuery(function() {
  menu_vistas_cables.init();
});
