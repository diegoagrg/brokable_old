jQuery(function() {
  jQuery('.sector-industrial').off('click').on('click', function() {
  	jQuery(this).children('.sector-industrial-descripcion').slideToggle();
  	jQuery(this).toggleClass('sector-industrial-abierto');
  });
});
